const Promise = require("bluebird");
const appPackage = require('../package.json');
const logger = require('winston');
const nconf = require('nconf');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const EventEmitter = require('events').EventEmitter;

import StationManager from './lib/station-manager';
import DockAppConnector from './lib/dockapp-connector';
import TestingConnector from './lib/testing-connector';

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exitCode = 1;
});

app.use(bodyParser.json());

nconf.file('config.json');
nconf.defaults({
  port: '3000',
  dockapp_path: '../work/dockapp',
  test: false,
  max_log_length: 100,
  log_directory: './log',
  log_level: 'info', // error, warn, info, verbose, debug, silly
});

logger.add(logger.transports.File, {
  filename: `${nconf.get('log_directory')}/dockapp_dashboard.log`,
  level: nconf.get('log_level'),
  handleExceptions: true,
  json: false,
});

logger.info(`Starting dockapp_dashboard server (v${appPackage.version})`);

let connector = null;
if (nconf.get('test')) {
  connector = new TestingConnector(nconf, logger);
} else {
  connector = new DockAppConnector(nconf, logger);
}

const stationManager = new StationManager(nconf, logger, connector);

// Longpoll begin

const pollUpdateEmitter = new EventEmitter();
pollUpdateEmitter.setMaxListeners(100);
let updateID = 1;
const pollTimeoutDelay = 15000;

function respondJSON(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function stationDataResponse() {
  return {
    updateID,
    stations: stationManager.getStations(),
  };
}

function emptyResponse(req, res) {
  return {};
}

app.get('/poll.json', (req, res) => {
  // if the client is out of sync respond immediately
  if (Number(req.query.lastSeen) !== updateID) {
    respondJSON(res, stationDataResponse());
  } else {
    // ... otherwise wait for an update to respond

    // On timeout send an empty update
    const pollTimeout = setTimeout(() => {
      pollUpdateEmitter.emit('update', emptyResponse());
    }, pollTimeoutDelay);

    // If there was an update respond
    pollUpdateEmitter.once('update', (data) => {
      clearTimeout(pollTimeout);
      respondJSON(res, data);
    });
  }
});

stationManager.events.on('stationUpdate', () => {
  updateID++;
  pollUpdateEmitter.emit('update', stationDataResponse());
});

// Longpoll end

app.get('/stations.json', (req, res) => {
  respondJSON(res, stationDataResponse());
});

app.post('/stations.json', (req, res) => {
  if (req.body.action === 'start') {
    stationManager.startStations(req.body.stationIDs);
    respondJSON(res, emptyResponse());
  } else if (req.body.action === 'stop') {
    stationManager.stopStations(req.body.stationIDs);
    respondJSON(res, emptyResponse());
  } else if (req.body.action === 'change_app') {
    stationManager.changeApp(req.body.stationIDs, req.body.app);
    respondJSON(res, emptyResponse());
  } else {
    res.writeHead(404, 'Action not found');
    res.end();
  }
});

app.get('/log.json', (req, res) => {
  respondJSON(res, { entries: stationManager.getLog() });
});

// Spawn server
const port = nconf.get('port');
app.listen(port);
logger.info(`Server listening on port ${port}.`);

