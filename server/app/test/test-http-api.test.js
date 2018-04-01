// Compiled by Babel
// ** DO NOT EDIT THIS FILE DIRECTLY **
//
'use strict';

var _stationManager = require('../lib/station-manager');

var _stationManager2 = _interopRequireDefault(_stationManager);

var _httpApiServer = require('../lib/http-api-server');

var _httpApiServer2 = _interopRequireDefault(_httpApiServer);

var _testBackend = require('../lib/test-backend/test-backend');

var _testBackend2 = _interopRequireDefault(_testBackend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('supertest');
var logger = require('winston');
var nconf = require('nconf');

var testCfgA = require('../../data/test_mode/test_cfg_a.json');

describe('HTTP API', function () {
  var apiServer = null;

  before(function (done) {
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
      db_path: ''
    });

    var testBackend = new _testBackend2.default(nconf, logger);
    testBackend.load(testCfgA);
    var stationManager = new _stationManager2.default(nconf, logger, testBackend.getHilbertCLIConnector(), testBackend.getMKLivestatusConnector());

    stationManager.init().then(function () {
      var httpAPIServer = new _httpApiServer2.default(stationManager, nconf, logger);
      httpAPIServer.init().then(function () {
        apiServer = httpAPIServer.getServer();
        done();
      });
    });
  });

  describe('GET /stations', function () {
    it('responds with JSON', function (done) {
      request(apiServer).get('/stations').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('POST /stations/start', function () {
    it('fails with no arguments', function (done) {
      request(apiServer).post('/stations/start').set('Accept', 'application/json').expect(400, done);
    });

    it('responds with JSON', function (done) {
      request(apiServer).post('/stations/start').send({ ids: ['station_interactive_1'] }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('POST /stations/stop', function () {
    it('fails with no arguments', function (done) {
      request(apiServer).post('/stations/start').set('Accept', 'application/json').expect(400, done);
    });

    it('responds with JSON', function (done) {
      request(apiServer).post('/stations/stop').send({ ids: ['station_interactive_1'] }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('POST /stations/change_app', function () {
    it('fails with no arguments', function (done) {
      request(apiServer).post('/stations/start').set('Accept', 'application/json').expect(400, done);
    });

    it('responds with JSON', function (done) {
      request(apiServer).post('/stations/change_app').send({ ids: ['station_a'] }).send({ app: 'app_b' }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('GET /station/:id/output', function () {
    it('fails if the station does not exist', function (done) {
      request(apiServer).get('/station/station_x/output').set('Accept', 'application/json').expect(404, done);
    });

    it('responds with JSON', function (done) {
      request(apiServer).get('/station/station_a/output').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('GET /server/output', function () {
    it('responds with JSON', function (done) {
      request(apiServer).get('/server/output').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('GET /server/mklivestatus', function () {
    it('responds with JSON', function (done) {
      request(apiServer).get('/server/mklivestatus').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('GET /notifications', function () {
    it('responds with JSON', function (done) {
      request(apiServer).get('/notifications').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('GET /applications', function () {
    it('responds with JSON', function (done) {
      request(apiServer).get('/applications').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('GET /station_profiles', function () {
    it('responds with JSON', function (done) {
      request(apiServer).get('/station_profiles').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    });
  });
});
//# sourceMappingURL=test-http-api.test.js.map
