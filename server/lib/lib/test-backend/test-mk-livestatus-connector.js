const MKLivestatusConnector = require('../mk-livestatus-connector');

/**
 * Testing stub for MKLivestatusConnector
 */
class TestMKLivestatusConnector {

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

  invalidateAppState(stationID) {
    // Nothing to do in this test connector
  }
}

module.exports = TestMKLivestatusConnector;
