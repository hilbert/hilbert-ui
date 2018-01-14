import PresetStore from './preset-store';
import DuplicateIdentifierError from './duplicate-identifier-error';
/**
 * Module that adds supports for Presets to the HTTP Api Server
 */
export default class PresetsModule {

  constructor(httpApiServer) {
    this.httpApiServer = httpApiServer;
    this.logger = this.httpApiServer.logger;
    this.nconf = this.httpApiServer.nconf;
    this.presetStore = new PresetStore();
  }

  init() {
    this.logger.info('Initializing Presets module');
    return this.presetStore.open(this.nconf.get('db_path'));
  }

  setupRoutes(router) {
    router.get('/presets', this.listPresets.bind(this));
    router.post('/preset', this.addPreset.bind(this));
    router.get('/preset/:id', this.getPreset.bind(this));
    router.put('/preset/:id', this.updatePreset.bind(this));
    router.delete('/preset/:id', this.deletePreset.bind(this));
  }

  listPresets(req, res) {
    this.presetStore.listAllPresets().then(
      (allPresets) => {
        res.json({
          presets: allPresets,
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
          res.json({
            id: preset.id,
            name: preset.name,
            stationData: preset.stationData,
          });
        }
      }
    ).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  addPreset(req, res) {
    const newPreset = this.presetStore.createPreset();
    PresetsModule.fillPresetFromReq(newPreset, req);
    newPreset.save()
    .then((preset) => {
      res.json({
        id: preset.id,
        name: preset.name,
        stationData: preset.stationData,
      });
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
          PresetsModule.fillPresetFromReq(preset, req);
          preset.save()
          .then(() => {
            res.json({
              id: preset.id,
              name: preset.name,
              stationData: preset.stationData,
            });
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

// eslint-disable-next-line class-methods-use-this
  static fillPresetFromReq(preset, req) {
    if (req.body.name) {
      preset.name = req.body.name;
    }
    if (req.body.stationData) {
      preset.clearAllStationApps();
      for (const stationID of Object.keys(req.body.stationData)) {
        preset.setStationApp(stationID, req.body.stationData[stationID]);
      }
    }
    return preset;
  }
}
