const http = require('http');

const hostname = 'localhost';
const port = 8080;

function listStations() {
  http.request({
    hostname,
    port,
    method: 'GET',
    path: '/api/stations.json',
  },
  (res) => {
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      res.setEncoding('utf8');
      const response = JSON.parse(body);
      for (const station of response.stations) {
        console.log(station.id);
      }
    });
  }).end();
}

function startStation(stationID) {
  const postData = JSON.stringify({
    action: 'start',
    stationIDs: [stationID],
  });

  var req = http.request({
    hostname,
    port,
    method: 'POST',
    path: '/api/stations.json',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  },
  (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {

    });
  });

  req.write(postData)
  req.end();

  console.log(`Starting station ${stationID}`);
}

function stopStation(stationID) {

}

// listStations();
startStation('station_interactive_1');

// Interface
// listStations
//   - as list of IDs
//   - as table (id, name, app)
// startStations (<list of stations>)
//   - if all, confirm
//   - -y overrides confirmation
//   - --wait // waits until done (might not be possible *1)
// stopStations (<list of stations>)
//   - if all, confirm
//   - -y overrides confirmation
//   - --wait // waits until done (might not be possible *1)
// availableApps <station>
//   - prints list of applications for station
// changeApp <appID> <stations>
//   - Changes the app of stations to the indicated one
//   - --wait // waits until done (might not be possible *1)
//
// *1 - To wait it's necessary to poll the state of the stations but:
//      a - I would have to determine which stations CAN be started/stopped
//      b - They might never reach the desired state for reasons beyond my control
//
// I still need:
// - Richer responses on the back end (when it's not possible to start/stop/change a station)