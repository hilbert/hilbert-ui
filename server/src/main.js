const appPackage = require('../package.json');
const logger = require('winston');
const nconf = require('nconf');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const EventEmitter = require('events').EventEmitter;

import StationManager from './lib/station-manager';
import DockAppConnector from './lib/dockapp-connector';
import MKLivestatusConnector from './lib/mk-livestatus-connector';
import TestBackend from './lib/test-backend';

const iconmap = require('../iconmap.json');

app.use(bodyParser.json());

nconf.env().argv();
nconf.file('config.json');
nconf.defaults({
  port: '3000',
  dockapp_path: '../work/dockapp',
  test: false,
  scriptConcurrency: 20,
  max_log_length: 100,
  log_directory: './log',
  log_level: 'info', // error, warn, info, verbose, debug, silly
  mkls_poll_delay: 1000,
  mkls_cmd: 'nc localhost 6557',
});

logger.add(logger.transports.File, {
  filename: `${nconf.get('log_directory')}/dockapp_dashboard.log`,
  level: nconf.get('log_level'),
  handleExceptions: true,
  json: false,
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught exception: ${err.message}. Exiting process.`);
  process.exitCode = 1;
});

logger.info(`Starting dockapp_dashboard server (v${appPackage.version})`);

let dockAppConnector = null;
let mkLivestatusConnector = null;

if (nconf.get('test')) {
  logger.info('Running in Test Mode');
  const testBackend = new TestBackend(nconf, logger);
  dockAppConnector = testBackend.getDockappConnector();
  mkLivestatusConnector = testBackend.getMKLivestatusConnector();
} else {
  dockAppConnector = new DockAppConnector(nconf, logger);
  mkLivestatusConnector = new MKLivestatusConnector(nconf, logger);
}

const stationManager = new StationManager(nconf, logger, dockAppConnector, mkLivestatusConnector);
stationManager.init().then(() => {

}).catch((err) => {
  logger.error(`Error initializing Station Manager: ${err.message}. Exiting process.`);
  process.exit(1);
});

/**
 * Return the URL of the icon of the specified app
 *
 * @param {string} appID - ID of the app
 * @returns {string} - URL of the icon
 */
function getIconURL(appID) {
  if (iconmap[appID] !== undefined) {
    return `icons/${iconmap[appID]}`;
  }
  return 'icons/none.png';
}

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
  const stations = stationManager.getStations();
  for (const station of stations) {
    station.icon = getIconURL(station.app);
  }

  return {
    updateID,
    stations,
  };
}

function emptyResponse() {
  return {};
}

app.get('/poll.json', (req, res) => {
  // if the client is out of sync respond immediately
  if (Number(req.query.lastSeen) !== updateID) {
    respondJSON(res, stationDataResponse());
  } else {
    // ... otherwise wait for an updateFromMKLivestatus to respond

    // On timeout send an empty updateFromMKLivestatus
    const pollTimeout = setTimeout(() => {
      pollUpdateEmitter.emit('updateFromMKLivestatus', emptyResponse());
    }, pollTimeoutDelay);

    // If there was an updateFromMKLivestatus respond
    pollUpdateEmitter.once('updateFromMKLivestatus', (data) => {
      clearTimeout(pollTimeout);
      respondJSON(res, data);
    });
  }
});

stationManager.events.on('stationUpdate', () => {
  updateID++;
  pollUpdateEmitter.emit('updateFromMKLivestatus', stationDataResponse());
});

// Longpoll end

app.get('/stations.json', (req, res) => {
  respondJSON(res, stationDataResponse());
});

app.post('/stations.json', (req, res) => {
  if (req.body.action === 'start') {
    logger.debug(`HTTP request received: Start stations ${req.body.stationIDs}`);
    stationManager.startStations(req.body.stationIDs);
    respondJSON(res, emptyResponse());
  } else if (req.body.action === 'stop') {
    logger.debug(`HTTP request received: Stop stations ${req.body.stationIDs}`);
    stationManager.stopStations(req.body.stationIDs);
    respondJSON(res, emptyResponse());
  } else if (req.body.action === 'change_app') {
    logger.debug(
      `HTTP request received: Change app of stations ${req.body.stationIDs} to ${req.body.app}`);
    stationManager.changeApp(req.body.stationIDs, req.body.app);
    respondJSON(res, emptyResponse());
  } else {
    logger.error(`HTTP request received: Invalid POST request with action ${req.body.action}`);
    res.writeHead(404, 'Action not found');
    res.end();
  }
});

app.get('/station_output.json', (req, res) => {
  logger.debug(`HTTP request received: Get output of station ${req.query.stationID}`);
  const station = stationManager.getStationByID(req.query.stationID);
  respondJSON(res, {
    lines: station.outputBuffer.getAll(),
  });
});

app.get('/log.json', (req, res) => {
  logger.debug('HTTP request received: Get log');
  respondJSON(res, { entries: stationManager.getLog() });
});

// Spawn server
const port = nconf.get('port');
app.listen(port);
logger.info(`Server listening on port ${port}.`);

