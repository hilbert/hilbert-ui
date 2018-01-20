// Compiled by Babel
// ** DO NOT EDIT THIS FILE DIRECTLY **
//
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a single Preset with its associated data
 */
var Preset = function () {

  /**
   * Constructor
   *
   * @param {Object} data
   *  Data properties to initialize the object
   */
  function Preset() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Preset);

    this.store = null;
    this.id = data.id || null;
    this.name = data.name || null;
    this.stationApps = data.stationApps ? Object.assign({}, data.stationApps) : {};
  }

  /**
   * Returns an object that can be serialized to JSON
   *
   * Used by JSON.stringify
   * @return {{id: (null|*), name: null, stationApps: *}}
   */


  _createClass(Preset, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        id: this.id,
        name: this.name,
        stationApps: Object.assign({}, this.stationApps)
      };
    }

    /**
     * Set the app for a station
     *
     * @param {String} stationID
     * @param {String} appID
     */

  }, {
    key: "setStationApp",
    value: function setStationApp(stationID, appID) {
      this.stationApps[stationID] = appID;
    }

    /**
     * Get the app for a station
     *
     * @param {String} appID
     * @return {Object}
     */

  }, {
    key: "getStationApp",
    value: function getStationApp(appID) {
      return this.stationApps[appID];
    }

    /**
     * Assigns a preset store
     *
     * The store is used for preset storage via the save() and remove() methods
     * @param store
     */

  }, {
    key: "setStore",
    value: function setStore(store) {
      this.store = store;
    }

    /**
     * Saves the preset in the store
     *
     * If the preset's id was null one will be set after calling this function.
     *
     * @return {Promise.<Preset>}
     */

  }, {
    key: "save",
    value: function save() {
      var _this = this;

      if (this.id === null) {
        return this.store.insertPreset(this).then(function (id) {
          _this.id = id;
          return _this;
        });
      }
      return this.store.updatePreset(this);
    }

    /**
     * Deletes the preset from the store
     *
     * The id field is nulled after deleting.
     *
     * @return {Promise.<Preset>}
     */

  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      return this.store.removePreset(this).then(function () {
        _this2.id = null;
      });
    }
  }]);

  return Preset;
}();

exports.default = Preset;


Preset.MAX_ID = 4294967295;
Preset.MAX_NAME_LEN = 50;
//# sourceMappingURL=preset.js.map
