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
  getStationConfig(output) {
    this.logger.debug('DockApp: Getting station config');
    return new Promise((resolve, reject) => {
      const cmd = `${DockAppConnector.SCRIPT_LIST_STATIONS} ${this.nconf.get('dockapp_path')}`;
      this.execute(cmd, output)
        .then((answer) => {
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
    this.logger.debug(`DockApp: Starting station ${stationID}`);
    return new Promise((resolve, reject) => {
      const cmd =
        `${this.nconf.get('dockapp_path')}/${DockAppConnector.DOCKAPP_SCRIPT_START_STATION}`;
      this.execute(`${cmd} ${stationID}`, output)
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
    this.logger.debug(`DockApp: Stopping station ${stationID}`);
    return new Promise((resolve, reject) => {
      const cmd =
        `${this.nconf.get('dockapp_path')}/${DockAppConnector.DOCKAPP_SCRIPT_STOP_STATION}`;
      this.execute(`${cmd} ${stationID}`, output)
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
    this.logger.debug(`DockApp: Changing app of station ${stationID} to ${appID}`);
    return new Promise((resolve, reject) => {
      const cmd =
        `${this.nconf.get('dockapp_path')}/${DockAppConnector.DOCKAPP_SCRIPT_CHANGE_APP}`;
      this.execute(`${cmd} ${stationID} ${appID}`, output)
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
   * @returns {Promise}
   * @resolve {String} - stdout output
   * @reject {Error}
   */
  execute(command, output) {
    return new Promise((resolve, reject) => {
      let stdoutBuf = '';
      let alloutBuf = '';
      this.logger.debug(`Executing '${command}'`);
      const process = exec(command);
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
          this.logger.debug(`Execution of ${command} finished with code 0 (success).`);
          resolve(stdoutBuf);
        } else {
          let term = `rc=${code}`;
          if (signal !== null) {
            term = `${term}, ${signal}`;
          }
          this.logger.error(`Execution of ${command} finished with ${term}.`);
          this.logger.debug('Output:');
          this.logger.debug(alloutBuf);
          reject(new Error(`Command '${command}' exited with ${term}. ${alloutBuf}`));
        }
      });
    });
  }
}

DockAppConnector.SCRIPT_LIST_STATIONS = './scripts/list_stations.sh';
DockAppConnector.DOCKAPP_SCRIPT_START_STATION = 'mng/start.sh';
DockAppConnector.DOCKAPP_SCRIPT_STOP_STATION = 'mng/shutdown.sh';
DockAppConnector.DOCKAPP_SCRIPT_CHANGE_APP = 'mng/topswitch.sh';
