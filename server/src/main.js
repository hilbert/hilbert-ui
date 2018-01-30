import 'babel-polyfill';
import StationManager from './lib/station-manager';
import HilbertCLIConnector from './lib/hilbert-cli-connector';
import MKLivestatusConnector from './lib/mk-livestatus-connector';
import HttpAPIServer from './lib/http-api-server';
import TestBackend from './lib/test-backend';

const appPackage = require('../package.json');
const logger = require('winston');
const nconf = require('nconf');

const testHilbertCfg = require('../data/test_mode/cfg.json');

nconf.env().argv();
nconf.file('config.json');
nconf.defaults({
  port: '3000',
  test: false,
  scriptConcurrency: 20,
  max_log_length: 100,
  log_directory: './log',
  log_level: 'info', // error, warn, info, verbose, debug, silly
  mkls_poll_delay: 1000,
  mkls_cmd: 'nc localhost 6557',
  long_poll_timeout: 15,
  db_path: '',
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
  testBackend.simulateDelays = true;
  testBackend.load(testHilbertCfg);
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

let server = null;
stationManager.init()
  .then(() => {
    server = new HttpAPIServer(stationManager, nconf, logger);
    return server.init();
  })
  .then(() => {
    server.listen(nconf.get('port'));
  })
  .catch((err) => {
    logger.error(`Error initializing Station Manager: ${err.message}. Exiting process.`);
    process.exitCode = 2;
  });
