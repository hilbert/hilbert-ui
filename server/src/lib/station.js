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
    this.icon = '';
  }
}

// Station states

Station.UNKNOWN = 'unk';
Station.OFF = 'off';
Station.ON = 'on';
Station.STOPPING = 'stopping';
Station.STARTING = 'starting';
Station.SWITCHING_APP = 'switching_app';
Station.BUSY = 'busy'; // Deprecated
Station.ERROR = 'error';
