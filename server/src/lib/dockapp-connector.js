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
   * @param {TerminalOutputBuffer} output
   * @returns {Promise}
   * @resolve {Array} - List of stations
   * @reject {Error}
   */
  getStationConfig(output) {
    this.logger.verbose('DockApp: Getting station config');
    return new Promise((resolve, reject) => {
      this.execute(DockAppConnector.SCRIPT_LIST_STATIONS, output)
        .then((answer) => {
          this.logger.debug(`DockApp: Station config read:
${answer}`);
          const stationCfg = JSON.parse(answer);
          if (!stationCfg instanceof Array) {
            throw new Error(`Dockapp returned an invalid station config: ${answer}`);
          }
          if (stationCfg.length === 0) {
            throw new Error('Dockapp returned an empty station config.');
          }
          resolve(stationCfg);
        })
        .catch((err) => {
          this.logger.error(`DockApp: Error getting station config '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Start a station
   * @param {string} stationID - ID of the station
   * @param {stream} output - Command output should be written here
   * @returns Promise
   */
  startStation(stationID, output) {
    this.logger.verbose(`DockApp: Starting station ${stationID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${DockAppConnector.SCRIPT_START_STATION} ${stationID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(`DockApp: Error starting station ${stationID}, '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Stop a station
   * @param {string} stationID - ID of the station
   * @param {stream} output - Command output should be written here
   * @returns Promise
   */
  stopStation(stationID, output) {
    this.logger.verbose(`DockApp: Stopping station ${stationID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${DockAppConnector.SCRIPT_STOP_STATION} ${stationID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(`DockApp: Error stopping station ${stationID}, '${err.message}'`);
          reject(err);
        });
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
    this.logger.verbose(`DockApp: Changing app of station ${stationID} to ${appID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${DockAppConnector.SCRIPT_CHANGE_APP} ${stationID} ${appID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(
            `DockApp: Error changing station ${stationID} to app ${appID}, '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Executes a child process
   * @private
   *
   * @param {string} command - Command to execute
   * @param {stream} output - Command output should be written here
   * @param {object} options - Options to pass child_process.exec
   * @returns {Promise}
   * @resolve {String} - stdout output
   * @reject {Error}
   */
  execute(command, output, options) {
    return new Promise((resolve, reject) => {
      let stdoutBuf = '';
      let alloutBuf = '';
      this.logger.verbose(`Executing '${command}'`);

      const execOptions = Object.assign({}, options); // clone

      if (!execOptions.hasOwnProperty('env')) {
        execOptions.env = {};
      }
      if (!execOptions.env.hasOwnProperty('DOCKAPP_PATH')) {
        execOptions.env.DOCKAPP_PATH = this.nconf.get('dockapp_path');
      }

      const process = exec(command, execOptions);
      process.stdout.on('data', (data) => {
        stdoutBuf += data;
        alloutBuf += data;
        output.write(data);
      });
      process.stderr.on('data', (data) => {
        alloutBuf += data;
        output.write(data);
      });
      process.on('close', (code, signal) => {
        if (code === 0) {
          this.logger.verbose(`Execution of ${command} finished with code 0 (success).`);
          resolve(stdoutBuf);
        } else {
          let term = `rc=${code}`;
          if (signal !== null) {
            term = `${term}, ${signal}`;
          }
          this.logger.error(`Execution of ${command} finished with ${term}.`);
          this.logger.verbose('Output:');
          this.logger.verbose(alloutBuf);
          reject(new Error(`Command '${command}' exited with ${term}. ${alloutBuf}`));
        }
      });
    });
  }
}

DockAppConnector.SCRIPT_LIST_STATIONS = './scripts/list_stations.sh';
DockAppConnector.SCRIPT_START_STATION = './scripts/start_station.sh';
DockAppConnector.SCRIPT_STOP_STATION = './scripts/stop_station.sh';
DockAppConnector.SCRIPT_CHANGE_APP = './scripts/appchange_station.sh';
