import React from 'react';
import Station from './station.jsx';
import AppSelect from './appSelect.jsx';
import ButtonFilter from './buttonFilter.jsx';
import LogViewer from './logViewer.jsx';

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
    };
    this.selectToggle = this.selectToggle.bind(this);
    this.changeAppSelected = this.changeAppSelected.bind(this);
    this.commands = {};
    this.initCommands();
    this.getCommand = this.getCommand.bind(this);
    this.logViewer = null;
    this.updateID = 0;
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
          (this.state.visibleState === '' || station.state === this.state.visibleState)) {
        answer.push(station);
      }
    }

    return answer;
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

  pollLoop() {
    const loop = () => {
      this.pollServer().then(() => {
        setTimeout(loop, 500);
      }).catch(() => {
        setTimeout(loop, 500);
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
            this.setState({stations: data.stations});
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

    this.getVisibleStations().forEach((station) => stations.push(
      <Station
        station={station}
        key={station.id}
        selected={this.state.selection.has(station.id)}
        onClickStation={this.selectToggle}
      />
    ));

    const counts = {};
    this.state.stations.forEach((station) => {
      if (!counts.hasOwnProperty(station.state)) {
        counts[station.state] = 0;
      }
      counts[station.state]++;
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
      </div>
    );

    return (
      <div>
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
      </div>
    );
  }
}

Dashboard.propTypes = {
  url: React.PropTypes.string.isRequired,
};
