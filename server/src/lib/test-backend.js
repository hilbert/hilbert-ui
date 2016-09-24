import Nagios from './nagios';
import TestHilbertCLIConnector from './test-hilbert-cli-connector';
import TestMKLivestatusConnector from './test-mk-livestatus-connector';

const testStations = require('../../tests/models/test_stations.json');

export default class TestBackend {

  constructor(nconf, logger) {
    this.nconf = nconf;
    this.logger = logger;

    this.hilbertCLIConnector = new TestHilbertCLIConnector(this, nconf, logger);
    this.mkLivestatusConnector = new TestMKLivestatusConnector(this, nconf, logger);

    this.state = new Map();
    this.station_cfg = new Map();

    for (const station of testStations) {
      this.state.set(station.id, {
        id: station.id,
        state: Nagios.HostState.DOWN,
        state_type: Nagios.StateType.HARD,
        app_state: Nagios.ServiceState.UNKNOWN,
        app_state_type: Nagios.StateType.HARD,
        app_id: '',
      });

      this.station_cfg.set(station.id, {
        id: station.id,
        name: station.name,
        type: station.type,
        default_app: station.default_app,
        possible_apps: station.possible_apps,
      });
    }
  }

  /**
   * Returns a HilbertCLIConnector stub for testing
   * @returns {TestHilbertCLIConnector}
   */
  getHilbertCLIConnector() {
    return this.hilbertCLIConnector;
  }

  /**
   * Returns a MKLivestatusConnector stub for testing
   * @returns {TestMKLivestatusConnector}
   */
  getMKLivestatusConnector() {
    return this.mkLivestatusConnector;
  }

  getStationState() {
    return this.state.values();
  }

  /**
   * Reads the station config
   * @returns {Promise}
   * @resolve {Array} - List of stations
   * @reject {Error}
   */
  getStationConfig(output) {
    return new Promise((resolve) => {
      output.write(`Simulating reading station configuration. Waiting a random delay...`);
      this.randomDelay(1000, 3000).then(() => {
        output.write('Wait finished.');
        resolve(this.station_cfg.values());
      });
    });
  }

  /**
   * Starts a station
   *
   * @param stationID
   * @param {stream} output - Command output should be written here
   * @returns {Promise}
   */
  startStation(stationID, output) {
    return new Promise((resolve) => {
      output.write(`Simulating starting station ${stationID}. Waiting a random delay...`);
      this.randomDelay(3000, 8000).then(() => {
        output.write('Wait finished.');
        const stationState = this.state.get(stationID);
        const stationCfg = this.station_cfg.get(stationID);
        if (stationState && (stationState.state === Nagios.HostState.DOWN)) {
          stationState.state = Nagios.HostState.UP;
          stationState.app_state = Nagios.ServiceState.OK;
          stationState.app_state_type = Nagios.StateType.HARD;
          stationState.app_id = stationCfg.default_app;
          output.write(`Station state set to UP with app ${stationState.app_id}.`);
        }
      }).then(resolve);
    });
  }

  /**
   * Stops a station
   *
   * @param stationID
   * @param {stream} output - Command output should be written here
   * @returns {Promise}
   */
  stopStation(stationID, output) {
    return new Promise((resolve) => {
      output.write(`Simulating stopping station ${stationID}. Waiting a random delay...`);
      this.randomDelay(2000, 6000).then(() => {
        output.write('Wait finished.');
        const stationState = this.state.get(stationID);
        if (stationState && (stationState.state === Nagios.HostState.UP)) {
          stationState.state = Nagios.HostState.DOWN;
          stationState.app_state = Nagios.ServiceState.UNKNOWN;
          stationState.app_state_type = Nagios.StateType.HARD;
          stationState.app_id = '';
          output.write('Station state set to DOWN.');
        }
      }).then(resolve);
    });
  }

  /**
   * Change the foreground application running in a station
   *
   * @param {string} stationID - ID of the station
   * @param {string} appID - ID of the app to set
   * @param {stream} output - Command output should be written here
   * @returns {Promise}
   */
  changeApp(stationID, appID, output) {
    return new Promise((resolve, reject) => {
      output.write(
        `Simulating changing app for station ${stationID} to ${appID}. Waiting a random delay...`);
      this.randomDelay(1000, 5000).then(() => {
        output.write('Wait finished.');
        const stationState = this.state.get(stationID);
        const stationCfg = this.station_cfg.get(stationID);

        if (stationCfg.possible_apps.indexOf(appID) >= 0) {
          stationState.app_id = appID;
          output.write('App changed.');
        }
      }).then(() => {
        if (appID === 'Sky explorer / Aladin lite') {
          output.write('Simulating failure when changing app to Sky explorer');
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
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * (max - min)) + min;
      setTimeout(() => { resolve(); }, delay);
    });
  }
}
