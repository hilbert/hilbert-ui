/**
 * Testing stub for MKLivestatusConnector
 */
export default class TestMKLivestatusConnector {

  constructor(testBackend, nconf, logger) {
    this.nconf = nconf;
    this.logger = logger;

    this.testBackend = testBackend;
  }

  /**
   * Returns the state of the stations
   *
   * @returns {Promise}
   * @resolve {Array}
   */
  getState() {
    return new Promise((resolve) => {
      resolve(this.testBackend.getStationState());
    });
  }
}
