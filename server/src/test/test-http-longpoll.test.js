import StationManager from '../lib/station-manager';
import HttpAPIServer from '../lib/http-api-server';
import TestBackend from '../lib/test-backend';

const logger = require('winston');
const nconf = require('nconf');
const request = require('supertest');
require('should');

describe('HTTP Longpoll', () => {
  let apiServer = null;
  let httpServer = null;
  let stationManager = null;

  let pollWaited = false;
  let pollTimedOut = false;

  beforeEach((done) => {
    nconf.defaults({
      port: '3000',
      hilbert_cli_path: '../work/dockapp',
      test: true,
      scriptConcurrency: 20,
      max_log_length: 100,
      log_directory: './log',
      log_level: 'info', // error, warn, info, verbose, debug, silly
      mkls_poll_delay: 1000,
      mkls_cmd: 'nc localhost 6557',
    });

    const testBackend = new TestBackend(nconf, logger);
    testBackend.addStation({
      id: 'station_a',
      name: 'Station A',
      type: 'type_a',
      default_app: 'app_a',
      possible_apps: ['app_a', 'app_b', 'app_c'],
    });

    stationManager = new StationManager(
      nconf,
      logger,
      testBackend.getHilbertCLIConnector(),
      testBackend.getMKLivestatusConnector()
    );

    stationManager.init().then(() => {
      apiServer = new HttpAPIServer(stationManager, logger);
      httpServer = apiServer.getServer();

      pollWaited = false;
      pollTimedOut = false;
      apiServer.pollTimeoutDelay = 0;

      apiServer.events.on('longPollWait', () => {
        pollWaited = true;
      });

      apiServer.events.on('longPollTimeout', () => {
        pollTimedOut = true;
      });

      done();
    });
  });

  it('Responds immediately if out of sync', (done) => {
    request(httpServer)
      .get('/stations/poll')
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
      .get('/stations/poll')
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
      .get('/stations/poll')
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
