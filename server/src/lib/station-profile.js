/**
 * Represents a Hilbert Station Profile
 */
export default class StationProfile {
  constructor(id, cfg) {
    this.id = id;
    this.name = cfg.name || id;
    this.description = cfg.description || '';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description
    };
  }
}
