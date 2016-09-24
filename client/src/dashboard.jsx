import React from 'react';
import Station from './station.jsx';
import AppSelect from './appSelect.jsx';
import ButtonFilter from './buttonFilter.jsx';
import LogViewer from './logViewer.jsx';
import ConsoleViewer from './consoleViewer.jsx';

// const tmp_log_entries = require('./tmp_log.json').entries;

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      selection: new Set(),
      visibleType: '',
      visibleState: '',
      log: [],
      serverConnectionError: false,
    };
    this.selectToggle = this.selectToggle.bind(this);
    this.changeAppSelected = this.changeAppSelected.bind(this);
    this.showTerminalLog = this.showTerminalLog.bind(this);
    this.commands = {};
    this.initCommands();
    this.getCommand = this.getCommand.bind(this);
    this.logViewer = null;
    this.consoleViewer = null;
    this.updateID = 0;
    this.serverConnectionRetry = 0;
  }

  componentDidMount() {
    this.pollLoop();
  }

  getStationState(stationID) {
    for (const station of this.state.stations) {
      if (station.id === stationID) {
        return station;
      }
    }
    return null;
  }

  getStationTypes() {
    const types = new Set();
    for (const station of this.state.stations) {
      types.add(station.type);
    }

    return Array.from(types);
  }

  getCommand(commandName) {
    if (this.commands[commandName] !== undefined) {
      return this.commands[commandName].doCallback;
    }
    throw Error(`Call to invalid command ${commandName}`);
  }

  getVisibleStations() {
    const answer = [];

    for (const station of this.state.stations) {
      if ((this.state.visibleType === '' || station.type === this.state.visibleType) &&
          (this.state.visibleState === '' ||
           this.displayState(station.state) === this.state.visibleState)) {
        answer.push(station);
      }
    }

    return answer;
  }

  displayState(state) {
    if (state === 'starting_station' ||
      state === 'starting_app' ||
      state === 'stopping' ||
      state === 'switching_app') {
      return 'busy';
    }

    return state;
  }

  attachConfirmation(text, callback) {
    return (...args) => {
      bootbox.dialog({
        message: text,
        buttons: {
          warning: {
            label: 'Confirm',
            className: 'btn-warning',
            callback: callback.bind(this, ...args),
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default',
          },
        },
      });
    };
  }

  initCommands() {
    this.commands = {
      'stations-all-start': {
        callback: this.startAll.bind(this),
        title: 'start all stations',
        confirm: true,
      },
      'stations-all-stop': {
        callback: this.stopAll.bind(this),
        title: 'stop all stations',
        confirm: true,
      },
      'stations-all-select': {
        callback: this.selectAll.bind(this),
        title: 'select all stations',
        confirm: false,
      },
      'stations-all-deselect': {
        callback: this.deselectAll.bind(this),
        title: 'deselect all stations',
        confirm: false,
      },
      'stations-selected-start': {
        callback: this.startSelected.bind(this),
        title: 'start the selected stations',
        confirm: true,
      },
      'stations-selected-stop': {
        callback: this.stopSelected.bind(this),
        title: 'stop the selected stations',
        confirm: true,
      },
      'stations-visible-select': {
        callback: this.selectAllVisible.bind(this),
        title: 'select visible stations',
        confirm: false,
      },
    };

    for (const name of Object.keys(this.commands)) {
      const command = this.commands[name];
      if (command.confirm) {
        this.commands[name].doCallback = this.attachConfirmation(
          `Are you sure you want to ${command.title}?`,
          command.callback
        );
      } else {
        this.commands[name].doCallback = command.callback;
      }
    }
  }

  allStationIDs() {
    return this.stationIDs(this.state.stations);
  }

  stationIDs(stations) {
    const ids = new Set();

    for (const station of stations) {
      ids.add(station.id);
    }

    return ids;
  }

  selectAll() {
    this.setState({ selection: this.allStationIDs() });
  }

  selectAllVisible() {
    this.setState({ selection: this.stationIDs(this.getVisibleStations()) });
  }

  deselectAll() {
    this.setState({ selection: new Set() });
  }

  selectToggle(id) {
    if (this.state.selection.has(id)) {
      this.state.selection.delete(id);
    } else {
      this.state.selection.add(id);
    }
    this.setState({ selection: this.state.selection });
  }

  stopStations(stationIDs) {
    $.ajax({
      url: '/api/stations.json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify({
        action: 'stop',
        stationIDs: Array.from(stationIDs),
      }),
      dataType: 'json',
      cache: false,
      success: () => {},
      error: (xhr, status, err) => console.error(status, err.toString()),
    });
  }

  stopSelected() {
    this.stopStations(this.state.selection);
    this.deselectAll();
  }

  stopAll() {
    return this.stopStations(this.allStationIDs());
  }

  startStations(stationIDs) {
    $.ajax({
      url: '/api/stations.json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify({
        action: 'start',
        stationIDs: Array.from(stationIDs),
      }),
      dataType: 'json',
      cache: false,
      success: () => {},
      error: (xhr, status, err) => console.error(status, err.toString()),
    });
  }

  startSelected() {
    this.startStations(this.state.selection);
    this.deselectAll();
  }

  startAll() {
    return this.startStations(this.allStationIDs());
  }

  changeAppSelected(app) {
    $.ajax({
      url: '/api/stations.json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify({
        action: 'change_app',
        stationIDs: Array.from(this.state.selection),
        app,
      }),
      dataType: 'json',
      cache: false,
      success: () => {},
      error: (xhr, status, err) => console.error(status, err.toString()),
    });
    this.deselectAll();
  }

  showTerminalLog(stationID) {
    if (this.consoleViewer !== null) {
      this.consoleViewer.openModal();
      $.ajax({
        url: '/api/station_output.json',
        data: {
          stationID,
        },
        method: 'get',
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: (data) => {
          this.setState({
            title: stationID,
            lines: data.lines,
          });
        },
        error: (xhr, status, err) => console.error(status, err.toString()),
      });
    }
  }

  /**
   * Handle the server poll
   *
   * Implementation: Since the server uses long polling we use a very short
   * poll time (500ms). In case of errors contacting the server the poll time
   * increases with each error until a max poll time is reached.
   */
  pollLoop() {
    const minPollTime = 500;
    let retryPollTime = minPollTime;
    const retryIncreaseFactor = 2;
    const maxRetryPollTime = 4000;

    const loop = () => {
      this.pollServer().then(() => {
        setTimeout(loop, minPollTime);
        retryPollTime = minPollTime;
        if (this.state.serverConnectionError) {
          this.setState({ serverConnectionError: false });
        }
        this.serverConnectionRetry = 0;
      }).catch(() => {
        setTimeout(loop, retryPollTime);
        if (retryPollTime < maxRetryPollTime) {
          retryPollTime = retryPollTime * retryIncreaseFactor;
        }
        this.serverConnectionRetry++;
        if (this.serverConnectionRetry > 5) {
          this.setState({ serverConnectionError: true });
          // Reset the updateID so the next poll returns immediately
          // instead of being a long poll
          this.updateID = 0;
        }
      });
    };
    loop();
  }

  pollServer() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/api/poll.json',
        data: {
          lastSeen: this.updateID,
        },
        dataType: 'json',
        cache: false,
        timeout: 30000,
        success: (data) => {
          if (data.stations !== undefined) {
            this.updateID = data.updateID;
            this.setState({ stations: data.stations });
          }
          resolve();
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
          reject();
        },
      });
    });
  }

  render() {
    const stations = [];
    const actions = [];
    let messageBar = '';

    if (this.state.serverConnectionError) {
      messageBar = (<div className="message_bar">
        <div className="message_bar-message">
          <i className="fa fa-warning"></i>  No connection to server.
        </div>
      </div>);
    }

    this.getVisibleStations().forEach((station) => stations.push(
      <Station
        station={station}
        key={station.id}
        selected={this.state.selection.has(station.id)}
        onClickStation={this.selectToggle}
        onOpenTerminalLog={this.showTerminalLog}
      />
    ));

    const counts = {};
    this.state.stations.forEach((station) => {
      if (!counts.hasOwnProperty(this.displayState(station.state))) {
        counts[this.displayState(station.state)] = 0;
      }
      counts[this.displayState(station.state)]++;
    });

    const selectedCount = this.state.selection.size;
    const allSelected = (selectedCount === this.state.stations.length);
    const selectAllClasses =
      `btn btn-default ${allSelected ? ' disabled' : ''}`;

    const deselectAllClasses =
      `btn btn-default ${selectedCount === 0 ? ' disabled' : ''}`;

    const stationWord = selectedCount === 1 ? 'station' : 'stations';

    actions.push(
      <div key="stationStateFilter" className="action-pane">
        <ButtonFilter
          options={['on', 'off', 'busy', 'error']}
          counts={counts}
          allText="All states"
          value={this.state.visibleState}
          onChange={(option) => {
            this.deselectAll();
            this.setState({ visibleState: option });
          }}
        />
      </div>
    );

    actions.push(
      <div key="stationTypeFilter" className="action-pane">
        <ButtonFilter
          options={this.getStationTypes()}
          allText="All types"
          value={this.state.visibleType}
          onChange={(option) => {
            this.deselectAll();
            this.setState({ visibleType: option });
          }}
        />
      </div>
    );

    actions.push(
      <div key="selectedCount" className="action-pane">
        <div className="action-pane-separator" ></div>
        <b>{this.state.selection.size} {stationWord} selected</b>
        <div className="selectActions">
          <a
            className={deselectAllClasses}
            onClick={this.getCommand('stations-all-deselect')}
          >Deselect</a>&nbsp;
          <a
            className={selectAllClasses}
            onClick={this.getCommand('stations-visible-select')}
          >Select all</a>
        </div>
      </div>
    );

    const noSelectionDisable = (selectedCount === 0 ? ' disabled' : '');

    actions.push(
      <div key="startStopPanel" className={`action-pane${noSelectionDisable}`}>
        <div className="action-pane-separator" ></div>
        <a
          className={`btn btn-success${noSelectionDisable}`}
          onClick={this.getCommand('stations-selected-start')}
        ><i className="fa fa-play" />&nbsp;&nbsp;Start Selected</a>
        &nbsp;
        <a
          className={`btn btn-danger${noSelectionDisable}`}
          onClick={this.getCommand('stations-selected-stop')}
        ><i className="fa fa-stop" />&nbsp;&nbsp;Stop Selected</a>
      </div>
    );

    let selectedAreSameType = true;
    let lastType = null;
    for (const selectedID of this.state.selection) {
      if (lastType === null) {
        lastType = this.getStationState(selectedID).type;
      }
      if (this.getStationState(selectedID).type !== lastType) {
        selectedAreSameType = false;
        break;
      }
    }

    let allSelectedOn = true;
    for (const selectedID of this.state.selection) {
      if (this.getStationState(selectedID).state !== 'on') {
        allSelectedOn = false;
        break;
      }
    }

    const canChangeApp = (allSelectedOn && (selectedCount > 0) && selectedAreSameType);

    let applications = [];
    for (const station of this.state.stations) {
      if (this.state.selection.has(station.id)) {
        applications = station.possible_apps;
      }
    }

    actions.push(
      <div key="appSelect" className="action-pane">
        <div className="action-pane-separator" ></div>
        <AppSelect
          applications={canChangeApp ? applications : []}
          disabled={!canChangeApp}
          allowBlank
          onChange={this.attachConfirmation('Are you sure you want to change the application?',
            this.changeAppSelected)}
        />
      </div>
    );

    const noTerminalOutputDisable = (selectedCount !== 1 ? ' disabled' : '');

    actions.push(
      <div key="showLog" className="action-pane">
        <div className="action-pane-separator" ></div>
        <a
          className="btn btn-default"
          href="#"
          onClick={(ev) => {
            if (this.logViewer !== null) {
              this.logViewer.openModal();
              $.ajax({
                url: '/api/log.json',
                method: 'get',
                contentType: 'application/json',
                cache: false,
                success: (data) => {
                  this.setState({ log: data.entries.reverse() });
                },
                error: (xhr, status, err) => console.error(status, err.toString()),
              });
            }
            ev.preventDefault();
          }}
        >Show log</a>
        &nbsp;
        <a
          className={'btn btn-default'}
          href="#"
          onClick={(ev) => {
            if (this.consoleViewer !== null) {
              this.consoleViewer.openModal();
              $.ajax({
                url: '/api/station_output.json',
                data: {
                },
                method: 'get',
                dataType: 'json',
                contentType: 'application/json',
                cache: false,
                success: (data) => {
                  this.setState({
                    title: 'Global output',
                    lines: data.lines,
                  });
                },
                error: (xhr, status, err) => console.error(status, err.toString()),
              });
            }
            ev.preventDefault();
          }}
        ><i className="fa fa-desktop"></i> Global output</a>
      </div>
    );

    return (
      <div className={messageBar !== '' ? 'with-message_bar' : ''}>
        {messageBar}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 pane-stations">
              <div id="dashboard">
                <div id="stationList" className="panel-group">
                  {stations}
                </div>
              </div>
            </div>
            <div className="col-sm-6 pane-actions">
              <div id="dashboardActions">
                {actions}
              </div>
            </div>
          </div>
        </div>
        <LogViewer log={this.state.log} ref={(c) => { this.logViewer = c; }} />
        <ConsoleViewer lines={this.state.lines} ref={(c) => { this.consoleViewer = c; }} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  url: React.PropTypes.string.isRequired,
};
