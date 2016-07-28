import StationOutputBuffer from './station-output-buffer';
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
    this.outputBuffer = new StationOutputBuffer();
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

    // todo: STARTING and STOPPING timeout
    // todo: SWITCHING_APP timeout

    if (this.state === Station.ERROR) {
      return false;
    }

    if (stationStatus.state === Nagios.HostState.UNREACHABLE) {
      this.state = Station.ERROR;
      this.status = 'Station unreachable';
      return true;
    }

    if ((this.state === Station.UNKNOWN)) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.state = Station.OFF;
        this.status = '';
        return true;
      } else if (stationStatus.state === Nagios.HostState.UP) {
        this.state = Station.ON;
        this.status = '';
        return true;
      }
    } else if (this.state === Station.ON) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.state = Station.OFF;
        this.status = '';
        return true;
      }
    } else if (this.state === Station.OFF) {
      if (stationStatus.state === Nagios.HostState.UP) {
        console.log('changing');
        this.state = Station.ON;
        this.status = '';
        return true;
      }
    } else if (this.state === Station.STOPPING) {
      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.state = Station.OFF;
        this.status = '';
        return true;
      }
    } else if (this.state === Station.STARTING) {
      if (stationStatus.state === Nagios.HostState.UP) {
        this.state = Station.ON;
        this.status = '';
        return true;
      }
    } else if (this.state === Station.SWITCHING_APP) {
      if (this.switching_app !== '' && this.switching_app === stationStatus.app_id) {
        this.state = Station.ON;
        this.status = '';
        this.switching_app = '';
      }

      if (stationStatus.state === Nagios.HostState.DOWN) {
        this.state = Station.OFF;
        this.status = '';
        return true;
      }
    }

    return changes;
  }
}

// Station states

Station.UNKNOWN = 'unk';
Station.OFF = 'off';
Station.ON = 'on';
Station.STOPPING = 'stopping';
Station.STARTING = 'starting';
Station.SWITCHING_APP = 'switching_app';
Station.ERROR = 'error';
