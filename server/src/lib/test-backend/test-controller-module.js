import HttpAPIServer from "../http-api-server";

const validate = require('express-validation');
const Joi = require('joi');
/**
 * Module that allows the client to set parameters for the test backend
 */
export default class TestControllerModule {
  constructor(httpApiServer) {
    this.httpApiServer = httpApiServer;
    this.stationManager = this.httpApiServer.stationManager;
    this.logger = this.httpApiServer.logger;
    this.nconf = this.httpApiServer.nconf;
  }

  init() {
    this.logger.info('Initializing Test Controller module');
    return true;
  }

  setupRoutes(router) {
    router.get('/test-backend/flags', this.getTestFlags.bind(this));
    router.post('/test-backend/flags', validate(TestControllerModule.setTestFlagsSchema()), this.setTestFlags.bind(this));
    router.post('/test-backend/stations/unreachable', validate(TestControllerModule.stationIDListSchema()), this.makeStationsUnreachable.bind(this));
    router.post('/test-backend/stations/reachable', validate(TestControllerModule.stationIDListSchema()), this.makeStationsReachable.bind(this));
    router.post('/test-backend/stations/stop-unexpectedly', validate(TestControllerModule.stationIDListSchema()), this.stopStationsUnexpectedly.bind(this));
  }

  getTestFlags(req, res) {
    const flags = {};
    TestControllerModule.FlagNames.forEach((name) => {
      flags[name] = (this.nconf.get(`test-backend:${name}`) || false);
    });
    res.json({
      testMode: this.nconf.get('test'),
      flags,
    });
  }

  setTestFlags(req, res) {
    TestControllerModule.FlagNames.forEach((name) => {
      if (req.body[name] !== undefined) {
        this.nconf.set(`test-backend:${name}`, (req.body[name] === true));
      }
    });

    return this.getTestFlags(req, res);
  }

  makeStationsUnreachable(req, res) {
    const unreachable = new Set(this.nconf.get('test-backend:unreachable') || []);
    req.body.ids.forEach(a => unreachable.add(a));
    const aUnreachable = Array.from(unreachable);
    this.nconf.set('test-backend:unreachable', aUnreachable);
    res.json({ ids: aUnreachable });
  }

  makeStationsReachable(req, res) {
    const unreachable = new Set(this.nconf.get('test-backend:unreachable') || []);
    req.body.ids.forEach(a => unreachable.delete(a));
    const aUnreachable = Array.from(unreachable);
    this.nconf.set('test-backend:unreachable', aUnreachable);
    res.json({ ids: aUnreachable });
  }

  stopStationsUnexpectedly(req, res) {
    this.nconf.set('test-backend:stop-unexpectedly', req.body.ids);
    res.json({});
  }

  static setTestFlagsSchema() {
    const schema = {
      body: {},
    };

    TestControllerModule.FlagNames.forEach((name) => {
      schema.body[name] = Joi.boolean();
    });

    return schema;
  }

  static stationIDListSchema() {
    return {
      body: {
        ids: Joi.array().items(Joi.string()).required(),
      },
    };
  }
}

TestControllerModule.FlagNames = [
  'sim-fail-cli',
  'sim-timeout',
  'sim-unexpected-off',
];
