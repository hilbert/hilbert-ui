const testStations = require('../../tests/models/test_stations.json');
const iconmap = require('../../iconmap.json');
const EventEmitter = require('events').EventEmitter;

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
    this.stations = testStations;
    this.events = new EventEmitter();
    for (const station of this.stations) {
      station.icon = this.getIconURL(station.app);
    }
    this.logEntries = [];
  }

  /**
   * Return the list of stations
   */
  getStations() {
    return this.stations;
  }

  /**
   * Return a station identified by ID
   *
   * @param {string} id - Station ID
   * @returns {*}
   */
  getStationByID(id) {
    for (const station of this.stations) {
      if (station.id === id) {
        return station;
      }
    }

    return null;
  }

  /**
   * Start indicated stations
   *
   * @todo Change interface to return a promise
   * @param {iterable} stationIDs - IDs of stations to start
   */
  startStations(stationIDs) {
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station) {
        if (station.state === 'off') {
          station.state = 'busy';
          station.status = 'Starting...';
          this.connector.startStation(stationID).then(() => {
            station.state = 'on';
            station.status = '';
            this.log('message', station, 'Station started');
          })
          .catch(() => {
            station.state = 'error';
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
   * @param {iterable} stationIDs - IDs of stations to stop
   */
  stopStations(stationIDs) {
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station) {
        if (station.state === 'on') {
          station.state = 'busy';
          station.status = 'Stopping...';

          this.connector.stopStation(stationID).then(() => {
            station.state = 'off';
            station.status = '';
            this.log('message', station, 'Station stopped');
          })
          .catch(() => {
            station.state = 'error';
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
        if (station.state === 'on') {
          station.state = 'busy';
          station.status = `Switching to ${appID}...`;
          station.app = '';

          this.connector.changeApp(stationID, appID).then(() => {
            station.app = appID;
            station.icon = this.getIconURL(appID);
            station.state = 'on';
            station.status = '';
            this.log('message', station, `Launched app ${appID}`);
          })
          .catch(() => {
            station.app = appID;
            station.icon = this.getIconURL(appID);
            station.state = 'error';
            station.status = 'Failure launching appID';
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
  getIconURL(appID) {
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
   * @param {string|null} station - station associated with the event logged
   * @param {string} message - Message to log
   */
  log(type, station, message) {
    const newLogEntry = {
      id: this.logEntries.length + 1,
      time: new Date().toISOString(),
      type,
      message,
    };

    if (station !== null) {
      newLogEntry.station_id = station.id;
      newLogEntry.station_name = station.name;
    }

    this.logEntries.push(newLogEntry);

    const maxEntries = this.config.get('max_log_length');
    if (this.logEntries.length > maxEntries) {
      this.logEntries = this.logEntries.slice(this.logEntries.length - maxEntries);
    }
  }

  /**
   * Return the event emitter
   *
   * @returns {EventEmitter}
   */
  getEvents() {
    return this.events;
  }

  /**
   * Signal listeners that station data was modified
   * @private
   */
  signalUpdate() {
    this.getEvents().emit('stationUpdate');
  }
}
