const EventEmitter = require('events').EventEmitter;
const iconmap = require('../../iconmap.json');
const express = require('express');
const bodyParser = require('body-parser');

export default class HttpAPIServer {

  constructor(stationManager, logger) {
    this.stationManager = stationManager;
    this.logger = logger;
    this.server = express();
    this.server.use(bodyParser.json());

    this.setupRoutes();
  }

  setupRoutes() {
    // Longpoll begin
    const pollUpdateEmitter = new EventEmitter();
    pollUpdateEmitter.setMaxListeners(100);
    let updateID = 1;
    const pollTimeoutDelay = 15000;

    function stationDataResponse(stationManager) {
      const stations = stationManager.getStations();
      for (const station of stations) {
        station.icon = HttpAPIServer.getIconURL(station.app);
      }

      return {
        updateID,
        stations,
      };
    }

    this.server.get('/stations/poll', (req, res) => {
      // if the client is out of sync respond immediately
      if (Number(req.query.lastUpdateID) !== updateID) {
        res.json(stationDataResponse(this.stationManager));
      } else {
        // ... otherwise wait for an updateFromMKLivestatus to respond

        // On timeout send an empty updateFromMKLivestatus
        const pollTimeout = setTimeout(() => {
          pollUpdateEmitter.emit('updateFromMKLivestatus', {});
        }, pollTimeoutDelay);

        // If there was an updateFromMKLivestatus respond
        pollUpdateEmitter.once('updateFromMKLivestatus', (data) => {
          clearTimeout(pollTimeout);
          res.json(data);
        });
      }
    });

    this.stationManager.events.on('stationUpdate', () => {
      updateID++;
      pollUpdateEmitter.emit('updateFromMKLivestatus', stationDataResponse(this.stationManager));
    });

    // Longpoll end

    this.server.get('/stations', (req, res) => {
      res.json(stationDataResponse(this.stationManager));
    });

    this.server.post('/stations/start', (req, res) => {
      if (!req.body.ids) {
        this.logger.debug("HTTP request received: Start stations missing required 'ids' argument");
        res.status(400).send("Missing 'ids' argument");
        return;
      }
      this.logger.debug(`HTTP request received: Start stations ${req.body.ids}`);
      this.stationManager.startStations(req.body.ids);
      res.json({});
    });

    this.server.post('/stations/stop', (req, res) => {
      if (!req.body.ids) {
        this.logger.debug("HTTP request received: Stop stations missing required 'ids' argument");
        res.status(400).send("Missing 'ids' argument");
        return;
      }
      this.logger.debug(`HTTP request received: Stop stations ${req.body.ids}`);
      this.stationManager.stopStations(req.body.ids);
      res.json({});
    });

    this.server.post('/stations/change_app', (req, res) => {
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
    });

    this.server.get('/station/:id/output', (req, res) => {
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
    });

    this.server.get('/server/output', (req, res) => {
      this.logger.debug('HTTP request received: Get global output');
      res.json({
        lines: this.stationManager.globalHilbertCLIOutputBuffer.getAll(),
      });
    });

    this.server.get('/server/mklivestatus', (req, res) => {
      this.logger.debug('HTTP request received: Get last MKLivestatus state');
      res.json({
        lastState: this.stationManager.lastMKLivestatusDump,
      });
    });

    this.server.get('/notifications', (req, res) => {
      this.logger.debug('HTTP request received: Get notifications');
      res.json({
        notifications: this.stationManager.getLog(),
      });
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
