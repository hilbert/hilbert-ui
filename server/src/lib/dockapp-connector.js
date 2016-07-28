const Promise = require('bluebird');
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

  /**
   * Reads the station config
   * @returns {Promise}
   * @resolve {Array} - List of stations
   * @reject {Error}
   */
  getStationConfig() {
    return new Promise((resolve, reject) => {
      this.execute(`${DockAppConnector.SCRIPT_LIST_STATIONS} ${this.nconf.get('dockapp_path')}`)
        .then((answer) => {
          resolve(JSON.parse(answer));
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Start a station
   * @param {string} stationID - ID of the station
   * @param {stream} output - Command output should be written here
   * @returns Promise
   */
  startStation(stationID, output) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Stop a station
   * @param {string} stationID - ID of the station
   * @param {stream} output - Command output should be written here
   * @returns Promise
   */
  stopStation(stationID, output) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Change the foreground application running in a station
   * @param {string} stationID - ID of the station
   * @param {string} appID - ID of the app to set
   * @param {stream} output - Command output should be written here
   * @returns {Promise}
   */
  changeApp(stationID, appID, output) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Executes a child process
   * @private
   *
   * @param {string} command - Command to execute
   * @param {stream} output - Command output should be written here
   * @returns {Promise}
   * @resolve {String} - stdout output
   * @reject {Error}
   */
  execute(command, output) {
    return new Promise((resolve, reject) => {
      let stdoutBuf = '';
      let stderrBuf = '';
      const process = exec(command);
      process.stdout.on('data', (data) => {
        stdoutBuf += data;
        output.write(data);
      });
      process.stderr.on('data', (data) => {
        stderrBuf += data;
        output.write(data);
      });
      process.on('close', (code, signal) => {
        if (code === 0) {
          resolve(stdoutBuf);
        } else {
          let term = `rc=${code}`;
          let allOutput = '';
          if (signal !== null) {
            term = `${term}, ${signal}`;
          }
          if (stderrBuf.length) {
            allOutput = `\nstderr: ${stderrBuf}`;
          }
          reject(new Error(`Command '${command}' exited with ${term}. ${allOutput}`));
        }
      });
    });
  }
}

DockAppConnector.SCRIPT_LIST_STATIONS = 'scripts/list_stations.sh';
