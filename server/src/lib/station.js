import TerminalOutputBuffer from './terminal-output-buffer';
import Nagios from './nagios';

export default class Station {

  constructor(id, config) {
    this.id = id;
    this.name = config.name || id;
    this.description = config.description || '';
    this.profile = config.profile || '';
    this.type = config.type || '';
    this.default_app = (config.client_settings && config.client_settings.hilbert_station_default_application) || '';
    this.compatible_apps = config.compatible_applications;

    this.state = Station.UNKNOWN;
    this.setStatus('');
    this.app = '';
    this.switching_app = '';
    this.outputBuffer = new TerminalOutputBuffer();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      profile: this.profile,
      type: this.type,
      state: this.state,
      app: this.app,
      status: this.status,
      default_app: this.default_app,
      compatible_apps: this.compatible_apps,
      switching_app: this.switching_app,
    };
  }

  /**
   * Updates the state of the station
   *
   * Returns true if the state was changed
   *
   * @param {Object} stationStatus - MKLivestatus status of the station
   * @param {String} stationStatus.id - station.id
   * @param {Number} stationStatus.state - Enum from Nagios.HostState
   * @param {Number} stationStatus.state_type - Enum from Nagios.StateType
   * @param {Number} stationStatus.app_state - Enum from Nagios.ServiceState
   * @param {Number} stationStatus.app_state_type - Enum from Nagios.StateType
   * @param {String} stationStatus.app_id - ID of the app
   * @returns {boolean}
   */
  updateFromMKLivestatus(stationStatus) {
    let changes = false;
    if (this.app !== stationStatus.app_id) {
      this.app = stationStatus.app_id;
      changes = true;
    }

    // todo: STARTING_STATION, STARTING_APP and STOPPING timeout
    // todo: SWITCHING_APP timeout
    // todo: Come out of ERROR state (with notification)
    // todo: Come out of UNREACHABLE state

    if (stationStatus.state === Nagios.HostState.UNREACHABLE) {
      this.setErrorState('Station unreachable');
      return true;
    }

    if (this.state === Station.ERROR) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState();
        return true;
      } else if (stationStatus.state === Nagios.HostState.UP) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.UNKNOWN) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState();
        return true;
      } else if (stationStatus.state === Nagios.HostState.UP) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.ON) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState('Unexpectedly shut down');
        return true;
      }
    } else if (this.state === Station.OFF) {
      if (stationStatus.state === Nagios.HostState.UP) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.STOPPING) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState('Manually turned off');
        return true;
      }
    } else if (this.state === Station.STARTING_STATION) {
      if (stationStatus.state === Nagios.HostState.UP) {
        this.setStartingAppState();
        return true;
      }
    } else if (this.state === Station.STARTING_APP) {
      if (stationStatus.app_state === Nagios.ServiceState.OK) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.SWITCHING_APP) {
      if (this.switching_app !== '' && this.switching_app === stationStatus.app_id) {
        this.setOnState();
        return true;
      }

      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState('Unexpectedly shut down');
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
      this.setStatus('Waiting to start...');
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
      this.setStatus('Starting...');
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
      this.setStatus('Waiting for app...');
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
      this.setStatus('Waiting to stop...');
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
      this.setStatus('Stopping...');
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
      this.setStatus('Waiting to change app...');
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
      this.setStatus(`Opening ${appID}...`);
      this.switching_app = appID;
      return true;
    }
    return false;
  }

  setOnState() {
    this.state = Station.ON;
    this.setStatus('');
    this.switching_app = '';
  }

  setOffState(reason = '') {
    this.state = Station.OFF;
    this.setStatus(reason, (reason !== ''));
    this.switching_app = '';
  }

  /**
   * Transitions the station to the "error" state
   *
   * @param reason {string} Description of the error
   */
  setErrorState(reason) {
    this.state = Station.ERROR;
    this.setStatus(reason);
  }

  /**
   * Sets the station status text
   *
   * @private
   * @param text {String} Status text
   * @param withTimestamp {Boolean} Add a timestamp to the status
   */
  setStatus(text, withTimestamp = false) {
    let timestamp = '';
    if (withTimestamp) {
      const now = new Date();
      timestamp = `${now.getDate()}/${now.getMonth()} ${now.getHours()}:${now.getMinutes()}`;
    }

    this.status = [text, timestamp].join(' ');
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
