/**
 * Represents a single Preset with its associated data
 */
class Preset {

  /**
   * Constructor
   *
   * @param {Object} data
   *  Data properties to initialize the object
   */
  constructor(data = {}) {
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
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      stationApps: Object.assign({}, this.stationApps),
    };
  }

  /**
   * Set the app for a station
   *
   * @param {String} stationID
   * @param {String} appID
   */
  setStationApp(stationID, appID) {
    this.stationApps[stationID] = appID;
  }

  /**
   * Get the app for a station
   *
   * @param {String} appID
   * @return {Object}
   */
  getStationApp(appID) {
    return this.stationApps[appID];
  }

  /**
   * Assigns a preset store
   *
   * The store is used for preset storage via the save() and remove() methods
   * @param store
   */
  setStore(store) {
    this.store = store;
  }

  /**
   * Saves the preset in the store
   *
   * If the preset's id was null one will be set after calling this function.
   *
   * @return {Promise.<Preset>}
   */
  save() {
    if (this.id === null) {
      return this.store.insertPreset(this).then((id) => {
        this.id = id;
        return this;
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
  remove() {
    return this.store.removePreset(this).then(() => {
      this.id = null;
    });
  }
}

Preset.MAX_ID = 4294967295;
Preset.MAX_NAME_LEN = 50;

module.exports = Preset;
