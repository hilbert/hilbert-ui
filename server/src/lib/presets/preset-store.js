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
   * @return {Promise}
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
   * @return {̦Promise}
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
   * @return {Promise}
   */
  createTables() {
    return new Promise((resolve, reject) => {
      this.db.run(`
CREATE TABLE IF NOT EXISTS presets 
(
  id integer PRIMARY KEY NOT NULL,
  name text UNIQUE, 
  stationData text
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
   * @return {Preset}
   */
  createPreset() {
    return new Preset(this);
  }

  /**
   * Loads a Preset object with a certain ID
   *
   * @param {String} id
   * @return {Promise}
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
              const answer = new Preset(this);
              answer.id = row.id;
              answer.name = row.name;
              answer.stationData = JSON.parse(row.stationData);
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
   * @return {Promise}
   */
  insertPreset(preset) {
    return new Promise((resolve, reject) => {
      this.db.run(`
INSERT INTO presets (name, stationData)
VALUES ($name, $stationData)
`,
        {
          $name: preset.name,
          $stationData: JSON.stringify(preset.stationData),
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
   * @return {Promise}
   */
  updatePreset(preset) {
    return new Promise((resolve, reject) => {
      this.db.run(`
UPDATE presets
SET name = $name, stationData = $stationData
WHERE id = $id
`,
        {
          $id: preset.id,
          $name: preset.name,
          $stationData: JSON.stringify(preset.stationData),
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
   * @return {Promise}
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
   * @return {Promise}
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