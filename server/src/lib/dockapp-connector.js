const exec = require('child_process').exec;

/**
 * Interface with DockApp via scripts
 * 
 * This class doesn't check the state of the stations before dispatching
 * the commands.
 */
export default class DockAppConnector {

  constructor(nconf, logger) {
    this.nconf = nconf;
    this.logger = logger;
  }

  getStations(done, error) {
    const command = `scripts/list_stations.sh ${this.config.get('dockapp_path')}`;
    exec(command, {}, (err, stdout) => {
      if (err) {
        error(err);
      } else {
        const response = JSON.parse(stdout);
        for (let i = 0; i !== response.stations.length; i++) {
          response.stations[i].state = 'on';
          response.stations[i].status = '';
        }
        done(response.stations);
      }
    });
  }

  /**
   * Start a station
   * @param {string} stationID - ID of the station
   * @returns Promise
   */
  startStation(stationID) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Stop a station
   * @param {string} stationID - ID of the station
   * @returns Promise
   */
  stopStation(stationID) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Change the foreground application running in a station
   * @param {string} stationID - ID of the station
   * @param {string} appID - ID of the app to set
   * @returns Promise
   */
  changeApp(stationID, appID) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
