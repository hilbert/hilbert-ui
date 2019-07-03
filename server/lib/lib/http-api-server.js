const LongPollHandler = require('./long-poll-handler');
const PresetsModule = require('./presets/presets-module');
const TestControllerModule = require('./test-backend/test-controller-module');

const EventEmitter = require('events').EventEmitter;
const Promise = require('bluebird');
const iconmap = require('../../iconmap.json');
const express = require('express');
const validate = require('express-validation');
const Joi = require('joi');
const bodyParser = require('body-parser');

class HttpAPIServer {

  constructor(stationManager, nconf, logger) {
    this.stationManager = stationManager;
    this.nconf = nconf;
    this.logger = logger;

    this.server = express();
    this.server.use(bodyParser.json());

    this.events = new EventEmitter();

    this.notifications = [];

    this.apiModules = [
      new PresetsModule(this),
      new TestControllerModule(this),
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
      this.stationManager.events.on('notification', this.onNotification.bind(this));
    });
  }

  /**
   * Sets up HTTP server routes / API entry points
   */
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
    router.get('/applications', this.getApplications.bind(this));
    router.get('/station_profiles', this.getStationProfiles.bind(this));
    router.get('/stations', this.getStations.bind(this));
    router.post('/stations/start', validate(HttpAPIServer.postStationsStartSchema()), this.postStationsStart.bind(this));
    router.post('/stations/stop', validate(HttpAPIServer.postStationsStopSchema()), this.postStationsStop.bind(this));
    router.post('/stations/restart', validate(HttpAPIServer.postStationsRestartSchema()), this.postStationsRestart.bind(this));
    router.post('/stations/restartapp', validate(HttpAPIServer.postStationsRestartappSchema()), this.postStationsRestartapp.bind(this));
    router.post('/stations/change_app', validate(HttpAPIServer.postStationsChangeAppSchema()), this.postStationsChangeApp.bind(this));
    router.get('/station/:id/output', validate(HttpAPIServer.getStationOutputSchema()), this.getStationOutput.bind(this));
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

  /**
   * Event handler for notifications from the StationManager
   *
   * Notifications are added to a list associated with the long polling updateID in order to
   * only send new notifications to users. The list is truncated to max_notifications.
   *
   * @param {object} notification
   */
  onNotification(notification) {
    notification.updateID = this.stationsLongPoll.getNextUpdateID();
    this.notifications.push(notification);
    const maxNotifications = this.nconf.get('max_notifications');
    if (this.notifications.length > maxNotifications) {
      this.notifications = this.notifications.slice(this.notifications.length - maxNotifications);
    }
  }

  /**
   * Return stored notifications
   *
   * Each notification is an object with the following structure:
   *  - id {string} : Unique id of the entry
   *  - updateID {number} : Long polling update ID after which the notification was generated
   *  - time {string} : Timestamp in ISO format
   *  - type {string} : info | warning | error
   *  - message {string} : Event description
   *
   * @param {number} lastUpdateID
   *  Last seen update. Only notifications created after this updateID are sent.
   * @returns {Array}
   */
  getLatestNotifications(lastUpdateID = 0) {
    return this.notifications.filter(n => n.updateID > lastUpdateID);
  }

  /**
   * GET /applications handler
   * @param req
   * @param res
   */
  getApplications(req, res) {
    const applications = Array.from(this.stationManager.getApplications())
      .map(a => a.toJSON())
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    res.json({
      applications,
    });
  }

  /**
   * GET /station_profiles handler
   * @param req
   * @param res
   */
  getStationProfiles(req, res) {
    const stationProfiles = Array.from(this.stationManager.getStationProfiles())
      .map(a => a.toJSON())
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    res.json({
      stationProfiles,
    });
  }

  /**
   * GET /stations handler
   * @param req
   * @param res
   */
  getStations(req, res) {
    this.stationsLongPoll.handleRequest(req)
      .then((updateID) => {
        const stations = this.stationManager.getStations().map(s => s.toJSON());
        for (const station of stations) {
          station.icon = HttpAPIServer.getIconURL(station.app);
        }
        const lastUpdateID = parseInt(req.query.lastUpdateID, 10) || 0;
        res.json({
          updateID,
          stations,
          notifications: lastUpdateID !== 0 ? this.getLatestNotifications(lastUpdateID) : [],
        });
      })
      .catch(() => {
        res.json({});
      });
  }

  /**
   * POST /stations/start handler
   * @param req
   * @param res
   */
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

  /**
   * POST /stations/stop handler
   * @param req
   * @param res
   */
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

  /**
   * POST /stations/restart handler
   * @param req
   * @param res
   */
  postStationsRestart(req, res) {
    if (!req.body.ids) {
      this.logger.debug("HTTP request received: Restart stations missing required 'ids' argument");
      res.status(400).send("Missing 'ids' argument");
      return;
    }
    this.logger.debug(`HTTP request received: Restart stations ${req.body.ids}`);
    this.stationManager.restartStations(req.body.ids);
    res.json({});
  }

  /**
   * POST /stations/restartapp handler
   * @param req
   * @param res
   */
  postStationsRestartapp(req, res) {
    if (!req.body.ids) {
      this.logger.debug("HTTP request received: Restart station apps missing required 'ids' argument");
      res.status(400).send("Missing 'ids' argument");
      return;
    }
    this.logger.debug(`HTTP request received: Restart station apps ${req.body.ids}`);
    this.stationManager.restartStationApps(req.body.ids);
    res.json({});
  }

  /**
   * POST /stations/change_app handler
   * @param req
   * @param res
   */
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

  /**
   * GET /station/:id/output handler
   * @param req
   * @param res
   */
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

  /**
   * GET /server/output handler
   * @param req
   * @param res
   */
  getServerOutput(req, res) {
    this.logger.debug('HTTP request received: Get global output');
    res.json({
      lines: this.stationManager.globalHilbertCLIOutputBuffer.getAll(),
    });
  }

  /**
   * GET /server/mklivestatus handler
   * @param req
   * @param res
   */
  getServerMKLivestatus(req, res) {
    this.logger.debug('HTTP request received: Get last MKLivestatus state');
    res.json({
      lastCheck: this.stationManager.lastMKLivestatusDumpTime,
      lastState: this.stationManager.lastMKLivestatusDump,
    });
  }

  /**
   * GET /notifications handler
   * @param req
   * @param res
   */
  getNotifications(req, res) {
    this.logger.debug('HTTP request received: Get notifications');
    res.json({
      notifications: this.getLatestNotifications(),
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

  static postStationsStartSchema() {
    return {
      body: {
        ids: Joi.array().items(Joi.string()).required(),
      },
    };
  }

  static postStationsStopSchema() {
    return {
      body: {
        ids: Joi.array().items(Joi.string()).required(),
      },
    };
  }

  static postStationsRestartSchema() {
    return {
      body: {
        ids: Joi.array().items(Joi.string()).required(),
      },
    };
  }

  static postStationsRestartappSchema() {
    return {
      body: {
        ids: Joi.array().items(Joi.string()).required(),
      },
    };
  }

  static postStationsChangeAppSchema() {
    return {
      body: {
        ids: Joi.array().items(Joi.string()).required(),
      },
      app: Joi.string().required(),
    };
  }

  static getStationOutputSchema() {
    return {
      params: {
        id: Joi.string().required(),
      },
    };
  }
}

module.exports = HttpAPIServer;
