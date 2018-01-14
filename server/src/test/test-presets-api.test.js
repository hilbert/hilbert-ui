import StationManager from '../lib/station-manager';
import HttpAPIServer from '../lib/http-api-server';
import TestBackend from '../lib/test-backend';

const request = require('supertest');
const logger = require('winston');
const nconf = require('nconf');

describe('Presets HTTP API', () => {
  let apiServer = null;

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
      long_poll_timeout: 0,
      db_path: '',
    });

    const testBackend = new TestBackend(nconf, logger);
    testBackend.addStation({
      id: 'station_a',
      name: 'Station A',
      type: 'type_a',
      default_app: 'app_a',
      possible_apps: ['app_a', 'app_b', 'app_c'],
    });
    const stationManager = new StationManager(
      nconf,
      logger,
      testBackend.getHilbertCLIConnector(),
      testBackend.getMKLivestatusConnector()
    );

    stationManager.init()
    .then(() => {
      const httpAPIServer = new HttpAPIServer(stationManager, nconf, logger);
      httpAPIServer.init().then(() => {
        apiServer = httpAPIServer.getServer();
        done();
      });
    });
  });

  describe('GET /presets without presets', () => {
    it('responds with JSON', () => request(apiServer)
      .get('/presets')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        response.body.should.deepEqual({ presets: [] });
      })
    );
  });

  describe('GET /presets with presets', () => {
    beforeEach(() => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );

    it('responds with JSON', () => request(apiServer)
      .get('/presets')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        response.body.should.deepEqual({ presets: [
          {
            id: 1,
            name: 'My Preset',
          },
        ] });
      })
    );
  });

  describe('GET /preset/:id', () => {
    beforeEach(() => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );

    it('fails with no arguments', (done) => {
      request(apiServer)
        .get('/preset')
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('fails if the requested station does not exist', (done) => {
      request(apiServer)
        .get('/preset/777')
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('responds with JSON', () => request(apiServer)
      .get('/preset/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        response.body.should.deepEqual(
          {
            id: 1,
            name: 'My Preset',
            stationData: {
              station_a: 'app_a',
            },
          }
        );
      })
    );
  });

  describe('POST /preset', () => {
    beforeEach(() => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );

    it('responds with JSON', () => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset 2',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        response.body.should.deepEqual(
          {
            id: 2,
            name: 'My Preset 2',
            stationData: {
              station_a: 'app_a',
            },
          }
        );
      })
    );

    it('fails when adding a preset with an existing name', () => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );
  });

  describe('PUT /preset/:id', () => {
    beforeEach(() => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );

    beforeEach(() => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset 2',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );

    it('fails with no arguments', () => request(apiServer)
      .put('/preset')
      .set('Accept', 'application/json')
      .expect(404)
    );

    it('fails if the preset does not exist', () => request(apiServer)
      .put('/preset/8')
      .send({
        name: 'My Preset B',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(404)
    );

    it('fails if the name already exists', () => request(apiServer)
      .put('/preset/2')
      .send({
        name: 'My Preset',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('responds with JSON', () => request(apiServer)
      .put('/preset/1')
      .send({
        name: 'My Preset 1',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );
  });

  describe('DELETE /preset/:id', () => {
    beforeEach(() => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset',
        stationData: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );

    it('fails with no arguments', () => request(apiServer)
      .delete('/preset')
      .set('Accept', 'application/json')
      .expect(404)
    );

    it('fails if the preset does not exist', () => request(apiServer)
      .delete('/preset/8')
      .set('Accept', 'application/json')
      .expect(404)
    );

    it('responds with JSON', () => request(apiServer)
      .delete('/preset/1')
      .set('Accept', 'application/json')
      .expect(200)
    );
  });
});
