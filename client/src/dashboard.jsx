/* eslint-disable import/extensions,no-console,react/no-unused-prop-types */
import React from 'react';
import Station from './station.jsx';
import AppSelect from './appSelect.jsx';
import ButtonFilter from './buttonFilter.jsx';
import LogViewer from './logViewer.jsx';
import ConsoleViewer from './consoleViewer.jsx';
import PresetsBlock from './presetsBlock.jsx';
import Header from './header.jsx';
import UIAPI from './uiAPI';
import TestMenu from "./testMenu";

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      selection: new Set(),
      visibleProfile: '',
      visibleState: '',
      log: [],
      serverConnectionError: false,
      presets: [],
    };
    this.selectToggle = this.selectToggle.bind(this);
    this.changeAppSelected = this.changeAppSelected.bind(this);
    this.showTerminalLog = this.showTerminalLog.bind(this);
    this.showGlobalLog = this.showGlobalLog.bind(this);
    this.showNotificationLog = this.showNotificationLog.bind(this);
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
    this.fetchPresets();
  }

  getStationState(stationID) {
    for (const station of this.state.stations) {
      if (station.id === stationID) {
        return station;
      }
    }
    return null;
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
      if ((this.state.visibleProfile === '' || station.profile === this.state.visibleProfile) &&
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
      'preset-create': {
        callback: this.createPreset.bind(this),
        title: 'create a preset',
        confirm: false,
      },
      'preset-activate': {
        callback: this.activatePreset.bind(this),
        title: 'activate a preset',
        confirm: true,
      },
      'preset-delete': {
        callback: this.deletePreset.bind(this),
        title: 'delete a preset',
        confirm: true,
      },
      'preset-update': {
        callback: this.updatePreset.bind(this),
        title: 'update a preset',
        confirm: true,
      },
      'preset-refresh': {
        callback: this.refreshPresets.bind(this),
        title: 'refresh presets',
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

  stopSelected() {
    this.props.api.stopStations(Array.from(this.state.selection)).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  stopAll() {
    this.props.api.stopStations(this.allStationIDs()).catch(
      err => console.error(err)
    );
  }

  startSelected() {
    this.props.api.startStations(Array.from(this.state.selection)).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  startAll() {
    this.props.api.startStations(this.allStationIDs()).catch(
      err => console.error(err)
    );
  }

  changeAppSelected(app) {
    this.props.api.changeApp(Array.from(this.state.selection), app).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  showTerminalLog(stationID) {
    if (this.consoleViewer !== null) {
      this.consoleViewer.openModal();
      this.props.api.getStationOutput(stationID)
        .then((lines) => {
          this.setState({
            title: stationID,
            lines,
          });
        })
        .catch(err => console.error(err));
    }
  }

  showGlobalLog() {
    if (this.consoleViewer !== null) {
      this.consoleViewer.openModal();
      this.props.api.getServerOutput()
        .then((lines) => {
          this.setState({
            title: 'Global output',
            lines,
          });
        })
        .catch(err => console.error(err));
    }
  }

  showNotificationLog() {
    if (this.logViewer !== null) {
      this.logViewer.openModal();
      this.props.api.getNotifications()
        .then((notifications) => {
          this.setState({ log: notifications.reverse() });
        })
        .catch(err => console.error(err));
    }
  }

  createPreset() {
    const preset = {
      name: '',
      stationApps: {},
    };

    for (const station of this.state.stations) {
      preset.stationApps[station.id] = station.app;
    }

    bootbox.prompt({
      size: 'small',
      title: 'Enter a name for the preset',
      message: `The preset includes the ${this.state.selection.length} selected stations`,
      buttons: {
        confirm: {
          label: 'Create',
          className: 'btn-success',
        },
        cancel: {
          label: 'Cancel',
          className: 'btn-default',
        },
      },
      callback: (result) => {
        if (result !== null) {
          preset.name = result.substr(0, 50);
          this.props.api.createPreset(preset)
            .then(() => this.fetchPresets())
            .catch((err) => {
              console.error(err);
            });
        }
      },
    });
  }

  activatePreset(presetID) {
    this.props.api.activatePreset(presetID)
      .then(() => this.fetchPresets())
      .catch((err) => {
        console.error(err);
      });
  }

  deletePreset(presetID) {
    this.props.api.deletePreset(presetID)
      .then(() => this.fetchPresets())
      .catch((err) => {
        console.error(err);
      });
  }

  updatePreset(presetID) {
    const preset = {
      id: presetID,
      stationApps: {},
    };

    for (const station of this.state.stations) {
      preset.stationApps[station.id] = station.app;
    }

    this.props.api.updatePreset(preset)
      .then(() => this.fetchPresets())
      .catch((err) => {
        console.error(err);
      });
  }

  refreshPresets() {
    this.fetchPresets();
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
          retryPollTime *= retryIncreaseFactor;
        }
        this.serverConnectionRetry += 1;
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
    return this.props.api.getStations(this.updateID)
      .then((data) => {
        if (data.stations !== undefined) {
          this.updateID = data.updateID;
          this.setState({ stations: data.stations });
        }
        if (data.notifications !== undefined) {
          this.showNotifications(data.notifications);
        }
      })
      .catch(err => console.error(err));
  }

  fetchPresets() {
    return this.props.api.getPresets()
      .then((presets) => {
        if (presets !== undefined) {
          this.setState({ presets });
        }
      })
      .catch(err => console.error(err));
  }

  showNotifications(notifications) {
    const types = {
      info: 'success',
      warning: 'warning',
      error: 'danger',
    };

    const icons = {
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-exclamation-circle',
    };

    for (const notification of notifications) {
      $.notify({
        title: notification.station_name,
        message: notification.message,
        icon: `fa ${icons[notification.type] || 'fa-info-circle'}`,
      }, {
        type: types[notification.type] || 'info',
        offset: { x: 10, y: $('.navbar').height() + 5 },
        delay: 15000,
      });
    }
  }

  render() {
    const stations = [];
    const actions = [];
    let messageBar = '';

    if (this.state.serverConnectionError) {
      messageBar = (<div className="message_bar">
        <div className="message_bar-message">
          <i className="fa fa-warning" />  No connection to server.
        </div>
      </div>);
    }

    this.getVisibleStations().forEach(station => stations.push(
      <Station
        station={station}
        key={station.id}
        selected={this.state.selection.has(station.id)}
        applications={this.props.applications}
        stationProfiles={this.props.stationProfiles}
        onClickStation={this.selectToggle}
        onOpenTerminalLog={this.showTerminalLog}
      />
    ));

    const counts = {};
    this.state.stations.forEach((station) => {
      if (!(this.displayState(station.state) in counts)) {
        counts[this.displayState(station.state)] = 0;
      }
      counts[this.displayState(station.state)] += 1;
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
          options={Dashboard.StateOptions}
          counts={counts}
          allText="All"
          value={this.state.visibleState}
          onChange={(option) => {
            this.deselectAll();
            this.setState({ visibleState: option });
          }}
        />
      </div>
    );

    const sortedProfiles = Object.values(this.props.stationProfiles).sort((a, b) => {
      if (a < b) return 1;
      else if (a > b) return -1;
      return 0;
    });

    actions.push(
      <div key="stationTypeFilter" className="action-pane">
        <ButtonFilter
          options={sortedProfiles}
          allText="All"
          value={this.state.visibleProfile}
          onChange={(option) => {
            this.deselectAll();
            this.setState({ visibleProfile: option });
          }}
        />
      </div>
    );

    actions.push(
      <div key="selectedCount" className="action-pane">
        <div className="action-pane-separator" />
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

    let allSelectedOn = true;
    for (const selectedID of this.state.selection) {
      if (this.getStationState(selectedID).state !== 'on') {
        allSelectedOn = false;
        break;
      }
    }

    const canChangeApp = (allSelectedOn && (selectedCount > 0));

    const applications = Object.values(this.props.applications).filter((app) => {
      for (const station of this.state.stations) {
        if (this.state.selection.has(station.id)) {
          if (!station.compatible_apps.includes(app.id)) {
            return false;
          }
        }
      }
      return true;
    });

    actions.push(
      <div key="appSelect" className="action-pane">
        <div className="action-pane-separator" />
        <AppSelect
          applications={canChangeApp ? applications : []}
          disabled={!canChangeApp}
          allowBlank
          onChange={this.attachConfirmation('Are you sure you want to change the application?',
            this.changeAppSelected)}
        />
      </div>
    );

    return (
      <div className={messageBar !== '' ? 'with-message_bar' : ''}>
        {messageBar}
        <Header
          onShowGlobalLog={this.showGlobalLog}
          onShowNotificationLog={this.showNotificationLog}
        >
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
              >System <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#" onClick={this.getCommand('stations-all-start')}>
                    Start all stations
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.getCommand('stations-all-stop')}>
                    Stop all stations
                  </a>
                </li>
                <li role="separator" className="divider"></li>
                <li className={noSelectionDisable}>
                  <a href="#" onClick={selectedCount > 0 ? this.getCommand('stations-selected-start') : ''}>
                    Start selected stations
                  </a>
                </li>
                <li className={noSelectionDisable} >
                  <a href="#" onClick={selectedCount > 0 ? this.getCommand('stations-selected-stop') : ''}>
                    Stop selected stations
                  </a>
                </li>
              </ul>
            </li>
            <TestMenu api={this.props.api} selection={this.state.selection} />
          </ul>
          <PresetsBlock
            presets={this.state.presets}
            stationsSelected={selectedCount > 0}
            onCreate={this.getCommand('preset-create')}
            onActivate={this.getCommand('preset-activate')}
            onDelete={this.getCommand('preset-delete')}
            onUpdate={this.getCommand('preset-update')}
            onRefresh={this.getCommand('preset-refresh')}
          />
        </Header>
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

Dashboard.StateOptions = [
  { id: 'on', name: 'On' },
  { id: 'off', name: 'Off' },
  { id: 'busy', name: 'Busy' },
  { id: 'error', name: 'Error' },
];

Dashboard.propTypes = {
  api: React.PropTypes.instanceOf(UIAPI),
  applications: React.PropTypes.objectOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      description: React.PropTypes.string,
    })
  ),
  stationProfiles: React.PropTypes.objectOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      description: React.PropTypes.string,
    })
  ),
};
