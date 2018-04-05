// Compiled by Babel
// ** DO NOT EDIT THIS FILE DIRECTLY **
//
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _station = require('./station');

var _station2 = _interopRequireDefault(_station);

var _stationProfile = require('./station-profile');

var _stationProfile2 = _interopRequireDefault(_stationProfile);

var _application = require('./application');

var _application2 = _interopRequireDefault(_application);

var _terminalOutputBuffer = require('./terminal-output-buffer');

var _terminalOutputBuffer2 = _interopRequireDefault(_terminalOutputBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('bluebird');
var EventEmitter = require('events').EventEmitter;
var Ajv = require('ajv');

var HilbertCfgSchema = require('../../data/schema/hilbert-cfg-partial.json');

/**
 * Service Layer for hilbert
 * Dispatches requests asynchronously and keeps cached state
 */

var StationManager = function () {

  /**
   * Create a Station Manager
   *
   * @param {Object} nconf - Instance of nconf configuration
   * @param {Object} logger - Instance of winston logger
   * @param {HilbertCLIConnector} hilbertCLI - hilbert-cli connector
   * @param {MKLivestatusConnector} mkLivestatus - MKLivestatus connector
   */
  function StationManager(nconf, logger, hilbertCLI, mkLivestatus) {
    _classCallCheck(this, StationManager);

    this.nconf = nconf;
    this.logger = logger;

    this.hilbertCLI = hilbertCLI;
    this.mkLivestatus = mkLivestatus;

    this.events = new EventEmitter();
    this.notifications = [];
    this.lastNotificationID = 1;

    this.globalHilbertCLIOutputBuffer = new _terminalOutputBuffer2.default();
    this.lastMKLivestatusDump = [];
    this.lastMKLivestatusDumpTime = '';

    this.clearStations();
    this.clearStationProfiles();
    this.clearApplications();
  }

  /**
   * Reads the station configuration and begins polling station status
   *
   * @return {Promise}
   */


  _createClass(StationManager, [{
    key: 'init',
    value: function init() {
      var _this = this;

      return this.loadHilbertCfg().then(function () {
        var pollLoopBody = function pollLoopBody() {
          var pollDelay = _this.nconf.get('mkls_poll_delay');
          var consecutiveErrors = 0;
          var errorDigestSize = 50;
          _this.pollMKLivestatus().then(function () {
            consecutiveErrors = 0;
            setTimeout(pollLoopBody, pollDelay);
          }).catch(function () {
            if (consecutiveErrors % errorDigestSize) {
              if (consecutiveErrors !== 0) {
                _this.logger.error('Station manager: Repeated MKLivestatus polling errors (' + errorDigestSize + ' times)');
              }
            }
            consecutiveErrors += 1;
            setTimeout(pollLoopBody, pollDelay);
          });
        };
        pollLoopBody();
      });
    }

    /**
     * Loads the station configuration.
     *
     * If the configuration was already loaded this method clears it
     * and reloads everything
     *
     * @returns {Promise}
     */

  }, {
    key: 'loadHilbertCfg',
    value: function loadHilbertCfg() {
      var _this2 = this;

      this.clearStations();
      this.clearStationProfiles();
      this.clearApplications();
      this.signalUpdate();

      return this.hilbertCLI.getHilbertCfg(this.globalHilbertCLIOutputBuffer).then(function (hilbertCfg) {
        return StationManager.validateHilbertCfg(hilbertCfg);
      }).then(function (hilbertCfg) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(hilbertCfg.Applications)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var appID = _step$value[0];
            var appCfg = _step$value[1];

            _this2.addApplication(new _application2.default(appID, appCfg));
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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.entries(hilbertCfg.Profiles)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2);

            var profileID = _step2$value[0];
            var profileCfg = _step2$value[1];

            _this2.addStationProfile(new _stationProfile2.default(profileID, profileCfg));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.entries(hilbertCfg.Stations)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2);

            var stationID = _step3$value[0];
            var stationCfg = _step3$value[1];

            if (!stationCfg.hidden) {
              _this2.addStation(new _station2.default(stationID, stationCfg, _this2.nconf));
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        _this2.signalUpdate();
      });
    }

    /**
     * Adds a station profile
     *
     * @param {StationProfile} stationProfile
     */

  }, {
    key: 'addStationProfile',
    value: function addStationProfile(stationProfile) {
      this.logger.verbose('Station manager: Adding station profile ' + stationProfile.id);
      this.stationProfiles.set(stationProfile.id, stationProfile);
    }

    /**
     * Adds an application
     *
     * @param {Application} application
     */

  }, {
    key: 'addApplication',
    value: function addApplication(application) {
      this.logger.verbose('Station manager: Adding application profile ' + application.id);
      this.applications.set(application.id, application);
    }

    /**
     * Adds a station to the manager
     * @param {Station} aStation
     */

  }, {
    key: 'addStation',
    value: function addStation(aStation) {
      var _this3 = this;

      this.logger.verbose('Station manager: Adding station ' + aStation.id);
      this.stationList.push(aStation);
      this.stationIndex.set(aStation.id, aStation);
      aStation.events.on('stateChange', function (station, type, message) {
        _this3.notify(type, station, message);
        if (type === 'info') {
          _this3.logger.info('Station manager: ' + station.id + ': ' + message);
        } else if (type === 'warning') {
          _this3.logger.warn('Station manager: ' + station.id + ': ' + message);
        } else if (type === 'error') {
          _this3.logger.error('Station manager: ' + station.id + ': ' + message);
        } else {
          _this3.logger.verbose('Station manager: ' + station.id + ': ' + message);
        }
      });
    }

    /**
     * Removes a station from the manager
     * @param {Station} aStation
     */

  }, {
    key: 'removeStation',
    value: function removeStation(aStation) {
      this.logger.verbose('Station manager: Removing station ' + aStation.id);
      var i = this.stationList.indexOf(aStation);
      if (i !== -1) {
        this.stationList.splice(i, 1);
      }

      this.stationIndex.delete(aStation.id);
    }

    /**
     * Removes all the stations
     */

  }, {
    key: 'clearStations',
    value: function clearStations() {
      this.logger.verbose('Station manager: Clearing all stations');
      this.stationIndex = new Map();
      this.stationList = [];
    }

    /**
     * Removes all the station profiles
     */

  }, {
    key: 'clearStationProfiles',
    value: function clearStationProfiles() {
      this.logger.verbose('Station manager: Clearing all station profiles');
      this.stationProfiles = new Map();
    }

    /**
     * Removes all the applications
     */

  }, {
    key: 'clearApplications',
    value: function clearApplications() {
      this.logger.verbose('Station manager: Clearing all applications');
      this.applications = new Map();
    }

    /**
     * Returns the station profiles
     *
     * @return {Iterator.<StationProfile>}
     */

  }, {
    key: 'getStationProfiles',
    value: function getStationProfiles() {
      return this.stationProfiles.values();
    }

    /**
     * Returns the applications
     *
     * @return {Iterator.<Application>}
     */

  }, {
    key: 'getApplications',
    value: function getApplications() {
      return this.applications.values();
    }

    /**
     * Get the ordered list of stations
     * @returns {Array}
     */

  }, {
    key: 'getStations',
    value: function getStations() {
      return this.stationList;
    }

    /**
     * Return a station identified by ID
     *
     * @param {string} id - Station ID
     * @returns {Station}
     */

  }, {
    key: 'getStationByID',
    value: function getStationByID(id) {
      return this.stationIndex.get(id);
    }

    /**
     * Start indicated stations
     *
     * @param {Iterable} stationIDs - IDs of stations to start
     * @return {Promise}
     */

  }, {
    key: 'startStations',
    value: function startStations(stationIDs) {
      var _this4 = this;

      var eligibleStations = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = stationIDs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var stationID = _step4.value;

          var station = this.getStationByID(stationID);
          if (station && station.setQueuedToStartState()) {
            eligibleStations.push(stationID);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this.signalUpdate();

      return Promise.map(eligibleStations, function (eligibleStation) {
        _this4.logger.verbose('Station manager: Starting station ' + eligibleStation);
        var station = _this4.getStationByID(eligibleStation);
        station.setStartingState();
        _this4.signalUpdate();
        _this4.mkLivestatus.invalidateAppState(station.id);
        return _this4.hilbertCLI.startStation(station.id, station.outputBuffer).then(function () {
          _this4.logger.verbose('Station manager: Waiting for station ' + eligibleStation + ' to start');
        }).catch(function () {
          _this4.logger.verbose('Station manager: Error starting station ' + eligibleStation);
          _this4.notify('error', station, 'Error starting station');
          station.setErrorState('Failure starting the station. Please wait...');
          station.errorLock();
        }).then(function () {
          _this4.signalUpdate();
        });
      }, { concurrency: this.nconf.get('scriptConcurrency') });
    }

    /**
     * Stop indicated stations
     *
     * @param {Iterable} stationIDs - IDs of stations to stop
     * @return {Promise}
     */

  }, {
    key: 'stopStations',
    value: function stopStations(stationIDs) {
      var _this5 = this;

      var eligibleStations = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = stationIDs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var stationID = _step5.value;

          var station = this.getStationByID(stationID);
          if (station && station.setQueuedToStopState()) {
            eligibleStations.push(stationID);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this.signalUpdate();

      return Promise.map(eligibleStations, function (eligibleStation) {
        _this5.logger.verbose('Station manager: Stopping station ' + eligibleStation);
        var station = _this5.getStationByID(eligibleStation);
        station.setStoppingState();
        _this5.signalUpdate();
        return _this5.hilbertCLI.stopStation(station.id, station.outputBuffer).then(function () {
          _this5.logger.verbose('Station manager: Waiting for station ' + eligibleStation + ' to stop');
        }).catch(function () {
          _this5.logger.verbose('Station manager: Error stopping station ' + eligibleStation);
          _this5.notify('error', station, 'Error stopping station');
          station.setErrorState('Failure stopping the station. Please wait...');
          station.errorLock();
        }).then(function () {
          _this5.signalUpdate();
        });
      }, { concurrency: this.nconf.get('scriptConcurrency') });
    }

    /**
     * Change the application running in indicated stations
     *
     * @param {Iterable} stationIDs - IDs of stations in which to change the appID
     * @param {string} appID - Name of the appID to run
     * @return {Promise}
     */

  }, {
    key: 'changeApp',
    value: function changeApp(stationIDs, appID) {
      var _this6 = this;

      var eligibleStations = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = stationIDs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var stationID = _step6.value;

          var station = this.getStationByID(stationID);
          if (station && station.setQueuedToChangeAppState(appID)) {
            eligibleStations.push(stationID);
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      this.signalUpdate();

      return Promise.map(eligibleStations, function (eligibleStation) {
        _this6.logger.verbose('Station manager: Changing app of station ' + eligibleStation + ' to ' + appID);
        var station = _this6.getStationByID(eligibleStation);
        station.setChangingAppState(appID);
        _this6.signalUpdate();
        return _this6.hilbertCLI.changeApp(eligibleStation, appID, station.outputBuffer).then(function () {
          _this6.logger.verbose('Station manager: Waiting for app of station ' + eligibleStation + ' to change to ' + appID);
        }).catch(function () {
          _this6.logger.verbose('Station manager: Error changing app of station ' + eligibleStation + ' to ' + appID);
          _this6.notify('error', station, 'Failed to launch app ' + appID);
          station.setErrorState('Failed to open ' + appID + '. Please wait...');
          station.errorLock();
        }).then(function () {
          _this6.signalUpdate();
        });
      }, { concurrency: this.nconf.get('scriptConcurrency') });
    }

    /**
     * Return the notification log
     *
     * Each notification is an object with the following structure:
     * - id {string} : Unique id of the entry
     * - time {string} : Timestamp in ISO format
     * - type {string} : info | warning | error
     * - message {string} : Event description
     *
     * @returns {Array}
     */

  }, {
    key: 'getNotifications',
    value: function getNotifications() {
      return this.notifications;
    }

    /**
     * Generates a notification
     *
     * @param {string} type - Notification type: info | warning | error
     * @param {Station|null} station - station associated with the event logged
     * @param {string} message - Text of the notification
     */

  }, {
    key: 'notify',
    value: function notify(type, station, message) {
      var newNotification = {
        id: this.lastNotificationID,
        time: new Date().toISOString(),
        type: type,
        message: message
      };

      if (station !== null) {
        newNotification.station_id = station.id;
        newNotification.station_name = station.name;
      }

      this.lastNotificationID += 1;
      this.notifications.push(newNotification);
      var maxNotifications = this.nconf.get('max_notifications');
      if (this.notifications.length > maxNotifications) {
        this.notifications = this.notifications.slice(this.notifications.length - maxNotifications);
      }

      this.events.emit('notification', newNotification);
    }

    /**
     * Polls MKLivestatus and updates the state of stations
     * @returns {Promise}
     */

  }, {
    key: 'pollMKLivestatus',
    value: function pollMKLivestatus() {
      var _this7 = this;

      return this.mkLivestatus.getState().then(function (allStationsStatus) {
        var lastState = [];
        var changes = false;
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = allStationsStatus[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var stationStatus = _step7.value;

            lastState.push(stationStatus);
            var station = _this7.getStationByID(stationStatus.id);
            if (station) {
              if (station.updateFromMKLivestatus(stationStatus)) {
                changes = true;
              }
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        _this7.lastMKLivestatusDump = lastState;
        _this7.lastMKLivestatusDumpTime = new Date().toISOString();

        if (changes) {
          _this7.signalUpdate();
        }
      });
    }
    /**
     * Signal listeners that station data was modified
     * @private
     */

  }, {
    key: 'signalUpdate',
    value: function signalUpdate() {
      this.events.emit('stationUpdate');
    }

    /**
     * Validates a hilbert configuration according to the schema
     *
     * Only the parts of the configuration used by this program are validated
     *
     * @param hilbertCfg
     * @return {*}
     */

  }], [{
    key: 'validateHilbertCfg',
    value: function validateHilbertCfg(hilbertCfg) {
      var ajv = new Ajv();
      if (!ajv.validate(HilbertCfgSchema, hilbertCfg)) {
        throw new Error('Error in Hilbert CFG: ' + ajv.errorsText());
      }
      return hilbertCfg;
    }
  }]);

  return StationManager;
}();

exports.default = StationManager;
//# sourceMappingURL=station-manager.js.map
