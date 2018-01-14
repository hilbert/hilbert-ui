import LongPollHandler from './long-poll-handler';
import PresetsModule from './presets/presets-module';

const EventEmitter = require('events').EventEmitter;
const Promise = require('bluebird');
const iconmap = require('../../iconmap.json');
const express = require('express');
const bodyParser = require('body-parser');

export default class HttpAPIServer {

  constructor(stationManager, nconf, logger) {
    this.stationManager = stationManager;
    this.nconf = nconf;
    this.logger = logger;

    this.server = express();
    this.server.use(bodyParser.json());

    this.events = new EventEmitter();

    this.apiModules = [
      new PresetsModule(this),
    ];
  }

  /**
   * Initializes the server and its modules
   *
   * @return {Promise.<*>}
   */
  init() {
    const initializers = [];
    for (const apiModule of this.apiModules) {
      initializers.push(apiModule.init());
    }

    return Promise.all(initializers).then(() => {
      this.setupRoutes();
    });
  }

  setupRoutes() {
    // getStations long poll handler
    this.stationsLongPoll = new LongPollHandler(this.nconf.get('long_poll_timeout'));
    this.stationManager.events.on('stationUpdate', () => {
      this.stationsLongPoll.signalUpdate();
    });
    this.stationsLongPoll.events.on('wait', () => {
      this.events.emit('longPollWait');
    });
    this.stationsLongPoll.events.on('timeout', () => {
      this.events.emit('longPollTimeout');
    });

    const router = express.Router(); // eslint-disable-line new-cap
    router.get('/stations', this.getStations.bind(this));
    router.post('/stations/start', this.postStationsStart.bind(this));
    router.post('/stations/stop', this.postStationsStop.bind(this));
    router.post('/stations/change_app', this.postStationsChangeApp.bind(this));
    router.get('/station/:id/output', this.getStationOutput.bind(this));
    router.get('/server/output', this.getServerOutput.bind(this));
    router.get('/server/mklivestatus', this.getServerMKLivestatus.bind(this));
    router.get('/notifications', this.getNotifications.bind(this));

    this.server.use(router);

    for (const apiModule of this.apiModules) {
      const moduleRouter = express.Router(); // eslint-disable-line new-cap
      apiModule.setupRoutes(moduleRouter);
      this.server.use(moduleRouter);
    }
  }

  getStations(req, res) {
    this.stationsLongPoll.handleRequest(req, res)
      .then((updateID) => {
        const stations = this.stationManager.getStations();
        for (const station of stations) {
          station.icon = HttpAPIServer.getIconURL(station.app);
        }
        res.json({
          updateID,
          stations,
        });
      })
      .catch(() => {
        res.json({});
      });
  }

  postStationsStart(req, res) {
    if (!req.body.ids) {
      this.logger.debug("HTTP request received: Start stations missing required 'ids' argument");
      res.status(400).send("Missing 'ids' argument");
      return;
    }
    this.logger.debug(`HTTP request received: Start stations ${req.body.ids}`);
    this.stationManager.startStations(req.body.ids);
    res.json({});
  }

  postStationsStop(req, res) {
    if (!req.body.ids) {
      this.logger.debug("HTTP request received: Stop stations missing required 'ids' argument");
      res.status(400).send("Missing 'ids' argument");
      return;
    }
    this.logger.debug(`HTTP request received: Stop stations ${req.body.ids}`);
    this.stationManager.stopStations(req.body.ids);
    res.json({});
  }

  postStationsChangeApp(req, res) {
    if (!req.body.ids) {
      this.logger.debug("HTTP request received: Change app missing required 'ids' argument");
      res.status(400).send("Missing 'ids' argument");
      return;
    }
    if (!req.body.app) {
      this.logger.debug("HTTP request received: Change app missing required 'app' argument");
      res.status(400).send("Missing 'app' argument");
      return;
    }
    this.logger.debug(
      `HTTP request received: Change app of stations ${req.body.ids} to ${req.body.app}`);
    this.stationManager.changeApp(req.body.ids, req.body.app);
    res.json({});
  }

  getStationOutput(req, res) {
    this.logger.debug(`HTTP request received: Get output of station ${req.params.id}`);
    const station = this.stationManager.getStationByID(req.params.id);
    if (station) {
      res.json({
        lines: station.outputBuffer.getAll(),
      });
    } else {
      this.logger.error(`Requested output of non existant station ${req.params.id}`);
      res.status(404).send('Station not found');
    }
  }

  getServerOutput(req, res) {
    this.logger.debug('HTTP request received: Get global output');
    res.json({
      lines: this.stationManager.globalHilbertCLIOutputBuffer.getAll(),
    });
  }

  getServerMKLivestatus(req, res) {
    this.logger.debug('HTTP request received: Get last MKLivestatus state');
    res.json({
      lastState: this.stationManager.lastMKLivestatusDump,
    });
  }

  getNotifications(req, res) {
    this.logger.debug('HTTP request received: Get notifications');
    res.json({
      notifications: this.stationManager.getLog(),
    });
  }

  getServer() {
    return this.server;
  }

  /**
   * Return the URL of the icon of the specified app
   *
   * @param {string} appID - ID of the app
   * @returns {string} - URL of the icon
   */
  static getIconURL(appID) {
    if (iconmap[appID] !== undefined) {
      return `icons/${iconmap[appID]}`;
    }
    return 'icons/none.png';
  }

  /**
   * Start listening for requests on a port
   *
   * @param port
   */
  listen(port) {
    this.server.listen(port);
    this.logger.info(`Server listening on port ${port}.`);
  }
}
