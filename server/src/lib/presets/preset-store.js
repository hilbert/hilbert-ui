import Preset from './preset';
import DuplicateIdentifierError from './duplicate-identifier-error';

const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

/**
 * Manages Preset persistant storage
 */
export default class PresetStore {

  constructor() {
    this.db = null;
  }

  /**
   * Opens the store database and inits it if needed
   *
   * After opening the database checks if the tables exist and creates them if they don't.
   *
   * @param filename
   *   Filename of the database file or ':memory:' for an anonymous in-memory database
   *   or an empty string for an anonymous disk-based database.
   *
   * @return {Promise}
   */
  open(filename) {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(
        filename,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, // eslint-disable-line no-bitwise
        (err) => {
          if (err === null) {
            resolve();
          } else {
            reject(err);
          }
        });
    })
    .then(() => this.tableExists())
    .then((exists) => {
      if (!exists) {
        return this.createTables();
      }
      return Promise.resolve();
    });
  }

  /**
   * Closes the database
   *
   * @return {bluebird}
   */
  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err === null) {
          this.db = null;
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  /**
   * Checks if the storage table exists in the database
   *
   * @return {bluebird}
   *  The promise resolves to a bool with the answer
   */
  tableExists() {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT name FROM sqlite_master WHERE type='table' AND name=$table;",
        { $table: 'presets' },
        (err, row) => {
          if (err === null) {
            resolve(row !== undefined);
          } else {
            reject(err);
          }
        }
      );
    });
  }

  /**
   * Creates the storage tables in the database
   *
   * @return {bluebird}
   */
  createTables() {
    return new Promise((resolve, reject) => {
      this.db.run(`
CREATE TABLE IF NOT EXISTS presets 
(
  id integer PRIMARY KEY NOT NULL,
  name text UNIQUE, 
  stationApps text
)
`,
        [],
        (err) => {
          if (err === null) {
            resolve();
          } else {
            reject(err);
          }
        }
      );
    });
  }

  /**
   * Creates a Preset object associated to this store
   *
   * @param {Object} data
   *  Data properties to initialize the preset
   * @return {Preset}
   */
  createPreset(data = {}) {
    const answer = new Preset(data);
    answer.setStore(this);
    return answer;
  }

  /**
   * Loads all presets
   *
   * @return {bluebird<Array<Preset>>}
   */
  loadAllPresets() {
    return new Promise((resolve, reject) => {
      this.db.all(`
SELECT *
FROM presets 
`,
        [],
        (err, rows) => {
          if (err === null) {
            const answer = [];
            if (rows !== undefined) {
              for (const row of rows) {
                answer.push(this.createPreset({
                  id: row.id,
                  name: row.name,
                  stationApps: JSON.parse(row.stationApps),
                }));
              }
            }
            resolve(answer);
          } else {
            reject(err);
          }
        }
      );
    });
  }


  /**
   * Loads a Preset object with a certain ID
   *
   * @param {String} id
   * @return {bluebird}
   *  The promise resolves to a Preset or null if it doesn't exist
   */
  loadPreset(id) {
    return new Promise((resolve, reject) => {
      this.db.get(`
SELECT *
FROM presets 
WHERE id = $id
`,
        {
          $id: id,
        },
        (err, row) => {
          if (err === null) {
            if (row !== undefined) {
              const answer = this.createPreset();
              answer.id = row.id;
              answer.name = row.name;
              answer.stationApps = JSON.parse(row.stationApps);
              resolve(answer);
            } else {
              resolve(null);
            }
          } else {
            reject(err);
          }
        }
      );
    });
  }

  /**
   * Inserts a Preset in the database
   *
   * @param {Preset} preset
   * @return {bluebird}
   */
  insertPreset(preset) {
    return new Promise((resolve, reject) => {
      this.db.run(`
INSERT INTO presets (name, stationApps)
VALUES ($name, $stationApps)
`,
        {
          $name: preset.name,
          $stationApps: JSON.stringify(preset.stationApps),
        },
        function callback(err) {
          if (err === null) {
            resolve(this.lastID);
          } else {
            reject(PresetStore.checkDuplicateNameError(err));
          }
        }
      );
    });
  }

  /**
   * Updates a Preset in the database
   *
   * @param {Preset} preset
   * @return {bluebird}
   */
  updatePreset(preset) {
    return new Promise((resolve, reject) => {
      this.db.run(`
UPDATE presets
SET name = $name, stationApps = $stationApps
WHERE id = $id
`,
        {
          $id: preset.id,
          $name: preset.name,
          $stationApps: JSON.stringify(preset.stationApps),
        },
        (err) => {
          if (err === null) {
            resolve();
          } else {
            reject(PresetStore.checkDuplicateNameError(err));
          }
        }
      );
    });
  }

  /**
   * Removes a Preset from the database
   *
   * @param {Preset} preset
   * @return {bluebird}
   */
  removePreset(preset) {
    return new Promise((resolve, reject) => {
      this.db.run(`
DELETE FROM presets
WHERE id = $id
`,
        {
          $id: preset.id,
        },
        (err) => {
          if (err === null) {
            resolve();
          } else {
            reject(err);
          }
        }
      );
    });
  }

  /**
   * Returns a list of all presets as {id, name} objects.
   *
   * @return {bluebird}
   */
  listAllPresets() {
    return new Promise((resolve, reject) => {
      this.db.all(`
SELECT id, name
FROM presets
ORDER BY name
      `, [], (err, rows) => {
        if (err !== null) {
          reject();
        } else {
          const answer = [];
          if (rows !== undefined) {
            for (const row of rows) {
              answer.push({
                id: row.id,
                name: row.name,
              });
            }
          }
          resolve(answer);
        }
      });
    });
  }

  /**
   * Checks an error to see if it was caused by a duplicate name and translates it
   * @param err
   */
  static checkDuplicateNameError(err) {
    if (err.errno === 19) {
      return new DuplicateIdentifierError('A preset with the selected name already exists');
    }
    return err;
  }
}
