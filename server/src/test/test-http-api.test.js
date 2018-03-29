import StationManager from '../lib/station-manager';
import HttpAPIServer from '../lib/http-api-server';
import TestBackend from '../lib/test-backend/test-backend';

const request = require('supertest');
const logger = require('winston');
const nconf = require('nconf');

const testCfgA = require('../../data/test_mode/test_cfg_a.json');

describe('HTTP API', () => {
  let apiServer = null;

  before((done) => {
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
      db_path: '',
    });

    const testBackend = new TestBackend(nconf, logger);
    testBackend.load(testCfgA);
    const stationManager = new StationManager(
      nconf,
      logger,
      testBackend.getHilbertCLIConnector(),
      testBackend.getMKLivestatusConnector()
    );

    stationManager.init().then(() => {
      const httpAPIServer = new HttpAPIServer(stationManager, nconf, logger);
      httpAPIServer.init().then(() => {
        apiServer = httpAPIServer.getServer();
        done();
      });
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
        .send({ ids: ['station_interactive_1'] })
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
        .send({ ids: ['station_interactive_1'] })
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
        .send({ ids: ['station_a'] })
        .send({ app: 'app_b' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /station/:id/output', () => {
    it('fails if the station does not exist', (done) => {
      request(apiServer)
        .get('/station/station_x/output')
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/station/station_a/output')
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

  describe('GET /applications', () => {
    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/applications')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /station_profiles', () => {
    it('responds with JSON', (done) => {
      request(apiServer)
        .get('/station_profiles')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
