const iconmap = require('../../iconmap.json');
const EventEmitter = require('events').EventEmitter;

import Station from './station';

/**
 * Service Layer to the DockApp system
 * Dispatches requests asynchronously and keeps cached state
 */
export default class StationManager {

  /**
   * Create a Station Manager
   *
   * @param {Object} config - Instance of nconf configuration
   * @param {Object} logger - Instance of winston logger
   * @param {DockAppConnector} connector - DockApp connector
   */
  constructor(config, logger, connector) {
    this.config = config;
    this.logger = logger;
    this.connector = connector;
    this.events = new EventEmitter();
    this.logEntries = [];
    this.lastLogID = 1;

    this.loadStationConfig();
  }

  /**
   * Loads the station configuration.
   *
   * If the configuration was already loaded this method clears it
   * and reloads everything
   */
  loadStationConfig() {
    this.clearStations();
    this.signalUpdate();

    this.connector.getStationConfig().then((stationsCFG) => {
      for (const stationCFG of stationsCFG) {
        const newStation = new Station(stationCFG);
        newStation.icon = StationManager.getIconURL(newStation.app);
        this.addStation(newStation);
      }
      this.signalUpdate();
    }).catch((error) => {
      this.logger.error(error);
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
   * @todo Change interface to return a promise
   * @param {Iterable} stationIDs - IDs of stations to start
   */
  startStations(stationIDs) {
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station) {
        if (station.state === Station.OFF) {
          station.state = Station.BUSY;
          station.status = 'Starting...';
          this.connector.startStation(stationID).then(() => {
            station.state = Station.ON;
            station.status = '';
            this.log('message', station, 'Station started');
          })
          .catch(() => {
            station.state = Station.ERROR;
            station.status = 'Failure starting the station';
            this.log('error', station, 'Error starting station');
          })
          .then(() => {
            this.signalUpdate();
          });
        }
      }
    }
    this.signalUpdate();
  }

  /**
   * Stop indicated stations
   *
   * @todo Change interface to return a promise
   * @param {Iterable} stationIDs - IDs of stations to stop
   */
  stopStations(stationIDs) {
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station) {
        if (station.state === Station.ON) {
          station.state = Station.BUSY;
          station.status = 'Stopping...';

          this.connector.stopStation(stationID).then(() => {
            station.state = Station.OFF;
            station.status = '';
            this.log('message', station, 'Station stopped');
          })
          .catch(() => {
            station.state = Station.ERROR;
            station.status = 'Failure stopping the station';
            this.log('error', station, 'Error stopping station');
          })
          .then(() => {
            this.signalUpdate();
          });
        }
      }
    }
    this.signalUpdate();
  }

  /**
   * Change the application running in indicated stations
   *
   * @todo Change interface to return a promise
   * @param {iterable} stationIDs - IDs of stations in which to change the appID
   * @param {string} appID - Name of the appID to run
   */
  changeApp(stationIDs, appID) {
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station) {
        if (station.state === Station.ON) {
          station.state = Station.BUSY;
          station.status = `Switching to ${appID}...`;
          station.app = '';

          this.connector.changeApp(stationID, appID).then(() => {
            station.app = appID;
            station.icon = StationManager.getIconURL(appID);
            station.state = Station.ON;
            station.status = '';
            this.log('message', station, `Launched app ${appID}`);
          })
          .catch(() => {
            station.app = appID;
            station.icon = StationManager.getIconURL(appID);
            station.state = Station.ERROR;
            station.status = 'Failure launching app';
            this.log('error', station, `Failed to launch app ${appID}`);
          })
          .then(() => {
            this.signalUpdate();
          });
        }
      }
    }
    this.signalUpdate();
  }

  /**
   * Return the URL of the icon of the specified app
   *
   * @param {string} appID - ID of the app
   * @returns {string} - URL of the icon
   */
  static getIconURL(appID) {
    if (iconmap[appID] !== undefined) {
      return `icons/${iconmap[appID]}`;
    }
    return 'icons/none.png';
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

    const maxEntries = this.config.get('max_log_length');
    if (this.logEntries.length > maxEntries) {
      this.logEntries = this.logEntries.slice(this.logEntries.length - maxEntries);
    }
  }
  
  /**
   * Signal listeners that station data was modified
   * @private
   */
  signalUpdate() {
    this.events.emit('stationUpdate');
  }
}
