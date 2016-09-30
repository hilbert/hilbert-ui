import 'babel-polyfill';

const appPackage = require('../package.json');
const logger = require('winston');
const nconf = require('nconf');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const EventEmitter = require('events').EventEmitter;

import StationManager from './lib/station-manager';
import HilbertCLIConnector from './lib/hilbert-cli-connector';
import MKLivestatusConnector from './lib/mk-livestatus-connector';
import TestBackend from './lib/test-backend';

const iconmap = require('../iconmap.json');

/**
 ** Setup
 **/

app.use(bodyParser.json());

nconf.env().argv();
nconf.file('config.json');
nconf.defaults({
  port: '3000',
  hilbert_cli_path: '../work/dockapp',
  test: false,
  scriptConcurrency: 20,
  max_log_length: 100,
  log_directory: './log',
  log_level: 'info', // error, warn, info, verbose, debug, silly
  mkls_poll_delay: 1000,
  mkls_cmd: 'nc localhost 6557',
});

logger.add(logger.transports.File, {
  filename: `${nconf.get('log_directory')}/hilbert-ui.log`,
  level: nconf.get('log_level'),
  handleExceptions: true,
  json: false,
});

logger.level = nconf.get('log_level');

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught exception: ${err.message}. Exiting process.`);
  process.exitCode = 1;
});

logger.info(`Starting hilbert-ui server (v${appPackage.version})`);

let hilbertCLIConnector = null;
let mkLivestatusConnector = null;

if (nconf.get('test')) {
  logger.info('Running in Test Mode');
  const testBackend = new TestBackend(nconf, logger);
  hilbertCLIConnector = testBackend.getHilbertCLIConnector();
  mkLivestatusConnector = testBackend.getMKLivestatusConnector();
} else {
  hilbertCLIConnector = new HilbertCLIConnector(nconf, logger);
  mkLivestatusConnector = new MKLivestatusConnector(nconf, logger);
}

const stationManager = new StationManager(
  nconf,
  logger,
  hilbertCLIConnector,
  mkLivestatusConnector
);

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

function writeJSONResponse(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

/**
 ** Routes
 **/

// Longpoll begin

const pollUpdateEmitter = new EventEmitter();
pollUpdateEmitter.setMaxListeners(100);
let updateID = 1;
const pollTimeoutDelay = 15000;

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

app.get('/stations/poll', (req, res) => {
  // if the client is out of sync respond immediately
  if (Number(req.query.lastUpdateID) !== updateID) {
    writeJSONResponse(res, stationDataResponse());
  } else {
    // ... otherwise wait for an updateFromMKLivestatus to respond

    // On timeout send an empty updateFromMKLivestatus
    const pollTimeout = setTimeout(() => {
      pollUpdateEmitter.emit('updateFromMKLivestatus', emptyResponse());
    }, pollTimeoutDelay);

    // If there was an updateFromMKLivestatus respond
    pollUpdateEmitter.once('updateFromMKLivestatus', (data) => {
      clearTimeout(pollTimeout);
      writeJSONResponse(res, data);
    });
  }
});

stationManager.events.on('stationUpdate', () => {
  updateID++;
  pollUpdateEmitter.emit('updateFromMKLivestatus', stationDataResponse());
});

// Longpoll end

app.get('/stations', (req, res) => {
  writeJSONResponse(res, stationDataResponse());
});

app.post('/stations/start', (req, res) => {
  logger.debug(`HTTP request received: Start stations ${req.body.ids}`);
  stationManager.startStations(req.body.ids);
  writeJSONResponse(res, emptyResponse());
});

app.post('/stations/stop', (req, res) => {
  logger.debug(`HTTP request received: Stop stations ${req.body.ids}`);
  stationManager.stopStations(req.body.ids);
  writeJSONResponse(res, emptyResponse());
});

app.post('/stations/change_app', (req, res) => {
  logger.debug(
    `HTTP request received: Change app of stations ${req.body.ids} to ${req.body.app}`);
  stationManager.changeApp(req.body.ids, req.body.app);
  writeJSONResponse(res, emptyResponse());
});

app.get('/station/:id/output', (req, res) => {
  logger.debug(`HTTP request received: Get output of station ${req.params.id}`);
  const station = stationManager.getStationByID(req.params.id);
  if (station) {
    writeJSONResponse(res, {
      lines: station.outputBuffer.getAll(),
    });
  } else {
    logger.error(`Requested output of non existant station ${req.params.id}`);
    res.writeHead(404, 'Station not found');
    res.end();
  }
});

app.get('/server/output', (req, res) => {
  logger.debug(`HTTP request received: Get output of station ${req.params.id}`);
  writeJSONResponse(res, {
    lines: stationManager.globalHilbertCLIOutputBuffer.getAll(),
  });
});

app.get('/server/mklivestatus', (req, res) => {
  logger.debug('HTTP request received: Get last MKLivestatus state');
  writeJSONResponse(res, {
    lastState: stationManager.lastMKLivestatusDump,
  });
});

app.get('/notifications', (req, res) => {
  logger.debug('HTTP request received: Get notifications');
  writeJSONResponse(res, { notifications: stationManager.getLog() });
});

// Spawn server
const port = nconf.get('port');
app.listen(port);
logger.info(`Server listening on port ${port}.`);

