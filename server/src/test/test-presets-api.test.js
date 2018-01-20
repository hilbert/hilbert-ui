import StationManager from '../lib/station-manager';
import HttpAPIServer from '../lib/http-api-server';
import TestBackend from '../lib/test-backend';

const request = require('supertest');
const logger = require('winston');
const nconf = require('nconf');

describe('Presets HTTP API', () => {
  let apiServer = null;
  let testBackend = null;
  let stationManager = null;

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

    testBackend = new TestBackend(nconf, logger);
    testBackend.addStation({
      id: 'station_a',
      name: 'Station A',
      type: 'type_a',
      default_app: 'app_a',
      possible_apps: ['app_a', 'app_b', 'app_c', 'app_d'],
    });
    testBackend.addStation({
      id: 'station_b',
      name: 'Station B',
      type: 'type_a',
      default_app: 'app_b',
      possible_apps: ['app_a', 'app_b', 'app_c', 'app_d'],
    });
    testBackend.addStation({
      id: 'station_c',
      name: 'Station C',
      type: 'type_a',
      default_app: 'app_c',
      possible_apps: ['app_a', 'app_b', 'app_c', 'app_d'],
    });
    stationManager = new StationManager(
      nconf,
      logger,
      testBackend.getHilbertCLIConnector(),
      testBackend.getMKLivestatusConnector()
    );

    stationManager.init()
    .then(() => stationManager.startStations(['station_a', 'station_b', 'station_c']))
    .then(() => stationManager.pollMKLivestatus())
    .then(() => stationManager.pollMKLivestatus())
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
        stationApps: {
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
        stationApps: {
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

    it('fails with a non numeric id', () => request(apiServer)
      .get('/preset/xxxx')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with id = 0', () => request(apiServer)
      .get('/preset/0')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a negative id', () => request(apiServer)
      .get('/preset/-1')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a very large id', () => request(apiServer)
      .get('/preset/99999999999')
      .set('Accept', 'application/json')
      .expect(400)
    );

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
            stationApps: {
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
        stationApps: {
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
        stationApps: {
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
            stationApps: {
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
        stationApps: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset does not have a name', () => request(apiServer)
      .post('/preset')
      .send({
        stationApps: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset has an empty name', () => request(apiServer)
      .post('/preset')
      .send({
        name: '',
        stationApps: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset has a name that is too long', () => request(apiServer)
      .post('/preset')
      .send({
        name: '123456789012345678901234567890123456789012345678901',
        stationApps: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset does not have stationApps', () => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset 2',
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if stationApps is the wrong format', () => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset 2',
        stationApps: {
          station_a: 'an_app',
          station_b: [1, 2, 3],
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
        stationApps: {
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
        stationApps: {
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

    it('fails with a non numeric id', () => request(apiServer)
      .put('/preset/xxxx')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with id = 0', () => request(apiServer)
      .put('/preset/0')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a negative id', () => request(apiServer)
      .put('/preset/-1')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a very large id', () => request(apiServer)
      .put('/preset/99999999999')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset does not exist', () => request(apiServer)
      .put('/preset/8')
      .send({
        name: 'My Preset B',
        stationApps: {
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
        stationApps: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset has an empty name', () => request(apiServer)
      .put('/preset/1')
      .send({
        name: '',
        stationApps: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset has a name that is too long', () => request(apiServer)
      .put('/preset/1')
      .send({
        name: '123456789012345678901234567890123456789012345678901',
        stationApps: {
          station_a: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if stationApps is the wrong format', () => request(apiServer)
      .put('/preset/1')
      .send({
        name: 'My Preset 2',
        stationApps: {
          station_a: 'an_app',
          station_b: [1, 2, 3],
        },
      })
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('responds with JSON', () => request(apiServer)
      .put('/preset/1')
      .send({
        name: 'My Preset 1',
        stationApps: {
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
        stationApps: {
          station_a: 'app_d',
          station_b: 'app_a',
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

    it('fails with a non numeric id', () => request(apiServer)
      .delete('/preset/xxxx')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with id = 0', () => request(apiServer)
      .delete('/preset/0')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a negative id', () => request(apiServer)
      .delete('/preset/-1')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a very large id', () => request(apiServer)
      .delete('/preset/99999999999')
      .set('Accept', 'application/json')
      .expect(400)
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

  describe('POST /preset/:id/activate', () => {
    beforeEach(() => request(apiServer)
      .post('/preset')
      .send({
        name: 'My Preset',
        stationApps: {
          station_a: 'app_d',
          station_b: 'app_a',
          station_x: 'app_a',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    );

    it('fails with a non numeric id', () => request(apiServer)
      .post('/preset/xxxx/activate')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with id = 0', () => request(apiServer)
      .post('/preset/0/activate')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a negative id', () => request(apiServer)
      .post('/preset/-1/activate')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails with a very large id', () => request(apiServer)
      .post('/preset/99999999999/activate')
      .set('Accept', 'application/json')
      .expect(400)
    );

    it('fails if the preset does not exist', () => request(apiServer)
      .post('/preset/8/activate')
      .set('Accept', 'application/json')
      .expect(404)
    );

    it('responds with JSON', () => request(apiServer)
      .post('/preset/1/activate')
      .set('Accept', 'application/json')
      .expect(200)
      .then(() => {
        stationManager.getStationByID('station_a').state.should.equal('switching_app');
        stationManager.getStationByID('station_a').switching_app.should.equal('app_d');
        stationManager.getStationByID('station_b').state.should.equal('switching_app');
        stationManager.getStationByID('station_b').switching_app.should.equal('app_a');
        stationManager.getStationByID('station_c').state.should.equal('on');
      })
    );
  });
});
