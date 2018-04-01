import React from 'react';
import UIAPI from './uiAPI';

export default class TestMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      flags: {
        'sim-fail-cli': false,
        'sim-timeout': false,
        'sim-unexpected-off': false,
      },
    };

    this.toggleSimFailCli = this.toggleFlag.bind(this, 'sim-fail-cli');
    this.toggleSimTimeout = this.toggleFlag.bind(this, 'sim-timeout');
    this.toggleUnexpectedOff = this.toggleFlag.bind(this, 'sim-unexpected-off');

    this.makeStationsUnreachable = this.makeStationsUnreachable.bind(this);
    this.makeStationsReachable = this.makeStationsReachable.bind(this);
    this.stopStationsUnexpectedly = this.stopStationsUnexpectedly.bind(this);
  }

  componentDidMount() {
    return this.props.api.getTestFlags()
      .then((response) => {
        this.updateFromResponse(response);
      })
      .catch(err => console.error(err));
  }

  toggleFlag(flag) {
    const flipped = {};
    flipped[flag] = !this.state.flags[flag];
    const newFlags = Object.assign({}, this.state.flags, flipped);

    this.setState({ flags: newFlags });
    this.props.api.setTestFlags(newFlags)
      .then((response) => {
        this.updateFromResponse(response);
      })
      .catch(err => console.error(err));
  }

  updateFromResponse(response) {
    this.setState({
      visible: response.testMode,
      flags: {
        'sim-fail-cli': response.flags['sim-fail-cli'] || false,
        'sim-timeout': response.flags['sim-timeout'] || false,
        'sim-unexpected-off': response.flags['sim-unexpected-off'] || false,
      },
    });
  }

  makeStationsUnreachable() {
    this.props.api.testMakeStationsUnreachable(this.props.selection);
  }

  makeStationsReachable() {
    this.props.api.testMakeStationsReachable(this.props.selection);
  }

  stopStationsUnexpectedly() {
    this.props.api.testStopStationsUnexpectedly(this.props.selection);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
        >Test <span className="caret" /></a>
        <ul className="dropdown-menu">
          <li>
            <a href="#" className={this.state.flags['sim-fail-cli'] ? 'checked' : ''} onClick={this.toggleSimFailCli}>
              Simulate CLI fail in operations
            </a>
          </li>
          <li>
            <a href="#" className={this.state.flags['sim-timeout'] ? 'checked' : ''} onClick={this.toggleSimTimeout}>
              Simulate operations timeout
            </a>
          </li>
          <li>
            <a href="#" className={this.state.flags['sim-unexpected-off'] ? 'checked' : ''} onClick={this.toggleUnexpectedOff}>
              Simulate stations stop during operations
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#" onClick={this.makeStationsUnreachable}>
              Make selected stations unreachable
            </a>
          </li>
          <li>
            <a href="#" onClick={this.makeStationsReachable}>
              Make selected stations reachable
            </a>
          </li>
          <li>
            <a href="#" onClick={this.stopStationsUnexpectedly}>
              Stop selected stations unexpectedly
            </a>
          </li>
        </ul>
      </li>
    );
  }
}

TestMenu.propTypes = {
  api: React.PropTypes.instanceOf(UIAPI),
  selection: React.PropTypes.instanceOf(Set)
};
