/**
 * Represents a single Preset with its associated data
 */
export default class Preset {

  /**
   * Constructor. Instead of calling this directly use PresetStore::createPreset
   *
   * @param {PresetStore} presetStore
   *  Store where the preset will be persisted
   */
  constructor(presetStore) {
    this.store = presetStore;
    this.id = null;
    this.name = null;
    this.clearAllStationApps();
  }

  /**
   * Clears app assignments for all stations
   */
  clearAllStationApps() {
    this.stationData = {};
  }

  /**
   * Set the app for a station
   *
   * @param {String} stationID
   * @param {String} appID
   */
  setStationApp(stationID, appID) {
    this.stationData[stationID] = appID;
  }

  /**
   * Get the app for a station
   *
   * @param {String} appID
   * @return {Object}
   */
  getStationApp(appID) {
    return this.stationData[appID];
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
