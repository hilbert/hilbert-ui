const testStations = require('../../tests/models/test_stations.json');

/**
 * Testing stub to replace DockAppConnector
 *
 * Simulates the dockapp commands with a random delay
 */
export default class TestingConnector {

  constructor(nconf, logger) {
    this.nconf = nconf;
    this.logger = logger;
  }

  /**
   * Reads the station config
   * @returns {Promise}
   * @resolve {Array} - List of stations
   * @reject {Error}
   */
  getStationConfig() {
    return new Promise((resolve) => {
      this.randomDelay(1000, 3000).then(() => { resolve(testStations); });
    });
  }

  startStation(stationID) {
    return new Promise((resolve, reject) => {
      this.randomDelay(3000, 8000).then(resolve);
    });
  }

  stopStation(stationID) {
    return new Promise((resolve, reject) => {
      this.randomDelay(2000, 6000).then(resolve);
    });
  }

  changeApp(stationID, appID) {
    return new Promise((resolve, reject) => {
      this.randomDelay(1000, 5000).then(() => {
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
  randomDelay(min, max) {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * (max - min)) + min;
      setTimeout(() => { resolve(); }, delay);
    });
  }
}
