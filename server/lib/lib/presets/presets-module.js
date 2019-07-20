const validate = require('express-validation');
const Joi = require('joi');

const Preset = require('./preset');
const PresetStore = require('./preset-store');
const DuplicateIdentifierError = require('./duplicate-identifier-error');

/**
 * Module that adds supports for Presets to the HTTP Api Server
 */
class PresetsModule {

  constructor(httpApiServer) {
    this.httpApiServer = httpApiServer;
    this.stationManager = this.httpApiServer.stationManager;
    this.logger = this.httpApiServer.logger;
    this.nconf = this.httpApiServer.nconf;
    this.presetStore = new PresetStore();
  }

  init() {
    this.logger.info('Initializing Presets module');
    return this.presetStore.open(this.nconf.get('db_path'));
  }

  setupRoutes(router) {
    router.get('/presets', this.getAllPresets.bind(this));
    router.post('/preset', validate(PresetsModule.addPresetSchema()), this.addPreset.bind(this));
    router.get('/preset/:id', validate(PresetsModule.getPresetSchema()), this.getPreset.bind(this));
    router.put('/preset/:id', validate(PresetsModule.updatePresetSchema()), this.updatePreset.bind(this));
    router.delete('/preset/:id', validate(PresetsModule.deletePresetSchema()), this.deletePreset.bind(this));
    router.post('/preset/:id/activate', validate(PresetsModule.activatePresetSchema()), this.activatePreset.bind(this));
  }

  getAllPresets(req, res) {
    this.presetStore.loadAllPresets().then(
      (allPresets) => {
        const jsonPresets = [];
        for (const preset of allPresets) {
          jsonPresets.push(preset.toJSON());
        }
        res.json({
          presets: jsonPresets,
        });
      }
    ).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  getPreset(req, res) {
    this.presetStore.loadPreset(req.params.id).then(
      (preset) => {
        if (preset === null) {
          res.status(404).send('Preset not found');
        } else {
          res.json(preset.toJSON());
        }
      }
    ).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  addPreset(req, res) {
    const newPreset = this.presetStore.createPreset(req.body);
    newPreset.save()
      .then((preset) => {
        res.json(preset.toJSON());
      })
      .catch((err) => {
        if (err instanceof DuplicateIdentifierError) {
          res.status(400).json({ error: err.message });
        } else {
          res.status(500).json({ error: err.message });
        }
      });
  }

  updatePreset(req, res) {
    this.presetStore.loadPreset(req.params.id).then(
      (preset) => {
        if (preset === null) {
          res.status(404).send('Preset not found');
        } else {
          if (req.body.name) {
            preset.name = req.body.name;
          }
          if (req.body.stationApps) {
            preset.stationApps = Object.assign({}, req.body.stationApps);
          }
          preset.save()
          .then(() => {
            res.json(preset.toJSON());
          })
          .catch((err) => {
            if (err instanceof DuplicateIdentifierError) {
              res.status(400).json({ error: err.message });
            } else {
              res.status(500).json({ error: err.message });
            }
          });
        }
      }
    ).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  deletePreset(req, res) {
    this.presetStore.loadPreset(req.params.id).then(
      (preset) => {
        if (preset === null) {
          res.status(404).send('Preset not found');
        } else {
          return preset.remove()
          .then(() => {
            res.status(200).send('');
          });
        }
        return Promise.resolve();
      }
    ).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  activatePreset(req, res) {
    this.presetStore.loadPreset(req.params.id).then(
      (preset) => {
        if (preset === null) {
          res.status(404).send('Preset not found');
        } else {
          for (const [stationID, appID] of Object.entries(preset.stationApps)) {
            if (appID.trim() !== '') {
              this.stationManager.changeApp([stationID], appID);
            }
          }
          res.status(200).send('');
        }
      }
    ).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  static presetIdParamSchema() {
    return {
      params: {
        id: Joi.number().min(1).max(Preset.MAX_ID).required(),
      },
    };
  }

  static getPresetSchema() {
    return PresetsModule.presetIdParamSchema();
  }

  static addPresetSchema() {
    return {
      body: {
        name: Joi.string().min(1).max(Preset.MAX_NAME_LEN).required(),
        stationApps: Joi.object().pattern(/./, Joi.string().allow('')),
      },
    };
  }

  static updatePresetSchema() {
    return Object.assign(PresetsModule.presetIdParamSchema(), {
      body: {
        name: Joi.string().min(1).max(Preset.MAX_NAME_LEN),
        stationApps: Joi.object().pattern(/./, Joi.string().allow('')),
      },
    });
  }

  static deletePresetSchema() {
    return PresetsModule.presetIdParamSchema();
  }

  static activatePresetSchema() {
    return PresetsModule.presetIdParamSchema();
  }
}

module.exports = PresetsModule;
