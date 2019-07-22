/**
 * An service definition from Hilbert Cfg
 */
class Service {
  constructor(id, cfg) {
    this.id = id;
    this.name = cfg.name || id;
    this.description = cfg.description || '';
    this.url = cfg.url || '';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      url: this.url,
    };
  }
}

module.exports = Service;
