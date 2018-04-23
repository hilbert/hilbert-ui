import Station from './station';
import StationProfile from './station-profile';
import Application from './application';
import TerminalOutputBuffer from './terminal-output-buffer';

const Promise = require('bluebird');
const EventEmitter = require('events').EventEmitter;
const Ajv = require('ajv');

const HilbertCfgSchema = require('../../data/schema/hilbert-cfg-partial.json');

/**
 * Service Layer for hilbert
 * Dispatches requests asynchronously and keeps cached state
 */
export default class StationManager {

  /**
   * Create a Station Manager
   *
   * @param {Object} nconf - Instance of nconf configuration
   * @param {Object} logger - Instance of winston logger
   * @param {HilbertCLIConnector} hilbertCLI - hilbert-cli connector
   * @param {MKLivestatusConnector} mkLivestatus - MKLivestatus connector
   */
  constructor(nconf, logger, hilbertCLI, mkLivestatus) {
    this.nconf = nconf;
    this.logger = logger;

    this.hilbertCLI = hilbertCLI;
    this.mkLivestatus = mkLivestatus;

    this.events = new EventEmitter();
    this.notifications = [];
    this.lastNotificationID = 1;

    this.globalHilbertCLIOutputBuffer = new TerminalOutputBuffer();
    this.lastMKLivestatusDump = [];
    this.lastMKLivestatusDumpTime = '';

    this.clearStations();
    this.clearStationProfiles();
    this.clearApplications();
  }

  /**
   * Reads the station configuration and begins polling station status
   *
   * @return {Promise}
   */
  init() {
    return this.loadHilbertCfg().then(() => {
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
              this.logger.error(
                `Station manager: Repeated MKLivestatus polling errors (${errorDigestSize} times)`);
            }
          }
          consecutiveErrors += 1;
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
  loadHilbertCfg() {
    this.clearStations();
    this.clearStationProfiles();
    this.clearApplications();
    this.signalUpdate();

    return this.hilbertCLI.getHilbertCfg(this.globalHilbertCLIOutputBuffer)
      .then(hilbertCfg => StationManager.validateHilbertCfg(hilbertCfg))
      .then((hilbertCfg) => {
        for (const [appID, appCfg] of Object.entries(hilbertCfg.Applications)) {
          this.addApplication(new Application(appID, appCfg));
        }

        for (const [profileID, profileCfg] of Object.entries(hilbertCfg.Profiles)) {
          this.addStationProfile(new StationProfile(profileID, profileCfg));
        }

        for (const [stationID, stationCfg] of Object.entries(hilbertCfg.Stations)) {
          if (!stationCfg.hidden) {
            this.addStation(new Station(stationID, stationCfg, this.nconf));
          }
        }
        this.signalUpdate();
      });
  }

  /**
   * Adds a station profile
   *
   * @param {StationProfile} stationProfile
   */
  addStationProfile(stationProfile) {
    this.logger.verbose(`Station manager: Adding station profile ${stationProfile.id}`);
    this.stationProfiles.set(stationProfile.id, stationProfile);
  }

  /**
   * Adds an application
   *
   * @param {Application} application
   */
  addApplication(application) {
    this.logger.verbose(`Station manager: Adding application profile ${application.id}`);
    this.applications.set(application.id, application);
  }

  /**
   * Adds a station to the manager
   * @param {Station} aStation
   */
  addStation(aStation) {
    this.logger.verbose(`Station manager: Adding station ${aStation.id}`);
    this.stationList.push(aStation);
    this.stationIndex.set(aStation.id, aStation);
    aStation.events.on('stateChange', (station, type, message, details) => {
      this.notify(type, station, message, details);

      let extraText = '';
      if (details !== undefined) {
        extraText = ` (${details})`;
      }
      if (type === 'info') {
        this.logger.info(`Station manager: ${station.id}: ${message}${extraText}`);
      } else if (type === 'warning') {
        this.logger.warn(`Station manager: ${station.id}: ${message}${extraText}`);
      } else if (type === 'error') {
        this.logger.error(`Station manager: ${station.id}: ${message}${extraText}`);
      } else {
        this.logger.verbose(`Station manager: ${station.id}: ${message}${extraText}`);
      }
    });
  }

  /**
   * Removes a station from the manager
   * @param {Station} aStation
   */
  removeStation(aStation) {
    this.logger.verbose(`Station manager: Removing station ${aStation.id}`);
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
    this.logger.verbose('Station manager: Clearing all stations');
    this.stationIndex = new Map();
    this.stationList = [];
  }

  /**
   * Removes all the station profiles
   */
  clearStationProfiles() {
    this.logger.verbose('Station manager: Clearing all station profiles');
    this.stationProfiles = new Map();
  }

  /**
   * Removes all the applications
   */
  clearApplications() {
    this.logger.verbose('Station manager: Clearing all applications');
    this.applications = new Map();
  }

  /**
   * Returns the station profiles
   *
   * @return {Iterator.<StationProfile>}
   */
  getStationProfiles() {
    return this.stationProfiles.values();
  }

  /**
   * Returns the applications
   *
   * @return {Iterator.<Application>}
   */
  getApplications() {
    return this.applications.values();
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
      if (station && station.setQueuedToStartState()) {
        eligibleStations.push(stationID);
      }
    }

    this.signalUpdate();

    return Promise.map(
      eligibleStations,
      (eligibleStation) => {
        this.logger.verbose(`Station manager: Starting station ${eligibleStation}`);
        const station = this.getStationByID(eligibleStation);
        station.setStartingState();
        this.signalUpdate();
        this.mkLivestatus.invalidateAppState(station.id);
        return this.hilbertCLI.startStation(station.id, station.outputBuffer).then(() => {
          this.logger.verbose(`Station manager: Waiting for station ${eligibleStation} to start`);
        })
        .catch(() => {
          this.logger.verbose(`Station manager: Error starting station ${eligibleStation}`);
          this.notify('error', station, 'Error starting station');
          station.setErrorState('Failure starting the station. Please wait...');
          station.errorLock();
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
      if (station && station.setQueuedToStopState()) {
        eligibleStations.push(stationID);
      }
    }

    this.signalUpdate();

    return Promise.map(
      eligibleStations,
      (eligibleStation) => {
        this.logger.verbose(`Station manager: Stopping station ${eligibleStation}`);
        const station = this.getStationByID(eligibleStation);
        station.setStoppingState();
        this.signalUpdate();
        return this.hilbertCLI.stopStation(station.id, station.outputBuffer).then(() => {
          this.logger.verbose(`Station manager: Waiting for station ${eligibleStation} to stop`);
        })
          .catch(() => {
            this.logger.verbose(`Station manager: Error stopping station ${eligibleStation}`);
            this.notify('error', station, 'Error stopping station');
            station.setErrorState('Failure stopping the station. Please wait...');
            station.errorLock();
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
   * @return {Promise}
   */
  changeApp(stationIDs, appID) {
    const eligibleStations = [];
    for (const stationID of stationIDs) {
      const station = this.getStationByID(stationID);
      if (station && station.setQueuedToChangeAppState(appID)) {
        eligibleStations.push(stationID);
      }
    }

    this.signalUpdate();

    return Promise.map(
      eligibleStations,
      (eligibleStation) => {
        this.logger.verbose(
          `Station manager: Changing app of station ${eligibleStation} to ${appID}`);
        const station = this.getStationByID(eligibleStation);
        station.setChangingAppState(appID);
        this.signalUpdate();
        return this.hilbertCLI.changeApp(eligibleStation, appID, station.outputBuffer).then(() => {
          this.logger.verbose(
            `Station manager: Waiting for app of station ${eligibleStation} to change to ${appID}`);
        })
        .catch(() => {
          this.logger.verbose(
            `Station manager: Error changing app of station ${eligibleStation} to ${appID}`);
          this.notify('error', station, `Failed to launch app ${appID}`);
          station.setErrorState(`Failed to open ${appID}. Please wait...`);
          station.errorLock();
        })
        .then(() => {
          this.signalUpdate();
        });
      },
      { concurrency: this.nconf.get('scriptConcurrency') }
    );
  }

  /**
   * Return the notification log
   *
   * Each notification is an object with the following structure:
   * - id {string} : Unique id of the entry
   * - time {string} : Timestamp in ISO format
   * - type {string} : info | warning | error
   * - message {string} : Event description
   *
   * @returns {Array}
   */
  getNotifications() {
    return this.notifications;
  }

  /**
   * Generates a notification
   *
   * @param {string} type - Notification type: info | warning | error
   * @param {Station|null} station - station associated with the event logged
   * @param {string} message - Text of the notification
   * @param {string} details - Extra details
   */
  notify(type, station, message, details = '') {
    const newNotification = {
      id: this.lastNotificationID,
      time: new Date().toISOString(),
      type,
      message,
      details,
    };

    if (station !== null) {
      newNotification.station_id = station.id;
      newNotification.station_name = station.name;
    }

    this.lastNotificationID += 1;
    this.notifications.push(newNotification);
    const maxNotifications = this.nconf.get('max_notifications');
    if (this.notifications.length > maxNotifications) {
      this.notifications = this.notifications.slice(this.notifications.length - maxNotifications);
    }

    this.events.emit('notification', newNotification);
  }

  /**
   * Polls MKLivestatus and updates the state of stations
   * @returns {Promise}
   */
  pollMKLivestatus() {
    return this.mkLivestatus.getState().then((allStationsStatus) => {
      const lastState = [];
      let changes = false;
      for (const stationStatus of allStationsStatus) {
        lastState.push(stationStatus);
        const station = this.getStationByID(stationStatus.id);
        if (station) {
          if (station.updateFromMKLivestatus(stationStatus)) {
            changes = true;
          }
        }
      }
      this.lastMKLivestatusDump = lastState;
      this.lastMKLivestatusDumpTime = new Date().toISOString();

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


  /**
   * Validates a hilbert configuration according to the schema
   *
   * Only the parts of the configuration used by this program are validated
   *
   * @param hilbertCfg
   * @return {*}
   */
  static validateHilbertCfg(hilbertCfg) {
    const ajv = new Ajv();
    if (!ajv.validate(HilbertCfgSchema, hilbertCfg)) {
      throw new Error(`Error in Hilbert CFG: ${ajv.errorsText()}`);
    }
    return hilbertCfg;
  }
}
