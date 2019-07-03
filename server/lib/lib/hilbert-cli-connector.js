const Promise = require('bluebird');
const exec = require('child_process').exec;

/**
 * Interface with hilbert-cli
 *
 * This class doesn't check the state of the stations before dispatching
 * the commands.
 */
class HilbertCLIConnector {

  constructor(nconf, logger) {
    this.nconf = nconf;
    this.logger = logger;
  }

  /**
   * Reads the Hilbert Cfg
   * @param {stream.Writable} output
   * @returns {bluebird<Object>} Hilbert cfg object
   */
  getHilbertCfg(output) {
    this.logger.verbose('hilbert-cli: Getting station config');
    return new Promise((resolve, reject) => {
      this.execute(`${this.nconf.get('hilbert_cli')} ${HilbertCLIConnector.COMMAND_DUMP_CFG}`, output)
        .then((answer) => {
          this.logger.debug(`hilbert-cli: Station config read:
${answer}`);
          const stationCfg = JSON.parse(answer);
          if (!(stationCfg instanceof Object)) {
            throw new Error(`hilbert-cli returned an invalid station config: ${answer}`);
          }
          if (stationCfg.length === 0) {
            throw new Error('hilbert-cli returned an empty station config.');
          }
          resolve(stationCfg);
        })
        .catch((err) => {
          this.logger.error(`hilbert-cli: Error getting station config '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Start a station
   * @param {string} stationID - ID of the station
   * @param {stream.Writable} output - Command output should be written here
   * @returns bluebird
   */
  startStation(stationID, output) {
    this.logger.verbose(`hilbert-cli: Starting station ${stationID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${this.nconf.get('hilbert_cli')} ${HilbertCLIConnector.COMMAND_START} ${stationID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(`hilbert-cli: Error starting station ${stationID}, '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Stop a station
   * @param {string} stationID - ID of the station
   * @param {stream.Writable} output - Command output should be written here
   * @returns bluebird
   */
  stopStation(stationID, output) {
    this.logger.verbose(`hilbert-cli: Stopping station ${stationID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${this.nconf.get('hilbert_cli')} ${HilbertCLIConnector.COMMAND_STOP} ${stationID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(`hilbert-cli: Error stopping station ${stationID}, '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Restart a station
   * @param {string} stationID - ID of the station
   * @param {stream.Writable} output - Command output should be written here
   * @returns bluebird
   */
  restartStation(stationID, output) {
    this.logger.verbose(`hilbert-cli: Restarting station ${stationID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${this.nconf.get('hilbert_cli')} ${HilbertCLIConnector.COMMAND_RESTART} ${stationID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(`hilbert-cli: Error restarting station ${stationID}, '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Restart a station app
   * @param {string} stationID - ID of the station
   * @param {stream.Writable} output - Command output should be written here
   * @returns bluebird
   */
  restartStationApp(stationID, output) {
    this.logger.verbose(`hilbert-cli: Restarting app of station ${stationID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${this.nconf.get('hilbert_cli')} ${HilbertCLIConnector.COMMAND_RESTARTAPP} ${stationID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(`hilbert-cli: Error restarting app of station ${stationID}, '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Change the foreground application running in a station
   * @param {string} stationID - ID of the station
   * @param {string} appID - ID of the app to set
   * @param {stream.Writable} output - Command output should be written here
   * @returns {bluebird}
   */
  changeApp(stationID, appID, output) {
    this.logger.verbose(`hilbert-cli: Changing app of station ${stationID} to ${appID}`);
    return new Promise((resolve, reject) => {
      this.execute(`${this.nconf.get('hilbert_cli')} ${HilbertCLIConnector.COMMAND_CHANGE_APP} ${stationID} ${appID}`, output)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(
            `hilbert-cli: Error changing station ${stationID} to app ${appID}, '${err.message}'`);
          reject(err);
        });
    });
  }

  /**
   * Executes a child process
   * @private
   *
   * @param {string} command - Command to execute
   * @param {stream.Writable} output - Command output should be written here
   * @param {object} options - Options to pass child_process.exec
   * @returns {bluebird}
   * @resolve {String} - stdout output
   * @reject {Error}
   */
  execute(command, output, options = {}) {
    return new Promise((resolve, reject) => {
      let stdoutBuf = '';
      let alloutBuf = '';
      this.logger.verbose(`Executing '${command}'`);

      const execOptions = Object.assign({}, options); // clone

      if (!('env' in execOptions)) {
        execOptions.env = Object.assign({}, process.env);
      } else {
        execOptions.env = Object.assign({}, process.env, execOptions.env);
      }
      if (!('HILBERT_CLI_PATH' in execOptions.env)) {
        execOptions.env.HILBERT_CLI_PATH = this.nconf.get('hilbert_cli');
      }
      if (!('HILBERT_SERVER_CONFIG_PATH' in execOptions.env)) {
        execOptions.env.HILBERT_SERVER_CONFIG_PATH = this.nconf.get('hilbert_cfg');
      }

      // This setting below is needed to avoid issues in mac
      // When running from the IDE my env had the invalid locale en_AR.UTF-8
      // (Argentine english???) and this caused a fallback to ascii for ruamel
      // reading the config file.
      execOptions.env.LC_CTYPE = 'UTF-8';
      execOptions.maxBuffer = 500 * 1024;

      const childProcess = exec(command, execOptions);
      childProcess.stdout.on('data', (data) => {
        stdoutBuf += data;
        alloutBuf += data;
        output.write(data);
      });
      childProcess.stderr.on('data', (data) => {
        alloutBuf += data;
        output.write(data);
      });
      childProcess.on('close', (code, signal) => {
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

HilbertCLIConnector.COMMAND_DUMP_CFG = 'cfg_query -f json';
HilbertCLIConnector.COMMAND_START = 'poweron';
HilbertCLIConnector.COMMAND_STOP = 'poweroff';
HilbertCLIConnector.COMMAND_RESTART = 'reboot';
HilbertCLIConnector.COMMAND_RESTARTAPP = 'app_restart';
HilbertCLIConnector.COMMAND_CHANGE_APP = 'app_change';

module.exports = HilbertCLIConnector;
