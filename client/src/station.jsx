import React from 'react';

export default class Station extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpenTerminalLog = this.handleOpenTerminalLog.bind(this);
    this.handleInfoButton = this.handleInfoButton.bind(this);
    this.handleAppMenuClick = this.handleAppMenuClick.bind(this);
    this.handleQuickmenuClick = this.handleQuickmenuClick.bind(this);
    this.onElementRef = this.onElementRef.bind(this);
    this.elementRef = null;
    this.infoButton = null;
  }

  componentDidMount() {
    this.infoButton = $(this.elementRef).find('.station-info-button');
    this.infoButton.popover({ placement: 'left' });
  }

  onElementRef(ref) {
    this.elementRef = ref;
  }

  handleAppMenuClick(ev) {
    const { onAppChange, station } = this.props;
    ev.stopPropagation();
    ev.preventDefault();

    const selectedAppID = $(ev.target).attr('data-value');
    if (selectedAppID !== undefined) {
      if (onAppChange) {
        onAppChange(station, selectedAppID);
      }
    }
  }

  handleQuickmenuClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    const {
      station,
      onQuickStart,
      onQuickStop,
      onQuickRestart,
      onQuickApprestart,
    } = this.props;

    if (!$(ev.target).parent().hasClass('disabled')) {
      const action = $(ev.target).attr('data-value');
      switch (action) {
        case 'start':
          if (onQuickStart) onQuickStart(station);
          break;
        case 'stop':
          if (onQuickStop) onQuickStop(station);
          break;
        case 'restart':
          if (onQuickRestart) onQuickRestart(station);
          break;
        case 'restartapp':
          if (onQuickApprestart) onQuickApprestart(station);
          break;
        default:
          break;
      }
    }
  }

  handleClick() {
    const { onClickStation, station } = this.props;
    onClickStation(station.id);
  }

  handleOpenTerminalLog(ev) {
    const { station, onOpenTerminalLog } = this.props;
    onOpenTerminalLog(station.id);
    ev.preventDefault();
    ev.stopPropagation();
  }

  handleInfoButton(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  render() {
    const {
      station, selected, applications, stationProfiles,
    } = this.props;
    const stationClasses = [
      'station',
      `station-state-${station.state}`,
      `station-profile-${station.profile}`,
    ];

    if (selected) {
      stationClasses.push('station-selected');
    }

    let lock = null;
    if (station.locked) {
      stationClasses.push('station-locked');
      lock = <div className="station-lock"><i className="fa fa-lock" /></div>;
    }

    let appName = station.app;
    if (applications[station.app] !== undefined) {
      appName = applications[station.app].name;
    }

    let profileName = '';
    let profileDesc = '';
    if (stationProfiles[station.profile] !== undefined) {
      profileName = stationProfiles[station.profile].name;
      profileDesc = stationProfiles[station.profile].description;
    }

    const appOptions = station.compatible_apps.map(appID => (
      <li key={appID}><a href="#" data-value={appID}>{applications[appID].name}</a></li>
    ));

    const quickmenuItems = [
      {
        name: 'Start station',
        state: 'off',
        action: 'start',
      },
      {
        name: 'Stop station',
        state: 'on',
        action: 'stop',
      },
      {
        name: 'Restart station',
        state: 'on',
        action: 'restart',
      },
      {
        type: 'divider',
      },
      {
        name: 'Restart app',
        state: 'on',
        action: 'restartapp',
      },
    ];

    let dividers = 0;
    const quickmenuOptions = quickmenuItems.map(item => {
      if (item.type === 'divider') {
        dividers += 1;
        return <li key={`divider-${dividers}`} className="divider" />;
      }
      return (
        <li
          key={`quick-${item.action}`}
          className={station.state !== item.state ? 'disabled' : ''}
        >
          <a href="#" data-value={item.action}>{item.name}</a>
        </li>
      );
    });

    const iconUrl = `icons/${station.app}.png`;

    return (
      <div
        id={station.id}
        className={stationClasses.join(' ')}
        onClick={this.handleClick}
        ref={this.onElementRef}
      >
        <div className="station-state-light" />
        <div className="station-icon">
          <img alt={station.app} src={iconUrl} />
        </div>
        <div className="station-name">{station.name}</div>
        <div className="station-profile" title={profileDesc}>{profileName}</div>
        <div className="station-app dropdown">
          <button type="button" data-toggle="dropdown" onClick={this.handleAppMenuClick}>
            {appName} <span className="caret" />
          </button>
          <ul className="dropdown-menu" onClick={this.handleAppMenuClick}>{ appOptions }</ul>
        </div>
        <div className="station-status">{station.status}</div>
        { lock }
        <a className="station-info-button" onClick={this.handleInfoButton} data-toggle="popover" tabIndex="0" data-trigger="focus" title={station.id} data-content={station.description}>
          <i className="fa fa-info-circle" />
        </a>
        <a className="station-output-button" onClick={(ev) => { this.handleOpenTerminalLog(ev); }}>
          <i className="fa fa-desktop" />
        </a>
        <div className="station-quickmenu dropdown">
          <a className="station-quickmenu-button" data-toggle="dropdown" onClick={this.handleQuickmenuClick}>
            <i className="fa fa-caret-down" />
          </a>
          <ul className="dropdown-menu dropdown-menu-right" onClick={this.handleQuickmenuClick}>
            { quickmenuOptions }
          </ul>
        </div>
      </div>
    );
  }
}

Station.propTypes = {
  station: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    state: React.PropTypes.string,
    profile: React.PropTypes.string,
    status: React.PropTypes.string,
    locked: React.PropTypes.bool,
    locked_seconds: React.PropTypes.number,
    app: React.PropTypes.string,
    compatible_apps: React.PropTypes.arrayOf(React.PropTypes.string),
    icon: React.PropTypes.string,
  }).isRequired,
  selected: React.PropTypes.bool,
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
  onClickStation: React.PropTypes.func,
  onOpenTerminalLog: React.PropTypes.func,
  onAppChange: React.PropTypes.func,
  onQuickStart: React.PropTypes.func,
  onQuickStop: React.PropTypes.func,
  onQuickRestart: React.PropTypes.func,
  onQuickApprestart: React.PropTypes.func,
};
