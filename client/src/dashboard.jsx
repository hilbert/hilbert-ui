/* eslint-disable import/extensions,no-console,react/no-unused-prop-types */
/* globals bootbox */
import React from 'react';
import Station from './station.jsx';
import ButtonFilter from './buttonFilter.jsx';
import LogViewer from './logViewer.jsx';
import ConsoleViewer from './consoleViewer.jsx';
import PresetsBlock from './presetsBlock.jsx';
import Header from './header.jsx';
import UIAPI from './uiAPI';
import TestMenu from './testMenu';
import NotificationManager from './notificationManager';
import ViewMenu from './viewMenu';
import TextFilter from './textFilter';

export default class Dashboard extends React.Component {
  static displayState(state) {
    if (state === 'starting_station'
      || state === 'restarting'
      || state === 'starting_app'
      || state === 'restarting_app'
      || state === 'stopping'
      || state === 'switching_app') {
      return 'busy';
    }

    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      selection: new Set(),
      nameFilterText: '',
      visibleProfile: '',
      visibleState: '',
      sortCriteria: 'default',
      log: [],
      serverConnectionError: false,
      presets: [],
      consoleViewerTitle: 'Terminal output',
    };
    this.selectToggle = this.selectToggle.bind(this);
    this.changeAppSelected = this.changeAppSelected.bind(this);
    this.showTerminalLog = this.showTerminalLog.bind(this);
    this.showGlobalLog = this.showGlobalLog.bind(this);
    this.showNotificationLog = this.showNotificationLog.bind(this);
    this.changeAppSelectedDialog = this.changeAppSelectedDialog.bind(this);
    this.stationAppChanged = this.stationAppChanged.bind(this);
    this.sortCriteriaChanged = this.sortCriteriaChanged.bind(this);
    this.handleStationQuickStart = this.handleStationQuickStart.bind(this);
    this.handleStationQuickStop = this.handleStationQuickStop.bind(this);
    this.handleStationQuickRestart = this.handleStationQuickRestart.bind(this);
    this.handleStationQuickApprestart = this.handleStationQuickApprestart.bind(this);
    this.handleNameFilterTextChange = this.handleNameFilterTextChange.bind(this);
    this.commands = {};
    this.initCommands();
    this.getCommand = this.getCommand.bind(this);
    this.logViewer = null;
    this.consoleViewer = null;
    this.updateID = 0;
    this.serverConnectionRetry = 0;
    this.notificationManager = new NotificationManager();
  }

  componentDidMount() {
    this.pollLoop();
    this.fetchPresets();
  }

  getStation(stationID) {
    const {
      stations,
    } = this.state;

    return stations.find(item => item.id === stationID) || null;
  }

  getCommand(commandName) {
    if (this.commands[commandName] !== undefined) {
      return this.commands[commandName].doCallback;
    }
    throw Error(`Call to invalid command ${commandName}`);
  }

  getVisibleStations() {
    const {
      stations, visibleProfile, visibleState, nameFilterText
    } = this.state;

    return stations.filter(station => (visibleProfile === '' || station.profile === visibleProfile)
      && (visibleState === '' || Dashboard.displayState(station.state) === visibleState)
      && (nameFilterText.trim().length === 0 || station.name.toLowerCase().includes(nameFilterText.toLowerCase())));
  }

  getSortFieldAccessor(id) {
    const {
      applications, stationProfiles,
    } = this.props;
    const criteria = {
      name: s => s.name,
      app: (s => (applications[s.app] && applications[s.app].name) || ''),
      profile: (s => (stationProfiles[s.profile] && stationProfiles[s.profile].name) || ''),
    };

    return criteria[id];
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
      'stations-selected-restart': {
        callback: this.restartSelected.bind(this),
        title: 'restart the selected stations',
        confirm: true,
      },
      'stations-selected-restartapp': {
        callback: this.restartAppSelected.bind(this),
        title: 'restart the apps in the selected stations',
        confirm: true,
      },
      'stations-selected-changeapp-dialog': {
        callback: this.changeAppSelectedDialog.bind(this),
        title: 'change the application',
        confirm: false,
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

    Object.keys(this.commands).forEach((name) => {
      const command = this.commands[name];
      if (command.confirm) {
        this.commands[name].doCallback = this.attachConfirmation(
          `Are you sure you want to ${command.title}?`,
          command.callback
        );
      } else {
        this.commands[name].doCallback = command.callback;
      }
    });
  }

  selectAll() {
    const { stations } = this.state;
    this.setState({ selection: new Set(stations.map(s => s.id)) });
  }

  selectAllVisible() {
    this.setState({ selection: new Set(this.getVisibleStations().map(s => s.id)) });
  }

  deselectAll() {
    this.setState({ selection: new Set() });
  }

  selectToggle(id) {
    const { selection } = this.state;
    if (selection.has(id)) {
      selection.delete(id);
    } else {
      selection.add(id);
    }
    this.setState({ selection });
  }

  stopSelected() {
    const { api } = this.props;
    const { selection } = this.state;
    api.stopStations(Array.from(selection)).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  stopAll() {
    const { api } = this.props;
    const { stations } = this.state;
    api.stopStations(stations.map(s => s.id)).catch(
      err => console.error(err)
    );
  }

  startSelected() {
    const { api } = this.props;
    const { selection } = this.state;
    api.startStations(Array.from(selection)).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  startAll() {
    const { api } = this.props;
    const { stations } = this.state;
    api.startStations(stations.map(s => s.id)).catch(
      err => console.error(err)
    );
  }

  restartSelected() {
    const { api } = this.props;
    const { selection } = this.state;
    api.restartStations(Array.from(selection)).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  restartAppSelected() {
    const { api } = this.props;
    const { selection } = this.state;
    api.restartStationApps(Array.from(selection)).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  changeAppSelected(app) {
    const { api } = this.props;
    const { selection } = this.state;
    api.changeApp(Array.from(selection), app).catch(
      err => console.error(err)
    );
    this.deselectAll();
  }

  applicationsInCommon(selection) {
    const { applications } = this.props;
    const { stations } = this.state;

    return Object.values(applications).filter(app => stations.every(
      station => !selection.has(station.id) || station.compatible_apps.includes(app.id)
    ));
  }

  changeAppSelectedDialog() {
    const { api } = this.props;
    const { selection } = this.state;

    if (Array.from(selection).some(stationID => this.getStation(stationID).state !== 'on')) {
      bootbox.alert('All selected stations must be running to change the application.');
      return;
    }

    const availableApps = this.applicationsInCommon(selection).map(app => ({
      text: app.name,
      value: app.id,
    }));
    if (availableApps.length === 0) {
      bootbox.alert('No applications are compatible with all selected stations.');
      return;
    }

    let amount = '1 selected station';
    if (selection.size > 1) {
      amount = `${selection.size} selected stations`;
    }

    bootbox.prompt({
      title: `Change the application running in ${amount}.`,
      inputType: 'select',
      inputOptions: [{ text: 'Select an application...', value: '' }].concat(availableApps),
      callback: (result) => {
        if (result) {
          api.changeApp(Array.from(selection), result).catch(
            err => console.error(err)
          );
          this.deselectAll();
        }
      },
    });
  }

  stationAppChanged(station, appID) {
    const { applications, api } = this.props;

    if (station.app_id === appID) {
      bootbox.alert(`${applications[appID].name} is already running in this station.`);
      return;
    }

    bootbox.confirm(`Start <strong>${applications[appID].name}</strong> in station <strong>${station.name}</strong>?<br /><small>This will close the app currently running.</small>`,
      (result) => {
        if (result) {
          api.changeApp([station.id], appID).catch(
            err => console.error(err)
          );
        }
      });
  }

  handleStationQuickStart(station) {
    const { api } = this.props;
    bootbox.confirm(`Are you sure you want to start station <strong>${station.name}</strong> ?<br />`,
      (result) => {
        if (result) {
          api.startStations([station.id]).catch(
            err => console.error(err)
          );
        }
      });
  }

  handleStationQuickStop(station) {
    const { api } = this.props;
    bootbox.confirm(`Are you sure you want to stop station <strong>${station.name}</strong> ?<br />`,
      (result) => {
        if (result) {
          api.stopStations([station.id]).catch(
            err => console.error(err)
          );
        }
      });
  }

  handleStationQuickRestart(station) {
    const { api } = this.props;
    bootbox.confirm(`Are you sure you want to restart station <strong>${station.name}</strong> ?<br />`,
      (result) => {
        if (result) {
          api.restartStations([station.id]).catch(
            err => console.error(err)
          );
        }
      });
  }

  handleStationQuickApprestart(station) {
    const { applications, api } = this.props;
    bootbox.confirm(`Are you sure you want to restart <strong>${applications[station.app].name}</strong> in station <strong>${station.name}</strong> ?<br />`,
      (result) => {
        if (result) {
          api.restartStationApps([station.id]).catch(
            err => console.error(err)
          );
        }
      });
  }

  handleNameFilterTextChange(filterText) {
    this.setState({ nameFilterText: filterText });
  }

  showTerminalLog(stationID) {
    const { api } = this.props;

    if (this.consoleViewer !== null) {
      this.consoleViewer.openModal();
      api.getStationOutput(stationID)
        .then((lines) => {
          this.setState({
            consoleViewerTitle: `${stationID} output`,
            lines,
          });
        })
        .catch(err => console.error(err));
    }
  }

  showGlobalLog() {
    const { api } = this.props;

    if (this.consoleViewer !== null) {
      this.consoleViewer.openModal();
      api.getServerOutput()
        .then((lines) => {
          this.setState({
            consoleViewerTitle: 'Global output',
            lines,
          });
        })
        .catch(err => console.error(err));
    }
  }

  showNotificationLog() {
    const { api } = this.props;

    if (this.logViewer !== null) {
      this.logViewer.openModal();
      api.getNotifications()
        .then((notifications) => {
          this.setState({ log: notifications.reverse() });
        })
        .catch(err => console.error(err));
    }
  }

  createPreset() {
    const { api } = this.props;
    const { stations, selection } = this.state;
    const preset = {
      name: '',
      stationApps: {},
    };

    stations.forEach((station) => {
      preset.stationApps[station.id] = station.app;
    });

    bootbox.prompt({
      size: 'small',
      title: 'Enter a name for the preset',
      message: `The preset includes the ${selection.size} selected stations`,
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
          api.createPreset(preset)
            .then(() => this.fetchPresets())
            .catch((err) => {
              console.error(err);
            });
        }
      },
    });
  }

  activatePreset(presetID) {
    const { api } = this.props;

    api.activatePreset(presetID)
      .then(() => this.fetchPresets())
      .catch((err) => {
        console.error(err);
      });
  }

  deletePreset(presetID) {
    const { api } = this.props;

    api.deletePreset(presetID)
      .then(() => this.fetchPresets())
      .catch((err) => {
        console.error(err);
      });
  }

  updatePreset(presetID) {
    const { api } = this.props;
    const { stations } = this.state;

    const preset = {
      id: presetID,
      stationApps: {},
    };

    stations.forEach((station) => {
      preset.stationApps[station.id] = station.app;
    });

    api.updatePreset(preset)
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
      const { serverConnectionError } = this.state;
      this.pollServer().then(() => {
        setTimeout(loop, minPollTime);
        retryPollTime = minPollTime;
        if (serverConnectionError) {
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
    const { api } = this.props;

    return api.getStations(this.updateID)
      .then((data) => {
        if (data.stations !== undefined) {
          this.updateID = data.updateID;
          this.setState({ stations: data.stations });
        }
        if (data.notifications !== undefined) {
          data.notifications.forEach((notification) => {
            this.notificationManager.push(notification);
          });
        }
      });
  }

  fetchPresets() {
    const { api } = this.props;

    return api.getPresets()
      .then((presets) => {
        if (presets !== undefined) {
          this.setState({ presets });
        }
      })
      .catch(err => console.error(err));
  }

  sortCriteriaChanged(newCriteria) {
    this.setState({ sortCriteria: newCriteria });
  }

  render() {
    const { api, applications, stationProfiles, services } = this.props;
    const {
      serverConnectionError, sortCriteria, stations, visibleState, selection, presets, log,
      consoleViewerTitle, lines,
    } = this.state;
    const stationsMarkup = [];
    const filters = [];
    let messageBar = '';

    if (serverConnectionError) {
      messageBar = (
        <div className="message_bar">
          <div className="message_bar-message">
            <i className="fa fa-warning" />  No connection to server.
          </div>
        </div>
      );
    }

    let stationCount = 0;

    const visibleStations = this.getVisibleStations();
    if (sortCriteria !== 'default') {
      const sortFieldAccesor = this.getSortFieldAccessor(sortCriteria);
      visibleStations.sort((a, b) => {
        const fa = sortFieldAccesor(a);
        const fb = sortFieldAccesor(b);
        if (fa > fb) {
          return 1;
        }
        if (fa < fb) {
          return -1;
        }
        return 0;
      });
    }

    visibleStations.forEach((station) => {
      stationsMarkup.push(
        <div className="col-sm-6 col-lg-4" key={station.id}>
          <Station
            station={station}
            selected={selection.has(station.id)}
            applications={applications}
            stationProfiles={stationProfiles}
            services={services}
            onClickStation={this.selectToggle}
            onOpenTerminalLog={this.showTerminalLog}
            onAppChange={this.stationAppChanged}
            onQuickStart={this.handleStationQuickStart}
            onQuickStop={this.handleStationQuickStop}
            onQuickRestart={this.handleStationQuickRestart}
            onQuickApprestart={this.handleStationQuickApprestart}
          />
        </div>
      );

      stationCount += 1;
      // Responsive column resets
      if ((stationCount % 3) === 0) {
        stationsMarkup.push(<div key={`sep-lg-${stationCount}`} className="clearfix visible-lg-block" />);
      }
      if ((stationCount % 2) === 0) {
        stationsMarkup.push(<div key={`sep-sm-${stationCount}`} className="clearfix visible-sm-block visible-md-block" />);
      }
    });

    const counts = {};
    stations.forEach((station) => {
      if (!(Dashboard.displayState(station.state) in counts)) {
        counts[Dashboard.displayState(station.state)] = 0;
      }
      counts[Dashboard.displayState(station.state)] += 1;
    });

    const selectedCount = selection.size;
    const allSelected = (selectedCount === stations.length);
    const selectAllClasses = `btn btn-default btn-sm ${allSelected ? ' disabled' : ''}`;

    const deselectAllClasses = `btn btn-default btn-sm ${selectedCount === 0 ? ' disabled' : ''}`;

    const stationWord = selectedCount === 1 ? 'station' : 'stations';

    filters.push(
      <div key="selectedCount" className="filter-pane">
        <div className="selectActions">
          <a
            className={selectAllClasses}
            onClick={this.getCommand('stations-visible-select')}
          >
            Select all
          </a>&nbsp;
          <a
            className={deselectAllClasses}
            onClick={this.getCommand('stations-all-deselect')}
          >
              Deselect
          </a>&nbsp;
          <span className="selectActions-selected">
            {selection.size} {stationWord} selected
          </span>
        </div>
      </div>
    );

    filters.push(
      <div key="stationStateFilter" className="filter-pane filter-pane-state">
        <ButtonFilter
          options={Dashboard.StateOptions}
          counts={counts}
          allText="All"
          value={visibleState}
          onChange={(option) => {
            this.deselectAll();
            this.setState({ visibleState: option });
          }}
        />
      </div>
    );

    const noSelectionDisable = (selectedCount === 0 ? ' disabled' : '');
    const { nameFilterText } = this.state;

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
              >
                  System <span className="caret" />
              </a>
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
                <li role="separator" className="divider" />
                <li className={noSelectionDisable}>
                  <a href="#" onClick={selectedCount > 0 ? this.getCommand('stations-selected-start') : ''}>
                    Start selected stations
                  </a>
                </li>
                <li className={noSelectionDisable}>
                  <a href="#" onClick={selectedCount > 0 ? this.getCommand('stations-selected-stop') : ''}>
                    Stop selected stations
                  </a>
                </li>
                <li className={noSelectionDisable}>
                  <a href="#" onClick={selectedCount > 0 ? this.getCommand('stations-selected-restart') : ''}>
                    Restart selected stations
                  </a>
                </li>
                <li role="separator" className="divider" />
                <li className={noSelectionDisable}>
                  <a href="#" onClick={selectedCount > 0 ? this.getCommand('stations-selected-changeapp-dialog') : ''}>
                    Change the app of selected stations
                  </a>
                </li>
                <li className={noSelectionDisable}>
                  <a href="#" onClick={selectedCount > 0 ? this.getCommand('stations-selected-restartapp') : ''}>
                    Restart the app of selected stations
                  </a>
                </li>
              </ul>
            </li>
            <ViewMenu sortCriteria={sortCriteria} onSortCriteria={this.sortCriteriaChanged} />
            <TestMenu api={api} selection={selection} />
          </ul>
          <PresetsBlock
            presets={presets}
            stationsSelected={selectedCount > 0}
            onCreate={this.getCommand('preset-create')}
            onActivate={this.getCommand('preset-activate')}
            onDelete={this.getCommand('preset-delete')}
            onUpdate={this.getCommand('preset-update')}
            onRefresh={this.getCommand('preset-refresh')}
          />
          <TextFilter value={nameFilterText} onChange={this.handleNameFilterTextChange} />
        </Header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              {filters}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 pane-stations">
              <div id="dashboard">
                <div className="row">
                  {stationsMarkup}
                </div>
              </div>
            </div>
          </div>
        </div>
        <LogViewer log={log} ref={(c) => { this.logViewer = c; }} />
        <ConsoleViewer
          title={consoleViewerTitle}
          lines={lines}
          ref={(c) => { this.consoleViewer = c; }}
        />
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
  services: React.PropTypes.objectOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      url: React.PropTypes.string,
    })
  ),
};
