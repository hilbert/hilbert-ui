// Compiled by Babel
// ** DO NOT EDIT THIS FILE DIRECTLY **
//
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nagios = require('./nagios');

var _nagios2 = _interopRequireDefault(_nagios);

var _testDockappConnector = require('./test-dockapp-connector');

var _testDockappConnector2 = _interopRequireDefault(_testDockappConnector);

var _testMkLivestatusConnector = require('./test-mk-livestatus-connector');

var _testMkLivestatusConnector2 = _interopRequireDefault(_testMkLivestatusConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var testStations = require('../../tests/models/test_stations.json');

var TestBackend = function () {
  function TestBackend(nconf, logger) {
    _classCallCheck(this, TestBackend);

    this.nconf = nconf;
    this.logger = logger;

    this.dockAppConnector = new _testDockappConnector2.default(this, nconf, logger);
    this.mkLivestatusConnector = new _testMkLivestatusConnector2.default(this, nconf, logger);

    this.state = new Map();
    this.station_cfg = new Map();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = testStations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var station = _step.value;

        this.state.set(station.id, {
          id: station.id,
          state: _nagios2.default.HostState.DOWN,
          state_type: _nagios2.default.StateType.HARD,
          app_state: _nagios2.default.ServiceState.UNKNOWN,
          app_state_type: _nagios2.default.StateType.HARD,
          app_id: ''
        });

        this.station_cfg.set(station.id, {
          id: station.id,
          name: station.name,
          type: station.type,
          default_app: station.default_app,
          possible_apps: station.possible_apps
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  /**
   * Returns a DockAppConnector stub for testing
   * @returns {TestDockAppConnector}
   */


  _createClass(TestBackend, [{
    key: 'getDockappConnector',
    value: function getDockappConnector() {
      return this.dockAppConnector;
    }

    /**
     * Returns a MKLivestatusConnector stub for testing
     * @returns {TestMKLivestatusConnector}
     */

  }, {
    key: 'getMKLivestatusConnector',
    value: function getMKLivestatusConnector() {
      return this.mkLivestatusConnector;
    }
  }, {
    key: 'getStationState',
    value: function getStationState() {
      return this.state.values();
    }

    /**
     * Reads the station config
     * @returns {Promise}
     * @resolve {Array} - List of stations
     * @reject {Error}
     */

  }, {
    key: 'getStationConfig',
    value: function getStationConfig() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.randomDelay(1000, 3000).then(function () {
          resolve(_this.station_cfg.values());
        });
      });
    }

    /**
     * Starts a station
     *
     * @param stationID
     * @returns {Promise}
     */

  }, {
    key: 'startStation',
    value: function startStation(stationID) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.randomDelay(3000, 8000).then(function () {
          var stationState = _this2.state.get(stationID);
          var stationCfg = _this2.station_cfg.get(stationID);
          if (stationState && stationState.state === _nagios2.default.HostState.DOWN) {
            stationState.state = _nagios2.default.HostState.UP;
            stationState.app_state = _nagios2.default.ServiceState.OK;
            stationState.app_state_type = _nagios2.default.StateType.HARD;
            stationState.app_id = stationCfg.default_app;
          }
        }).then(resolve);
      });
    }

    /**
     * Stops a station
     *
     * @param stationID
     * @returns {Promise}
     */

  }, {
    key: 'stopStation',
    value: function stopStation(stationID) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.randomDelay(2000, 6000).then(function () {
          var stationState = _this3.state.get(stationID);
          if (stationState && stationState.state === _nagios2.default.HostState.UP) {
            stationState.state = _nagios2.default.HostState.DOWN;
            stationState.app_state = _nagios2.default.ServiceState.UNKNOWN;
            stationState.app_state_type = _nagios2.default.StateType.HARD;
            stationState.app_id = '';
          }
        }).then(resolve);
      });
    }

    /**
     * Change the foreground application running in a station
     *
     * @param {string} stationID - ID of the station
     * @param {string} appID - ID of the app to set
     * @returns {Promise}
     */

  }, {
    key: 'changeApp',
    value: function changeApp(stationID, appID) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.randomDelay(1000, 5000).then(function () {
          var stationState = _this4.state.get(stationID);
          var stationCfg = _this4.station_cfg.get(stationID);

          if (stationCfg.possible_apps.indexOf(appID) >= 0) {
            stationState.app_id = appID;
          }
        }).then(function () {
          if (appID === 'Sky explorer / Aladin lite') {
            reject();
          } else {
            resolve();
          }
        });
      });
    }

    /**
     * Wait a random amount of time
     * @private
     * @param min
     * @param max
     * @returns {Promise}
     */

  }, {
    key: 'randomDelay',
    value: function randomDelay(min, max) {
      return new Promise(function (resolve) {
        var delay = Math.floor(Math.random() * (max - min)) + min;
        setTimeout(function () {
          resolve();
        }, delay);
      });
    }
  }]);

  return TestBackend;
}();

exports.default = TestBackend;
//# sourceMappingURL=test-backend.js.map
