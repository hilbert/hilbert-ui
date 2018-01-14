/* globals should */
import PresetStore from '../lib/presets/preset-store';
import DuplicateIdentifierError from '../lib/presets/duplicate-identifier-error';

const tmp = require('tmp');
require('should');

describe('Preset Store', () => {
  let store = null;
  const testName = 'My test preset';
  const stationIdA = 'A Station';
  const stationIdB = 'B Station';
  const testData = 'App 1';
  const testDataB = 'App 2';

  beforeEach(() => {
    store = new PresetStore();
  });

  it('Allows storing presets on a new empty db', () => {
    let storedID = null;
    return store.open('')
      .then(() => {
        const preset = store.createPreset();
        preset.name = testName;
        preset.setStationApp(stationIdA, testData);
        preset.setStationApp(stationIdB, testDataB);
        return preset.save().then(() => {
          storedID = preset.id;
        });
      })
      .then(() => store.loadPreset(storedID))
      .then((retrieved) => {
        retrieved.name.should.equal(testName);
        retrieved.getStationApp(stationIdA).should.deepEqual(testData);
        retrieved.getStationApp(stationIdB).should.deepEqual(testDataB);
      })
      .then(() => store.close());
  });

  it('Persists data after closing the db', (done) => {
    let storedID = null;
    tmp.file((err, path, fd, cleanup) => {
      store.open(path)
        .then(() => {
          const preset = store.createPreset();
          preset.name = testName;
          preset.setStationApp(stationIdA, testData);
          preset.setStationApp(stationIdB, testDataB);
          return preset.save().then(() => {
            storedID = preset.id;
          });
        })
        .then(() => store.close())
        .then(() => store.open(path))
        .then(() => store.loadPreset(storedID))
        .then((retrieved) => {
          retrieved.name.should.equal(testName);
          retrieved.getStationApp(stationIdA).should.deepEqual(testData);
          retrieved.getStationApp(stationIdB).should.deepEqual(testDataB);
        })
        .then(() => store.close())
        .then(() => {
          cleanup();
          done();
        });
    });
  });

  it('Allows updating presets', () => {
    let storedID = null;
    return store.open('')
      .then(() => {
        const preset = store.createPreset();
        preset.name = `${testName}_a`;
        preset.setStationApp(stationIdA, testData);
        preset.setStationApp(stationIdB, testDataB);
        return preset.save().then(() => {
          storedID = preset.id;
        });
      })
      .then(() => store.loadPreset(storedID))
      .then((storedPreset) => {
        storedPreset.name.should.equal(`${testName}_a`);
        storedPreset.getStationApp(stationIdA).should.deepEqual(testData);
        storedPreset.getStationApp(stationIdB).should.deepEqual(testDataB);
        testData.should.not.deepEqual(testDataB);
        storedPreset.name = `${testName}_b`; // eslint-disable-line no-param-reassign
        storedPreset.setStationApp(stationIdA, testDataB);
        storedPreset.setStationApp(stationIdB, testData);
        return storedPreset.save();
      })
      .then(() => store.loadPreset(storedID))
      .then((storedPreset) => {
        storedPreset.name.should.equal(`${testName}_b`);
        storedPreset.getStationApp(stationIdA).should.deepEqual(testDataB);
        storedPreset.getStationApp(stationIdB).should.deepEqual(testData);
      });
  });

  it('Lists stored presets', () => store.open('')
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(0);
      })
      .then(() => {
        const preset = store.createPreset();
        preset.name = `${testName}_0`;
        preset.setStationApp(stationIdA, testData);
        return preset.save();
      })
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(1);
      })
      .then(() => {
        const preset = store.createPreset();
        preset.name = `${testName}_1`;
        preset.setStationApp(stationIdA, testData);
        return preset.save();
      })
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(2);
      })
      .then(() => {
        const preset = store.createPreset();
        preset.name = `${testName}_2`;
        preset.setStationApp(stationIdA, testData);
        return preset.save();
      })
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(3);
        allPresets.should.deepEqual([
          { id: 1, name: `${testName}_0` },
          { id: 2, name: `${testName}_1` },
          { id: 3, name: `${testName}_2` },
        ]);
      })
      .then(() => store.close())
  );

  it('Fails when saving two presets with the same name', () => store.open('')
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(0);
      })
      .then(() => {
        const preset = store.createPreset();
        preset.name = testName;
        preset.setStationApp(stationIdA, testData);
        return preset.save();
      })
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(1);
      })
      .then(() => {
        const preset = store.createPreset();
        preset.name = testName;
        preset.setStationApp(stationIdA, testData);
        return preset.save();
      })
      .should.be.rejectedWith(DuplicateIdentifierError)
  );

  it('Fails when changing the name of a preset to an existing one', () => {
    let storedID = null;
    return store.open('')
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(0);
      })
      .then(() => {
        const preset = store.createPreset();
        preset.name = `${testName}_a`;
        preset.setStationApp(stationIdA, testData);
        return preset.save();
      })
      .then(() => store.listAllPresets())
      .then((allPresets) => {
        allPresets.length.should.equal(1);
      })
      .then(() => {
        const preset = store.createPreset();
        preset.name = `${testName}_b`;
        preset.setStationApp(stationIdA, testData);
        return preset.save().then(() => {
          storedID = preset.id;
        });
      })
      .then(() => store.loadPreset(storedID))
      .then((storedPreset) => {
        storedPreset.name = `${testName}_a`; // eslint-disable-line no-param-reassign
        return storedPreset.save();
      })
      .should.be.rejectedWith(DuplicateIdentifierError);
  });
});
