import React from 'react';

export default class Station extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpenTerminalLog = this.handleOpenTerminalLog.bind(this);
    this.handleInfoButton = this.handleInfoButton.bind(this);
    this.handleAppMenuClick = this.handleAppMenuClick.bind(this)
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
    ev.stopPropagation();
    ev.preventDefault();

    const selectedAppID = $(ev.target).attr('data-value');
    if (selectedAppID !== undefined) {
      if (this.props.onAppChange) {
        this.props.onAppChange(this.props.station, selectedAppID);
      }
    }
  }

  handleClick() {
    this.props.onClickStation(this.props.station.id);
  }

  handleOpenTerminalLog(ev) {
    this.props.onOpenTerminalLog(this.props.station.id);
    ev.preventDefault();
    ev.stopPropagation();
  }

  handleInfoButton(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  render() {
    const stationClasses = [
      'station',
      `station-state-${this.props.station.state}`,
      `station-profile-${this.props.station.profile}`,
    ];

    if (this.props.selected) {
      stationClasses.push('station-selected');
    }

    let lock = null;
    if (this.props.station.locked) {
      stationClasses.push('station-locked');
      lock = <div className="station-lock"><i className="fa fa-lock" /></div>;
    }

    let appName = this.props.station.app;
    let appDesc = '';
    if (this.props.applications[this.props.station.app] !== undefined) {
      appName = this.props.applications[this.props.station.app].name;
      appDesc = this.props.applications[this.props.station.app].description;
    }

    let profileName = '';
    let profileDesc = '';
    if (this.props.stationProfiles[this.props.station.profile] !== undefined) {
      profileName = this.props.stationProfiles[this.props.station.profile].name;
      profileDesc = this.props.stationProfiles[this.props.station.profile].description;
    }

    const appOptions = [];
    for (const appID of this.props.station.compatible_apps) {
      appOptions.push(<li key={appID}><a href="#" data-value={appID}>{this.props.applications[appID].name}</a></li>);
    }

    return (
      <div
        id={this.props.station.id}
        className={stationClasses.join(' ')}
        onClick={this.handleClick}
        ref={this.onElementRef}
      >
        <div className="station-state-light"></div>
        <div className="station-icon">
          <img alt={this.props.station.app} src={this.props.station.icon} />
        </div>
        <div className="station-name">{this.props.station.name}</div>
        <div className="station-profile" title={profileDesc}>{profileName}</div>
        <div className="station-app dropdown">
          <button type="button" data-toggle="dropdown" onClick={this.handleAppMenuClick}>
            {appName} <span className="caret" />
          </button>
          <ul className="dropdown-menu" onClick={this.handleAppMenuClick}>{ appOptions }</ul>
        </div>
        <div className="station-status">{this.props.station.status}</div>
        { lock }
        <a className="station-info-button" onClick={this.handleInfoButton} data-toggle="popover" tabIndex="1" data-trigger="focus" title={this.props.station.id} data-content={this.props.station.description}>
          <i className="fa fa-info-circle" />
        </a>
        <a className="station-output-button" onClick={(ev) => { this.handleOpenTerminalLog(ev); }}>
          <i className="fa fa-desktop"></i>
        </a>
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
};
