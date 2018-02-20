import React from 'react';

export default class Station extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpenTerminalLog = this.handleOpenTerminalLog.bind(this);
  }

  handleClick() {
    this.props.onClickStation(this.props.station.id);
  }

  handleOpenTerminalLog(ev) {
    this.props.onOpenTerminalLog(this.props.station.id);
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
      profileDesc= this.props.stationProfiles[this.props.station.profile].description;
    }

    return (
      <div
        id={this.props.station.id}
        className={stationClasses.join(' ')}
        onClick={this.handleClick}
      >
        <div className="station-state-light"></div>
        <div className="station-icon">
          <img alt={this.props.station.app} src={this.props.station.icon} />
        </div>
        <div className="station-name">{this.props.station.name}</div>
        <div className="station-profile" title={profileDesc}>{profileName}</div>
        <div className="station-app" title={appDesc}>{appName}</div>
        <div className="station-status">{this.props.station.status}</div>
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
    state: React.PropTypes.string,
    profile: React.PropTypes.string,
    status: React.PropTypes.string,
    app: React.PropTypes.string,
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
};
