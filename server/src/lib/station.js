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

    this.state = 'off';
    this.status = '';
    this.app = this.default_app;
    this.icon = '';
  }
}

// Station states

Station.OFF = 'off';
Station.ON = 'on';
Station.BUSY = 'busy';
Station.ERROR = 'error';
