/**
 * Testing stub for DockAppConnector
 *
 * Simulates the dockapp commands with a random delay
 */
export default class TestDockAppConnector {

  /**
   * Returns the state of the stations
   * Returns an array of objects with shape
   * {name: 'station name ', state: 0, state_type: 1,
   * app_state: 0, app_state_type: 1, app_name: 'fg app name'}
   *
   * @returns {Promise}
   * @resolve {Array}
   */
  constructor(testBackend, nconf, logger) {
    this.nconf = nconf;
    this.logger = logger;
    this.testBackend = testBackend;
  }

  /**
   * Reads the station config
   * @returns {Promise}
   * @resolve {Array} - List of stations
   * @reject {Error}
   */
  getStationConfig() {
    return this.testBackend.getStationConfig();
  }

  /**
   * Starts a station
   *
   * @param stationID
   * @returns {Promise}
   */
  startStation(stationID) {
    return this.testBackend.startStation(stationID);
  }

  /**
   * Stops a station
   *
   * @param stationID
   * @returns {Promise}
   */
  stopStation(stationID) {
    return this.testBackend.stopStation(stationID);
  }

  /**
   * Change the foreground application running in a station
   *
   * @param {string} stationID - ID of the station
   * @param {string} appID - ID of the app to set
   * @returns {Promise}
   */
  changeApp(stationID, appID) {
    return this.testBackend.changeApp(stationID, appID);
  }

}
