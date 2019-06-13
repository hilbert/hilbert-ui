const logger = require('winston');
const nconf = require('nconf');
const request = require('supertest');
require('should');

const StationManager = require('../lib/station-manager');
const HttpAPIServer = require('../lib/http-api-server');
const TestBackend = require('../lib/test-backend/test-backend');

const testCfgA = require('../../data/test_mode/test_cfg_a.json');

describe('HTTP Longpoll', () => {
  let apiServer = null;
  let httpServer = null;
  let stationManager = null;

  let pollWaited = false;
  let pollTimedOut = false;

  beforeEach((done) => {
    nconf.defaults({
      port: '3000',
      test: true,
      scriptConcurrency: 20,
      max_notifications: 100,
      log_directory: './log',
      log_level: 'info', // error, warn, info, verbose, debug, silly
      mkls_poll_delay: 1000,
      mkls_cmd: 'nc localhost 6557',
      long_poll_timeout: 0,
      operation_timeout: 10,
      error_lock_time: 10,
      db_path: '',
    });

    const testBackend = new TestBackend(nconf, logger);
    testBackend.load(testCfgA);

    stationManager = new StationManager(
      nconf,
      logger,
      testBackend.getHilbertCLIConnector(),
      testBackend.getMKLivestatusConnector()
    );

    stationManager.init().then(() => {
      apiServer = new HttpAPIServer(stationManager, nconf, logger);
      apiServer.init().then(() => {
        httpServer = apiServer.getServer();

        pollWaited = false;
        pollTimedOut = false;

        apiServer.events.on('longPollWait', () => {
          pollWaited = true;
        });

        apiServer.events.on('longPollTimeout', () => {
          pollTimedOut = true;
        });

        done();
      });
    });
  });

  it('Responds immediately if out of sync', (done) => {
    request(httpServer)
      .get('/stations')
      .query({ lastUpdateID: 0 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        pollWaited.should.equal(false);
        pollTimedOut.should.equal(false);
        res.body.updateID.should.equal(1);
        done();
      });
  });

  it('Responds after an update if synced', (done) => {
    request(httpServer)
      .get('/stations')
      .query({ lastUpdateID: 1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        // Response arrives after update
        pollWaited.should.equal(true);
        pollTimedOut.should.equal(false);
        res.body.updateID.should.be.above(1);
        done();
      });

    apiServer.events.on('longPollWait', () => {
      // Simulate an update after it begins the wait
      stationManager.startStations(['station_a']);
    });
  });

  it('Responds (empty response) if synced and times-out waiting for an update', (done) => {
    request(httpServer)
      .get('/stations')
      .query({ lastUpdateID: 1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        // Response arrives after time out
        pollWaited.should.equal(true);
        pollTimedOut.should.equal(true);

        // Response should be empty
        const responseIsEmpty = (Object.keys(res.body).length === 0 &&
          res.body.constructor === Object);
        responseIsEmpty.should.equal(true);
        done();
      });
  });
});
