/**
 * Hilbert CLI http client
 *
 * A CLI program that connects to the Hilbert UI server via http and does things
 *
 */
const http = require('http');
const https = require('https');
const yargs = require('yargs');

/**
 * Makes an API call and returns the response
 *
 * @param server Server address
 *  An object with host and port attributes
 * @param endpoint
 *  The API endpoint to call
 * @param httpMethod
 *  HTTP Method to use for the call (GET, POST, etc.)
 * @param data
 *  Data to send as part of the request
 */
function callAPI(server, endpoint, httpMethod = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const params = {
      hostname: server.host,
      port: server.port,
      method: httpMethod,
      path: endpoint,
    };

    let jsonData = null;
    if (data !== null) {
      jsonData = JSON.stringify(data);
      params.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonData),
      };
    }

    const lib = server.host.startsWith('https') ? https : http;
    const req = lib.request(params,
      (res) => {
        if (res.statusCode < 200 || res.statusCode > 299) {
          reject(new Error(`Failed to call remote API, status code: ${res.statusCode}`));
        } else {
          const body = [];
          res.on('data', chunk => body.push(chunk));
          res.on('end', () => {
            res.setEncoding('utf8');
            resolve(JSON.parse(body.join('')));
          });
        }
      });

    req.on('error', err => reject(err));

    if (jsonData !== null) {
      req.write(jsonData);
    }
    req.end();
  });
}

/**
 * Prints a list of stations on the console
 *
 * @param server Server address
 *  An object with host and port attributes
 *
 * @return Promise
 */
function listCommand(server) {
  return callAPI(server, '/api/stations')
    .then((response) => {
      for (const station of response.stations) {
        console.log(station.id);
      }
    });
}

function startCommand(server, stations) {
  console.log(`Starting stations ${stations.join(', ')}`);
  return callAPI(server, '/api/stations/start', 'POST', {
    ids: stations,
  });
}

function startAllCommand(server) {
  console.log('Starting all stations');
  return callAPI(server, '/api/stations')
    .then(response => callAPI(server, '/api/stations/start', 'POST', {
      ids: response.stations.map((each) => each.id),
    })
  );
}

function stopCommand(server, stations) {
  console.log(`Stopping stations ${stations.join(', ')}`);
  return callAPI(server, '/api/stations/stop', 'POST', {
    ids: stations,
  });
}

function stopAllCommand(server) {
  console.log('Stopping all stations');
  return callAPI(server, '/api/stations')
    .then(response => callAPI(server, '/api/stations/stop', 'POST', {
      ids: response.stations.map((each) => each.id),
    })
  );
}

const argv = yargs
  .options({
    h: {
      alias: 'host',
      default: 'localhost',
      describe: 'Hilbert UI server hostname',
      type: 'string',
    },
    p: {
      alias: 'port',
      default: '8080',
      describe: 'Hilbert UI server port',
      type: 'number',
    },
  })
  .command('list', 'List stations')
  .command('start <stations..>', 'Start stations')
  .command('stop <stations..>', 'Stop stations')
  .command('startall', 'Start all stations')
  .command('stopall', 'Stop all stations')
  .demandCommand(1, 1, 'You must indicate a command to execute')
  .strict()
  .help()
  .wrap(72)
  .argv;

const server = {
  host: argv.host,
  port: argv.port,
};

let command;
switch (argv._[0]) {
  case 'list':
    command = () => listCommand(server);
    break;
  case 'start':
    command = () => startCommand(server, argv.stations);
    break;
  case 'stop':
    command = () => stopCommand(server, argv.stations);
    break;
  case 'startall':
    command = () => startAllCommand(server);
    break;
  case 'stopall':
    command = () => stopAllCommand(server);
    break;
  default:
    break;
}

command().catch(err => console.error(err));