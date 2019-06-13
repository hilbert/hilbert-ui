const logger = require('winston');
const nconf = require('nconf');
const appPackage = require('../package.json');
const StationManager = require('./lib/station-manager');
const HilbertCLIConnector = require('./lib/hilbert-cli-connector');
const MKLivestatusConnector = require('./lib/mk-livestatus-connector');
const HttpAPIServer = require('./lib/http-api-server');
const TestBackend = require('./lib/test-backend/test-backend');
const testHilbertCfg = require('../data/test_mode/cfg.json');

nconf.env().argv();
nconf.file('config.json');
nconf.defaults({
  port: '3000',
  test: false,
  scriptConcurrency: 20,
  max_notifications: 100,
  log_directory: './log',
  log_level: 'info', // error, warn, info, verbose, debug, silly
  mkls_poll_delay: 1000,
  mkls_cmd: 'nc localhost 6557',
  long_poll_timeout: 15,
  operation_timeout: 600,
  error_lock_time: 30,
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
