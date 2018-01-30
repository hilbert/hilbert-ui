import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.handleGlobalLogClicked = this.handleGlobalLogClicked.bind(this);
    this.handleNotificationsClicked = this.handleNotificationsClicked.bind(this);
  }

  handleGlobalLogClicked(ev) {
    if (this.props.onShowGlobalLog) {
      this.props.onShowGlobalLog();
    }
    ev.preventDefault();
  }

  handleNotificationsClicked(ev) {
    if (this.props.onShowNotifications) {
      this.props.onShowNotifications();
    }
    ev.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <div className="navbar-brand" href="#">Hilbert</div>
          </div>
          {this.props.children}
          <div className="navbar-collapse collapse navbar-right">
            <button
              type="button"
              className="btn btn-default navbar-btn"
              onClick={this.handleGlobalLogClicked}
            >
              <i className="fa fa-desktop" />
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-default navbar-btn"
              onClick={this.handleNotificationsClicked}
            >
              <i className="fa fa-bell-o" />
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  onShowGlobalLog: React.PropTypes.func,
  onShowNotifications: React.PropTypes.func,
  children: React.PropTypes.node,
};

Header.defaultProps = {
  onShowGlobalLog: () => {},
  onShowNotifications: () => {},
};
