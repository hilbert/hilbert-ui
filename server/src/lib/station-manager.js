const Promise = require('bluebird');
const EventEmitter = require('events').EventEmitter;

import Station from './station';
import TerminalOutputBuffer from './terminal-output-buffer';

/**
 * Service Layer to the DockApp system
 * Dispatches requests asynchronously and keeps cached state
 */
export default class StationManager {

  /**
   * Create a Station Manager
   *
   * @param {Object} nconf - Instance of nconf configuration
   * @param {Object} logger - Instance of winston logger
   * @param {DockAppConnector} dockApp - DockApp connector
   * @param {MKLivestatusConnector} mkLivestatus - MKLivestatus connector
   */
  constructor(nconf, logger, dockApp, mkLivestatus) {
    this.nconf = nconf;
    this.logger = logger;

    this.dockApp = dockApp;
    this.mkLivestatus = mkLivestatus;

    this.events = new EventEmitter();
    this.logEntries = [];
    this.lastLogID = 1;

    this.globalDockAppOutputBuffer = new TerminalOutputBuffer();

    this.clearStations();
  }

  /**
   * Reads the station configuration and begins polling station status
   *
   * @return {Promise}
   */
  init() {
    return this.loadStationConfig().then(() => {
      const pollLoopBody = () => {
        const pollDelay = this.nconf.get('mkls_poll_delay');
        let consecutiveErrors = 0;
        const errorDigestSize = 50;
        this.pollMKLivestatus().then(() => {
          consecutiveErrors = 0;
          setTimeout(pollLoopBody, pollDelay);
        }).catch(() => {
          if (consecutiveErrors % errorDigestSize) {
            if (consecutiveErrors !== 0) {
              this.logger.error(`Repeated polling errors (${errorDigestSize} times)`);
            }
          }
          consecutiveErrors++;
          setTimeout(pollLoopBody, pollDelay);
        });
      };
      pollLoopBody();
    });
  }

  /**
   * Loads the station configuration.
   *
   * If the configuration was already loaded this method clears it
   * and reloads everything
   *
   * @returns {Promise}
   */
  loadStationConfig() {
    this.clearStations();
    this.signalUpdate();

    return this.dockApp.getStationConfig(this.globalDockAppOutputBuffer).then((stationsCFG) => {
      for (const stationCFG of stationsCFG) {
        this.addStation(new Station(stationCFG));
      }
      this.signalUpdate();
    });
  }

  /**
   * Adds a station to the manager
   * @param {Station} aStation
   */
  addStation(aStation) {
    this.stationList.push(aStation);
    this.stationIndex.set(aStation.id, aStation);
  }

  /**
   * Removes a station from the manager
   * @param {Station} aStation
   */
  removeStation(aStation) {
    const i = this.stationList.indexOf(aStation);
    if (i !== -1) {
      this.stationList.splice(i, 1);
    }

    this.stationIndex.delete(aStation.id);
  }

  /**
   * Removes all the stations
   */
  clearStations() {
    this.stationIndex = new Map();
    this.stationList = [];
  }

  /**
   * Get the ordered list of stations
   * @returns {Array}
   */
  getStations() {
    return this.stationList;
  }

  /**
   * Return a station identified by ID
   *
   * @param {string} id - Station ID
   * @returns {Station}
   */
  getStationByID(id) {
    return this.stationIndex.get(id);
  }

  /**
   * Start indicated stations
   *
   * @param {Iterable} stationIDs - IDs of stations to start
   * @return {Promise}
   */
  startStations(stationIDs) {
    const eligibleStations = [];
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station && station.state === Station.OFF) {
        station.state = Station.STARTING;
        station.status = 'Waiting to start...';
        eligibleStations.push(stationID);
      }
    }

    this.signalUpdate();

    return Promise.map(
      eligibleStations,
      (eligibleStation) => {
        this.logger.debug(`Station manager: Starting station ${eligibleStation}`);
        const station = this.getStationByID(eligibleStation);
        station.status = 'Starting...';
        this.signalUpdate();
        return this.dockApp.startStation(station.id, station.outputBuffer).then(() => {
          // station.state = Station.ON;
          // station.status = '';
          this.logger.debug(`Station manager: Station ${eligibleStation} started`);
          this.log('message', station, 'Station started');
        })
        .catch(() => {
          this.logger.debug(`Station manager: Station ${eligibleStation} failed to start`);
          station.state = Station.ERROR;
          station.status = 'Failure starting the station';
          this.log('error', station, 'Error starting station');
        })
        .then(() => {
          this.signalUpdate();
        });
      },
      { concurrency: this.nconf.get('scriptConcurrency') }
    );
  }

  /**
   * Stop indicated stations
   *
   * @param {Iterable} stationIDs - IDs of stations to stop
   * @return {Promise}
   */
  stopStations(stationIDs) {
    const eligibleStations = [];
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station && station.state === Station.ON) {
        station.state = Station.STOPPING;
        station.status = 'Waiting to stop...';
        eligibleStations.push(stationID);
      }
    }

    this.signalUpdate();

    return Promise.map(
      eligibleStations,
      (eligibleStation) => {
        this.logger.debug(`Station manager: Stopping station ${eligibleStation}`);
        const station = this.getStationByID(eligibleStation);
        station.status = 'Stopping...';
        this.signalUpdate();
        return this.dockApp.stopStation(station.id, station.outputBuffer).then(() => {
          // station.state = Station.OFF;
          // station.status = '';
          this.logger.debug(`Station manager: Station ${eligibleStation} stopped`);
          this.log('message', station, 'Station stopped');
        })
          .catch(() => {
            this.logger.debug(`Station manager: Station ${eligibleStation} failed to stop`);
            station.state = Station.ERROR;
            station.status = 'Failure stopping the station';
            this.log('error', station, 'Error stopping station');
          })
          .then(() => {
            this.signalUpdate();
          });
      },
      { concurrency: this.nconf.get('scriptConcurrency') }
    );
  }

  /**
   * Change the application running in indicated stations
   *
   * @param {Iterable} stationIDs - IDs of stations in which to change the appID
   * @param {string} appID - Name of the appID to run
   */
  changeApp(stationIDs, appID) {
    const eligibleStations = [];
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station && station.state === Station.ON && appID !== station.app) {
        station.state = Station.SWITCHING_APP;
        station.status = 'Waiting to change app...';
        station.switching_app = appID;
        eligibleStations.push(stationID);
      }
    }

    this.signalUpdate();

    return Promise.map(
      eligibleStations,
      (eligibleStation) => {
        this.logger.debug(
          `Station manager: Changing app of station ${eligibleStation} to ${appID}`);
        const station = this.getStationByID(eligibleStation);
        station.status = `Switching to ${appID}...`;
        this.signalUpdate();
        return this.dockApp.changeApp(eligibleStation, appID, station.outputBuffer).then(() => {
          this.logger.debug(
            `Station manager: Changed app of station ${eligibleStation} to ${appID}`);
          this.log('message', station, `Launched app ${appID}`);
        })
        .catch(() => {
          this.logger.debug(
            `Station manager: Failed changing app of station ${eligibleStation} to ${appID}`);
          station.app = appID;
          station.state = Station.ERROR;
          station.status = 'Failure launching app';
          this.log('error', station, `Failed to launch app ${appID}`);
        })
        .then(() => {
          this.signalUpdate();
        });
      },
      { concurrency: this.nconf.get('scriptConcurrency') }
    );
  }

  /**
   * Return the station activity log
   *
   * Each log entry is an object with the following structure:
   * - id {string} : Unique id of the entry
   * - time {string} : Timestamp in ISO format
   * - type {string} : info | warning | error
   * - message {string} : Event description
   *
   * @returns {Array}
   */
  getLog() {
    return this.logEntries;
  }


  /**
   * Logs an event
   *
   * @param {string} type - Event type: info | warning | error
   * @param {Station|null} station - station associated with the event logged
   * @param {string} message - Message to log
   */
  log(type, station, message) {
    const newLogEntry = {
      id: this.lastLogID,
      time: new Date().toISOString(),
      type,
      message,
    };

    if (station !== null) {
      newLogEntry.station_id = station.id;
      newLogEntry.station_name = station.name;
    }

    this.lastLogID++;
    this.logEntries.push(newLogEntry);

    const maxEntries = this.nconf.get('max_log_length');
    if (this.logEntries.length > maxEntries) {
      this.logEntries = this.logEntries.slice(this.logEntries.length - maxEntries);
    }
  }

  /**
   * Polls MKLivestatus and updates the state of stations
   * @returns {Promise}
   */
  pollMKLivestatus() {
    return this.mkLivestatus.getState().then((allStationsStatus) => {
      let changes = false;

      for (const stationStatus of allStationsStatus) {
        const station = this.getStationByID(stationStatus.id);
        if (station) {
          if (station.updateFromMKLivestatus(stationStatus)) {
            changes = true;
          }
        }
      }

      if (changes) {
        this.signalUpdate();
      }
    });
  }
  /**
   * Signal listeners that station data was modified
   * @private
   */
  signalUpdate() {
    this.events.emit('stationUpdate');
  }
}
