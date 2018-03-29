const Promise = require('bluebird');

/**
 * Hilbert UI API Connector
 */
export default class UIAPI {
  constructor(apiRoot) {
    this.apiRoot = apiRoot;
  }

  /**
   * Get the station state
   *
   * This call uses long polling, so it sends the last update ID and has a long timeout
   *
   * @param lastUpdateID
   * @return {bluebird}
   */
  getStations(lastUpdateID) {
    return this.send('get', '/stations', { lastUpdateID }, { timeout: 30000 });
  }

  /**
   * Start a list of stations
   *
   * @param {Array} stationIDs
   * @return {bluebird}
   */
  startStations(stationIDs) {
    return this.send('post', '/stations/start', { ids: stationIDs });
  }

  /**
   * Stop a list of stations
   *
   * @param {Array} stationIDs
   * @return {bluebird}
   */
  stopStations(stationIDs) {
    return this.send('post', '/stations/stop', { ids: stationIDs });
  }

  /**
   * Change the app on a list of stations
   *
   * @param {Array} stationIDs
   * @param {String} appID
   * @return {bluebird}
   */
  changeApp(stationIDs, appID) {
    return this.send('post', '/stations/change_app', {
      ids: Array.from(stationIDs),
      app: appID,
    });
  }

  /**
   * Gets the server terminal output
   *
   * @return {bluebird<Array>}
   */
  getServerOutput() {
    return this.send('get', '/server/output')
      .then(data => data.lines);
  }

  /**
   * Gets the terminal output associated with a stations
   *
   * @param {String} stationID
   * @return {bluebird<Array>}
   */
  getStationOutput(stationID) {
    return this.send('get', `/station/${stationID}/output`)
      .then(data => data.lines);
  }

  /**
   * Gets the latest notifications
   *
   * @return {bluebird<Array>}
   */
  getNotifications() {
    return this.send('get', '/notifications')
      .then(data => data.notifications);
  }

  /**
   * Gets the list of application definitions
   *
   * @return {bluebird<Array>}
   */
  getApplications() {
    return this.send('get', '/applications')
      .then(data => data.applications);
  }

  /**
   * Gets the list of station profiles
   *
   * @return {bluebird<Array>}
   */
  getStationProfiles() {
    return this.send('get', '/station_profiles')
      .then(data => data.stationProfiles);
  }

  /**
   * Gets the list of presets
   *
   * @return {bluebird<Array>}
   */
  getPresets() {
    return this.send('get', '/presets')
      .then(data => data.presets);
  }

  /**
   * Create a preset
   *
   * @param {Object} preset Preset data
   * @return {bluebird}
   */
  createPreset(preset) {
    return this.send('post', '/preset', preset);
  }

  /**
   * Activates a preset
   *
   * @param {String} presetID
   * @return {bluebird}
   */
  activatePreset(presetID) {
    return this.send('post', `/preset/${presetID}/activate`);
  }

  /**
   * Deletes a preset
   *
   * @param {String} presetID
   * @return {bluebird}
   */
  deletePreset(presetID) {
    return this.send('delete', `/preset/${presetID}`);
  }

  /**
   * Updates a preset
   *
   * @param {Object} preset
   * @return {bluebird}
   */
  updatePreset(preset) {
    return this.send('put', `/preset/${preset.id}`, preset);
  }

  /**
   * Gets the test backend flags
   *
   * @return {bluebird}
   */
  getTestFlags() {
    return this.send('get', '/test-backend/flags');
  }

  /**
   * Sets the test backend flags
   *
   * @param {object} flags
   * @return {bluebird}
   */
  setTestFlags(flags) {
    return this.send('post', '/test-backend/flags', flags);
  }

  /**
   * Makes stations unrechable in the test backend
   *
   * @param {array} stationIDs
   * @return {bluebird}
   */
  testMakeStationsUnreachable(stationIDs) {
    return this.send('post', '/test-backend/stations/unreachable', { ids: stationIDs });
  }

  /**
   * Makes stations reachable in the test backend
   *
   * @param {array} stationIDs
   * @return {bluebird}
   */
  testMakeStationsReachable(stationIDs) {
    return this.send('post', '/test-backend/stations/reachable', { ids: stationIDs });
  }

  /**
   * Stops stations unexpectedly in the test backend
   *
   * @param {array} stationIDs
   * @return {bluebird}
   */
  testStopStationsUnexpectedly(stationIDs) {
    return this.send('post', '/test-backend/stations/stop-unexpectedly', { ids: stationIDs });
  }

  /**
   * Make an API call
   *
   * Returns a Bluebird Promise
   *
   * @param method
   *  The HTTP method to use (get, post, put, delete)
   * @param entryPoint
   *  The API entrypoint (without the API root)
   * @param data
   *  Optional data to send
   * @param options
   *  Extra options for the call
   * @return {bluebird}
   */
  send(method, entryPoint, data = null, options = {}) {
    return new Promise((resolve, reject) => {
      const defaultOptions = {
        url: `${this.apiRoot}${entryPoint}`,
        method,
        contentType: 'application/json',
        cache: false,
        success: response => resolve(response),
        error: (xhr, status, err) => {
          reject(new Error(`${status}: ${err}`));
        },
      };
      const queryOptions = Object.assign({}, defaultOptions, options);
      if (data !== null) {
        if (method === 'get') {
          queryOptions.data = data;
        } else {
          queryOptions.data = JSON.stringify(data);
          queryOptions.dataType = 'json';
        }
      }
      $.ajax(queryOptions);
    });
  }
}
