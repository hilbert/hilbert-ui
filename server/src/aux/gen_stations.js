const baseTemplate = {
  id: '<override per station>',
  name: '<override per station>',
  type: '<override per type>',
  default_app: '<override per station>',
  possible_apps: '<override per type>',
  state: 'off',
  status: '',
  app: '<override per type>',
};

const stationTypeTemplates = {
  static: {
    type: 'static',
    possible_apps: [
      'Milky Way at different wavelengths',
      'Slideshow: Milky Way',
      'Slideshow: Relativity',
    ],
  },
  interactive: {
    type: 'interactive',
    possible_apps: [
      'Black hole pong',
      'Habitable zone',
      'Stellar evolution',
      'Day & night, time zones',
      'Moon phases & eclipses',
      'Chilean night sky',
      'Illustris explorer',
      'Signal delay',
      'Galaxy zoo',
      'Time relativity',
      'Sky explorer / Aladin lite',
    ],
  },
  kinect: {
    type: 'kinect',
    possible_apps: [
      'Floor projection "star formation"',
    ],
  },
  vr: {
    type: 'vr',
    possible_apps: [
      'Formation of the moon AR',
      'Solar system formation AR',
      'VR experience of ESO sites',
    ],
  },
  special: {
    type: 'special',
    possible_apps: [
      'Galaxy collision touch table',
      'Science on a half-sphere',
      'Science on a sphere',
      'Solar system explorer',
      'IR/UV/optical camera',
      'ALMA Interferometry',
      'Relativity bike',
    ],
  },
};

class StationGenerator {

  constructor() {
    this.stations = [];
  }

  addStation(name, type, appNumber) {
    const newStation = {};
    Object.assign(newStation, baseTemplate, stationTypeTemplates[type]);
    newStation.id = `station_${type}_${this.stations.length + 1}`;
    newStation.default_app = newStation.possible_apps[0];
    newStation.app = newStation.possible_apps[appNumber];
    newStation.name = `${name} (${newStation.app})`;

    this.stations.push(newStation);
  }

  getStations() {
    return this.stations;
  }
}

const generator = new StationGenerator();

generator.addStation('F1 Interactive 101', 'interactive', 0);
generator.addStation('F1 Interactive 102', 'interactive', 1);
generator.addStation('F1 Interactive 103', 'interactive', 2);
generator.addStation('F1 Interactive 104', 'interactive', 2);
generator.addStation('F1 Interactive 105', 'interactive', 2);

generator.addStation('F1 Static 110', 'static', 0);
generator.addStation('F1 Kinect 120', 'kinect', 0);

generator.addStation('F1 Touch Table 130', 'special', 0);
generator.addStation('F1 Leap 131', 'special', 1);
generator.addStation('F1 Leap 131', 'special', 1);
generator.addStation('F1 Leap 132', 'special', 1);

generator.addStation('F2 Interactive 206', 'interactive', 3);
generator.addStation('F2 Interactive 207', 'interactive', 4);
generator.addStation('F2 Interactive 208', 'interactive', 4);
generator.addStation('F2 Interactive 209', 'interactive', 5);
generator.addStation('F2 Interactive 210', 'interactive', 5);

generator.addStation('F2 Static 211', 'static', 1);
generator.addStation('F2 Static 212', 'static', 1);
generator.addStation('F2 Static 213', 'static', 1);
generator.addStation('F2 Static 214', 'static', 2);
generator.addStation('F2 Static 215', 'static', 2);
generator.addStation('F2 Static 216', 'static', 2);

generator.addStation('F2 VR 220', 'vr', 0);
generator.addStation('F2 VR 221', 'vr', 1);
generator.addStation('F2 VR 222', 'vr', 2);

console.log(JSON.stringify(generator.getStations(), null, 2));
