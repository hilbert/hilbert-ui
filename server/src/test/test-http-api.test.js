import StationManager from '../lib/station-manager';
import HttpAPIServer from '../lib/http-api-server';
import TestBackend from '../lib/test-backend';

const request = require('supertest');
const logger = require('winston');
const nconf = require('nconf');

describe('HTTP API', () => {
  let apiServer = null;

  before(function (done) {
    this.timeout(10000);
    setTimeout(done, 10000);
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
    const stationManager = new StationManager(
      nconf,
      logger,
      testBackend.getHilbertCLIConnector(),
      testBackend.getMKLivestatusConnector()
    );

    stationManager.init().then(() => {
      const httpAPIServer = new HttpAPIServer(stationManager, logger);
      apiServer = httpAPIServer.getServer();
      done();
    });
  });

  describe('GET /stations', () => {
    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/stations')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /stations/poll', () => {
    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/stations/poll')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /stations/start', () => {
    it('fails with no arguments', (done) => {
      request(apiServer)
        .post('/stations/start')
        .set('Accept', 'application/json')
        .expect(400, done);
    });

    it('responds with JSON', (done) => {
      request(apiServer)
        .post('/stations/start')
        .send({ ids: 'station_interactive_1' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /stations/stop', () => {
    it('fails with no arguments', (done) => {
      request(apiServer)
        .post('/stations/start')
        .set('Accept', 'application/json')
        .expect(400, done);
    });

    it('responds with JSON', (done) => {
      request(apiServer)
        .post('/stations/stop')
        .send({ ids: 'station_interactive_1' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /stations/change_app', () => {
    it('fails with no arguments', (done) => {
      request(apiServer)
        .post('/stations/start')
        .set('Accept', 'application/json')
        .expect(400, done);
    });

    it('responds with JSON', (done) => {
      request(apiServer)
        .post('/stations/change_app')
        .send({ ids: 'station_interactive_1' })
        .send({ app: 'Black hole pong' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /station/:id/output', () => {
    it('fails if the station does not exist', (done) => {
      request(apiServer)
        .get('/station/0/output')
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/station/station_interactive_1/output')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /server/output', () => {
    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/server/output')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /server/mklivestatus', () => {
    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/server/mklivestatus')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /notifications', () => {
    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/notifications')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
