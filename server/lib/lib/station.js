const { EventEmitter } = require('events');

const TerminalOutputBuffer = require('./terminal-output-buffer');
const Nagios = require('./nagios');


class Station {
  constructor(id, config, nconf) {
    this.nconf = nconf;

    this.id = id;
    this.name = config.name || id;
    this.description = config.description || '';
    this.address = config.address || '';
    this.profile = config.profile || '';
    this.type = config.type || '';
    this.default_app = (config.client_settings && config.client_settings.hilbert_station_default_application) || '';
    this.compatible_apps = config.compatible_applications;

    this.state = Station.UNKNOWN;
    this.setStatus('');
    this.app = '';
    this.switching_app = '';
    this.start_time = '';
    this.app_start_time = '';
    this.outputBuffer = new TerminalOutputBuffer();
    this.events = new EventEmitter();
    this.transitionTimeout = null;
    this.onTransitionTimeout = this.onTransitionTimeout.bind(this);

    this.errorLockTimeout = null;
    this.errorLockStartTime = null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      address: this.address,
      profile: this.profile,
      type: this.type,
      state: this.state,
      app: this.app,
      status: this.status,
      locked: this.isErrorLocked(),
      locked_seconds: this.errorLockRemainingSeconds(),
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
   * @param {String} stationStatus.start_time - String timestamp
   * @param {Number} stationStatus.app_state - Enum from Nagios.ServiceState
   * @param {Number} stationStatus.app_state_type - Enum from Nagios.StateType
   * @param {String} stationStatus.app_id - ID of the app
   * @param {String} stationStatus.app_start_time - String timestamp
   * @returns {boolean}
   */
  updateFromMKLivestatus(stationStatus) {
    let changes = false;
    const oldApp = this.app;
    if (this.app !== stationStatus.app_id) {
      this.app = stationStatus.app_id;
      changes = true;
    }

    let startTimeChanged = false;
    if (stationStatus.start_time
      && stationStatus.start_time !== ''
      && stationStatus.start_time !== this.start_time) {
      startTimeChanged = true;
      this.start_time = stationStatus.start_time;
    }

    let appStartTimeChanged = false;
    if (stationStatus.app_start_time
      && stationStatus.app_start_time !== ''
      && stationStatus.app_start_time !== this.app_start_time) {
      appStartTimeChanged = true;
      this.app_start_time = stationStatus.app_start_time;
    }

    if (this.state === Station.ERROR && this.isErrorLocked()) {
      return false;
    }

    if (this.state !== Station.ERROR && stationStatus.state === Nagios.HostState.UNREACHABLE) {
      this.setErrorState('Station unreachable');
      this.events.emit('stateChange', this, 'error', 'Station unreachable');
      return true;
    }

    if (this.state === Station.ERROR || this.state === Station.UNKNOWN) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState();
        return true;
      }
      if (stationStatus.state === Nagios.HostState.UP) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.RESTARTING) {
      if (startTimeChanged) {
        this.setStartingState();
        return true;
      }
    } else if (this.state === Station.RESTARTING_APP) {
      if (appStartTimeChanged) {
        this.setStartingAppState();
        return true;
      }
    } else if (this.state === Station.ON) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setOffState('Unexpected stop');
        this.events.emit('stateChange', this, 'warning', 'Station stopped unexpectedly');
        return true;
      }
    } else if (this.state === Station.OFF) {
      if (stationStatus.state === Nagios.HostState.UP) {
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.STOPPING) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.events.emit('stateChange', this, 'info', 'Station stopped');
        this.setOffState('Manually turned off');
        return true;
      }
    } else if (this.state === Station.STARTING_STATION) {
      if (stationStatus.state === Nagios.HostState.UP) {
        this.setStartingAppState();
        return true;
      }
    } else if (this.state === Station.STARTING_APP) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setErrorState('Unexpected stop starting app. Please wait...');
        this.events.emit('stateChange', this, 'warning', 'Station stopped while starting app');
        this.errorLock();
        return true;
      }
      if (stationStatus.app_state === Nagios.ServiceState.OK) {
        this.events.emit('stateChange', this, 'info', 'Station started');
        this.setOnState();
        return true;
      }
    } else if (this.state === Station.SWITCHING_APP) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.setErrorState('Unexpected stop changing app. Please wait...');
        this.events.emit('stateChange', this, 'warning', 'Station stopped while changing app');
        this.errorLock();
        return true;
      }
      if (this.switching_app !== '' && this.switching_app === stationStatus.app_id) {
        this.events.emit('stateChange', this, 'info', 'App changed', `${oldApp} to ${this.switching_app}`);
        this.setOnState();
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
    if (!this.isErrorLocked() && this.state === Station.OFF) {
      this.state = Station.STARTING_STATION;
      this.setStatus('Waiting to start...');
      this.startTransitionTimeout();
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
    if (this.state === Station.OFF
      || this.state === Station.STARTING_STATION
      || this.state === Station.RESTARTING) {
      this.state = Station.STARTING_STATION;
      this.setStatus('Starting...');
      this.startTransitionTimeout();
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
    if (this.state === Station.STARTING_STATION
    || this.state === Station.RESTARTING_APP) {
      this.state = Station.STARTING_APP;
      this.setStatus('Waiting for app...');
      this.startTransitionTimeout();
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
    if (!this.isErrorLocked() && this.state === Station.ON) {
      this.state = Station.STOPPING;
      this.setStatus('Waiting to stop...');
      this.startTransitionTimeout();
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
      this.startTransitionTimeout();
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "waiting to restart" state
   *
   * @return {boolean} The transition was succesful
   */
  setQueuedToRestartState() {
    if (!this.isErrorLocked() && this.state === Station.ON) {
      this.state = Station.RESTARTING;
      this.setStatus('Waiting to restart...');
      this.startTransitionTimeout();
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "restarting" state
   *
   * @return {boolean} The transition was successful
   */
  setRestartingState() {
    if (this.state === Station.ON || this.state === Station.RESTARTING) {
      this.state = Station.RESTARTING;
      this.setStatus('Restarting...');
      this.startTransitionTimeout();
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
    if (!this.isErrorLocked() && this.state === Station.ON && appID !== this.app) {
      this.state = Station.SWITCHING_APP;
      this.setStatus('Waiting to change app...');
      this.switching_app = appID;
      this.startTransitionTimeout();
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
      this.startTransitionTimeout();
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "queued to restart app" state
   *
   * @return {boolean} The transition was successful
   */
  setQueuedToRestartAppState() {
    if (!this.isErrorLocked() && this.state === Station.ON) {
      this.state = Station.RESTARTING_APP;
      this.setStatus('Waiting to restart app...');
      this.startTransitionTimeout();
      return true;
    }
    return false;
  }

  /**
   * Transitions the station to the "restarting app" state
   *
   * @return {boolean} The transition was successful
   */
  setRestartingAppState(appID) {
    if (this.state === Station.ON || this.state === Station.RESTARTING_APP) {
      this.state = Station.RESTARTING_APP;
      this.setStatus('Restarting app');
      this.startTransitionTimeout();
      return true;
    }
    return false;
  }

  setOnState() {
    this.state = Station.ON;
    this.setStatus('');
    this.switching_app = '';
    this.clearTransitionTimeout();
  }

  setOffState(reason = '') {
    this.state = Station.OFF;
    this.setStatus(reason, (reason !== ''));
    this.switching_app = '';
    this.clearTransitionTimeout();
  }

  /**
   * Transitions the station to the "error" state
   *
   * @param reason {string} Description of the error
   */
  setErrorState(reason) {
    this.state = Station.ERROR;
    this.setStatus(reason);
    this.clearTransitionTimeout();
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

  /**
   * Start checking for a timeout while waiting for an operation to complete
   */
  startTransitionTimeout() {
    if (this.transitionTimeout !== null) {
      this.clearTransitionTimeout();
    }

    this.transitionTimeout = setTimeout(this.onTransitionTimeout, this.nconf.get('operation_timeout') * 1000);
  }

  /**
   * Clear checking for a timeout waiting for an operation to complete
   */
  clearTransitionTimeout() {
    clearTimeout(this.transitionTimeout);
    this.transitionTimeout = null;
  }

  /**
   * Event handler for timeouts waiting for an operation to complete
   */
  onTransitionTimeout() {
    this.transitionTimeout = null;

    const messages = {};
    messages[Station.STARTING_STATION] = 'Time out waiting for station to start';
    messages[Station.STARTING_APP] = 'Time out waiting for app to start';
    messages[Station.SWITCHING_APP] = 'Time out waiting for app to change';
    messages[Station.STOPPING] = 'Time out waiting for station to stop';
    messages[Station.RESTARTING] = 'Time out waiting for station to restart';
    messages[Station.RESTARTING_APP] = 'Time out waiting for app to restart';
    this.events.emit('stateChange', this, 'error', messages[this.state] || 'Operation timed out');

    this.state = Station.UNKNOWN;
  }

  /**
   * Locks the station for a number of seconds after an error
   *
   * While the station is locked no operations (stop, start, change app) can be started.
   */
  errorLock() {
    this.clearErrorLock();

    this.errorLockStartTime = Date.now();
    this.errorLockTimeout = setTimeout(() => {
      this.errorLockTimeout = null;
      this.errorLockStartTime = null;
    }, this.nconf.get('error_lock_time') * 1000);
  }

  /**
   * Pre-empts an error lock
   *
   * The station is unlocked immediately and its error lock timer is cleared.
   */
  clearErrorLock() {
    if (this.errorLockTimeout !== null) {
      clearTimeout(this.errorLockTimeout);
      this.errorLockTimeout = null;
      this.errorLockStartTime = null;
    }
  }

  /**
   * True if the station is locked because of an error
   */
  isErrorLocked() {
    return (this.errorLockTimeout !== null);
  }

  /**
   * Returns the number of seconds remaining before the error lock will end
   *
   * @return {number}
   */
  errorLockRemainingSeconds() {
    if (this.errorLockTimeout === null || this.errorLockStartTime === null) {
      return 0;
    }

    const elapsedSeconds = Math.floor((Date.now() - this.errorLockStartTime) / 1000);
    const wait = this.nconf.get('error_lock_time') || 0;

    return Math.max(wait - elapsedSeconds, 0);
  }
}

// Station states

Station.UNKNOWN = 'unk';
Station.OFF = 'off';
Station.ON = 'on';
Station.STOPPING = 'stopping';
Station.RESTARTING = 'restarting';
Station.STARTING_STATION = 'starting_station';
Station.STARTING_APP = 'starting_app';
Station.SWITCHING_APP = 'switching_app';
Station.RESTARTING_APP = 'restarting_app';
Station.ERROR = 'error';

module.exports = Station;
