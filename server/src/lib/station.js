import TerminalOutputBuffer from './terminal-output-buffer';
import Nagios from './nagios';

export default class Station {

  constructor(config) {
    const configKeys = ['id', 'name', 'type', 'default_app', 'possible_apps'];

    for (const configKey of configKeys) {
      if (!config.hasOwnProperty(configKey)) {
        if (configKey === 'id') {
          throw new Error('Attempted to initialize station with config missing id');
        }
        throw new Error(
          `Attempted to initialize station ${config.id} missing config key ${configKey}`
        );
      }

      this[configKey] = config[configKey];
    }

    this.state = Station.UNKNOWN;
    this.status = '';
    this.app = this.default_app;
    this.switching_app = '';
    this.outputBuffer = new TerminalOutputBuffer();
  }

  /**
   * Updates the state of the station
   *
   * Returns true if the state was changed
   *
   * @param {Object} stationStatus - MKLivestatus status of the station
   * @returns {boolean}
   */
  updateFromMKLivestatus(stationStatus) {
    // stationStatus:
      // id: station.id,
      // state: Nagios.HostState.DOWN,
      // state_type: Nagios.StateType.HARD,
      // app_state: Nagios.ServiceState.UNKNOWN,
      // app_state_type: Nagios.StateType.HARD,
      // app_id: '',

    let changes = false;
    if (this.app !== stationStatus.app_id) {
      this.app = stationStatus.app_id;
      changes = true;
    }

    // todo: STARTING_STATION, STARTING_APP and STOPPING timeout
    // todo: SWITCHING_APP timeout

    if (this.state === Station.ERROR) {
      return false;
    }

    if (stationStatus.state === Nagios.HostState.UNREACHABLE) {
      this.setErrorState('Station unreachable');
      return true;
    }

    if (this.state === Station.UNKNOWN) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState();
        return true;
      } else if (stationStatus.state === Nagios.HostState.UP) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.ON) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState();
        return true;
      }
    } else if (this.state === Station.OFF) {
      if (stationStatus.state === Nagios.HostState.UP) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.STOPPING) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState();
        return true;
      }
    } else if (this.state === Station.STARTING_STATION) {
      if (stationStatus.state === Nagios.HostState.UP) {
        this.setStartingAppState();
        return true;
      }
    } else if (this.state === Station.STARTING_APP) {
      if (stationStatus.app_state === Nagios.ServiceState.OK ) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.SWITCHING_APP) {
      if (this.switching_app !== '' && this.switching_app === stationStatus.app_id) {
        this.setOnState();
        return true;
      }

      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState();
        return true;
      }
    }

    return changes;
  }

  /**
   * Transitions the station to the "waiting to start" state
   *
   * @return {boolean} The transition was successful
   */
  setQueuedToStartState() {
    if (this.state === Station.OFF) {
      this.state = Station.STARTING_STATION;
      this.status = 'Waiting to start...';
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "starting" state
   *
   * @return {boolean} The transition was successful
   */
  setStartingState() {
    if (this.state === Station.OFF || this.state === Station.STARTING_STATION) {
      this.state = Station.STARTING_STATION;
      this.status = 'Starting...';
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "starting app" state
   *
   * @return {boolean} The transition was sucessful
   */
  setStartingAppState() {
    if (this.state === Station.STARTING_STATION) {
      this.state = Station.STARTING_APP;
      this.status = 'Waiting for app...';
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "waiting to stop" state
   *
   * @return {boolean} The transition was succesful
   */
  setQueuedToStopState() {
    if (this.state === Station.ON) {
      this.state = Station.STOPPING;
      this.status = 'Waiting to stop...';
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "stopping" state
   *
   * @return {boolean} The transition was successful
   */
  setStoppingState() {
    if (this.state === Station.OFF || this.state === Station.STOPPING) {
      this.state = Station.STOPPING;
      this.status = 'Stopping...';
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "queued to change app" state
   *
   * @param appID {string}
   * @return {boolean} The transition was successful
   */
  setQueuedToChangeAppState(appID) {
    if (this.state === Station.ON && appID !== this.app) {
      this.state = Station.SWITCHING_APP;
      this.status = 'Waiting to change app...';
      this.switching_app = appID;
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "changing app" state
   *
   * @param appID {string}
   * @return {boolean} The transition was successful
   */
  setChangingAppState(appID) {
    if ((this.state === Station.ON || this.state === Station.SWITCHING_APP) && appID !== this.app) {
      this.state = Station.SWITCHING_APP;
      this.status = `Opening ${appID}...`;
      this.switching_app = appID;
      return true;
    }
    return false;
  }

  setOnState() {
    this.state = Station.ON;
    this.status = '';
    this.switching_app = '';
  }

  setOffState() {
    this.state = Station.OFF;
    this.status = '';
    this.switching_app = '';
  }

  /**
   * Transitions the station to the "error" state
   *
   * @param reason {string} Description of the error
   */
  setErrorState(reason) {
    this.state = Station.ERROR;
    this.status = reason;
  }
}

// Station states

Station.UNKNOWN = 'unk';
Station.OFF = 'off';
Station.ON = 'on';
Station.STOPPING = 'stopping';
Station.STARTING_STATION = 'starting_station';
Station.STARTING_APP = 'starting_app';
Station.SWITCHING_APP = 'switching_app';
Station.ERROR = 'error';
