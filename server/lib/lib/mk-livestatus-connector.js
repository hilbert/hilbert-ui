const Promise = require('bluebird');
const exec = require('child_process').exec;
const Nagios = require('./nagios');
const MKLivestatusQuery = require('./mk-livestatus-query');

/**
 * Connects to the MK Livestatus service and
 * retrieves status data
 *
 * http://mathias-kettner.com/checkmk_livestatus.html
 */
class MKLivestatusConnector {

  constructor(nconf, logger) {
    this.nconf = nconf;
    this.logger = logger;
    this.minTime = MKLivestatusConnector.timestamp();
    this.stationMinTime = {};
  }

  /**
   * Mark the current app_state / app_id reported by CheckMK stale until the next check.
   *
   * The connector will store a timestamp associated with the station and will only use the reported
   * app_state and app_id if CheckMK checked them at a latter time.
   * @param stationID
   */
  invalidateAppState(stationID) {
    this.stationMinTime[stationID] = MKLivestatusConnector.timestamp();
  }

  /**
   * Returns the state of the stations
   * Returns an array of objects with shape
   * {id: 'station name', state: 0, state_type: 1,
   * app_state: 0, app_state_type: 1, app_id: 'fg app name'}
   *
   * @returns {Promise}
   * @resolve {Array}
   */
  getState() {
    this.logger.debug('MKLivestatus: Querying');
    const state = new Map();
    return this.getStationState()
      .then((stations) => {
        this.logger.debug('MKLivestatus: host state response received. Updating stations.');
        for (const station of stations) {
          if ('id' in station) {
            state.set(station.id, station);
          }
        }
        return this.getForegroundApps();
      })
      .then((stations) => {
        this.logger.debug('MKLivestatus: app state response received. Updating stations.');
        for (const station of stations) {
          if ('id' in station && state.has(station.id)) {
            const stationState = state.get(station.id);
            if (stationState.state === Nagios.HostState.DOWN) {
              // If the station is down let's ignore the app state, which is definitely stale.
              stationState.app_state = Nagios.ServiceState.UNKNOWN;
              stationState.app_state_type = Nagios.StateType.HARD;
              stationState.app_id = '';
              stationState.app_start_time = '';
            } else {
              stationState.app_state = station.app_state;
              stationState.app_state_type = station.app_state_type;
              stationState.app_id = station.app_id;
              stationState.app_start_time = station.app_start_time;
            }
          }
        }
        return this.getUptime();
      })
      .then((stations) => {
        for (const station of stations) {
          if ('id' in station && state.has(station.id)) {
            const stationState = state.get(station.id);
            stationState.start_time = '';
            if (station.start_time) {
              // OK - up since Wed Jul  3 08:31:36 2019 (0d 08:31:45)
              const matches = station.start_time.match(/^OK - up since ([^(]*) \(.*\)$/);
              if (matches.length > 1) {
                const startTime = matches[1];
                stationState.start_time = startTime;
              }
            }
          }
        }
        return state.values();
      })
      .catch((err) => {
        this.logger.error(`MKLivestatus: Error querying '${err.message}'`);
        throw err;
      });
  }

  /**
   * Queries the state of the stations
   * Returns an array of objects with shape
   * {id: 'station name ', state: 0, state_type: 1}
   * @private
   *
   * @returns {Promise}
   * @resolve {Array}
   * @reject {Error}
   */
  getStationState() {
    this.logger.debug('MKLivestatus: Querying host state');
    return this.query()
      .get('hosts')
      .columns(['name', 'state', 'state_type'])
      .asColumns(['id', 'state', 'state_type'])
      .execute();
  }

  /**
   * Queries the foreground apps running in the stations
   * Returns an array of objects with shape
   * {id: 'station name', app_state: 0, app_state_type: 1, app_id: 'app name', app_start_time: 'Timestamp'}
   * @private
   *
   * @returns {Promise}
   */
  getForegroundApps() {
    this.logger.debug('MKLivestatus: Querying app state');
    return this.query()
      .get('services')
      .columns(['host_name', 'last_check', 'state', 'state_type', 'plugin_output'])
      .asColumns(['id', 'last_check', 'app_state', 'app_state_type', 'app_id'])
      .filter('description = dockapp_top1')
      .execute()
      .then((stations) => {
        for (const station of stations) {
          // Check the timestamp of the last check to see if this data is current
          if (station.last_check <= this.minTime ||
              (this.stationMinTime[station.id] !== undefined &&
               station.last_check <= this.stationMinTime[station.id])
          ) {
            // The timestamp of the last check is previous to the global minTime
            // (creation of the MKLivestatusConnector) or the stations' minTime
            // (time of start) so the status is stale and has to be ignored.
            station.app_id = '';
            station.app_state = Nagios.ServiceState.UNKNOWN;
            station.app_state_type = Nagios.StateType.SOFT;
            station.app_start_time = '';
          } else {
            // Current data
            const matches = station.app_id.match(/^[^:]+:\s*(.*)@\[(.*)\]$/);
            if (station.app_state === Nagios.ServiceState.OK
              && matches !== null && ('length' in matches) && matches.length > 2) {
              const appID = matches[1];
              const appData = JSON.parse(matches[2]);
              station.app_id = appID;
              if (appData && appData.StartedAt) {
                station.app_start_time = appData.StartedAt;
              }
            } else if (station.app_state === Nagios.ServiceState.CRITICAL
              && station.app_id === 'CRIT - CRITICAL - no running TOP app!') {
              // Not really a critical error
              // There's just no app running. It happens. No need to call the Avengers.
              station.app_id = '';
              station.app_state = Nagios.ServiceState.OK;
              station.app_state_type = Nagios.StateType.SOFT;
              station.app_start_time = '';
            }
          }
        }
        return stations;
      });
  }

  getUptime() {
    this.logger.debug('MKLivestatus: Querying uptime');
    return this.query()
      .get('services')
      .columns(['host_name', 'plugin_output'])
      .asColumns(['id', 'start_time'])
      .filter('description = Uptime')
      .execute();
  }

  /**
   * Creates a query
   * @private
   *
   * @returns {MKLivestatusQuery}
   */
  query() {
    return new MKLivestatusQuery(this);
  }

  /**
   * Sends a query command to MKLivestatus
   *
   * @param {String} queryString
   * @returns {bluebird}
   * @resolve {Array} Response rows
   * @reject {Error}
   */
  sendCommand(queryString) {
    return new Promise((resolve) => {
      const MKLivestatusCommand = this.nconf.get('mkls_cmd');
      this.logger.debug(`MKLivestatus: executing query through '${MKLivestatusCommand}'`);
      this.logger.debug(`sending query '${queryString}'`);
      const process = exec(MKLivestatusCommand);

      let stdoutBuf = '';

      process.stdout.on('data', (data) => {
        stdoutBuf += data;
      }).on('end', () => {
        this.logger.debug(`MKLivestatus stdout: '${stdoutBuf}'`);
        resolve(stdoutBuf);
      });

      process.stderr.on('data', (data) => {
        this.logger.error(`MKLivestatus stderr: ${data}`);
      });

      process.stdin.end(`${queryString}\n\n`);
    });
  }

  static timestamp() {
    return Math.floor(Date.now() / 1000);
  }
}

// When executed directly it performs a query
if (require.main === module) {
  const mkLivestatusConnector = new MKLivestatusConnector(
    {
      get: () => 'nc es-ex.hq.eso.org 6557',
    },
    {
      debug: () => {},
      error: () => {},
    }
  );
  mkLivestatusConnector.minTime = 0;
  console.log('Querying');
  mkLivestatusConnector.getState().then((state) => {
    console.log(state);
  });
}

module.exports = MKLivestatusConnector;
