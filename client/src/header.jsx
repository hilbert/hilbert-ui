import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleGlobalLogClicked = this.handleGlobalLogClicked.bind(this);
    this.handleNotificationsClicked = this.handleNotificationsClicked.bind(this);
  }

  handleGlobalLogClicked(ev) {
    const { onShowGlobalLog } = this.props;
    if (onShowGlobalLog) {
      onShowGlobalLog();
    }
    ev.preventDefault();
  }

  handleNotificationsClicked(ev) {
    const { onShowNotificationLog } = this.props;
    if (onShowNotificationLog) {
      onShowNotificationLog();
    }
    ev.preventDefault();
  }

  render() {
    const { children } = this.props;
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header pull-left">
            <div className="navbar-brand">Hilbert</div>
          </div>
          <button
            type="button"
            className="navbar-toggle collapsed navbar-btn"
            data-toggle="collapse"
            data-target="#navbar-menus"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <div className="nav navbar-nav navbar-btn pull-right">
            <button
              type="button"
              className="btn btn-default navbar-action-btn"
              onClick={this.handleGlobalLogClicked}
            >
              <i className="fa fa-desktop" />
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-default navbar-action-btn"
              onClick={this.handleNotificationsClicked}
            >
              <i className="fa fa-bell-o" />
            </button>
          </div>
          <div className="collapse navbar-collapse pull-left" id="navbar-menus">
            {children}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  onShowGlobalLog: React.PropTypes.func,
  onShowNotificationLog: React.PropTypes.func,
  children: React.PropTypes.node,
};

Header.defaultProps = {
  onShowGlobalLog: () => {},
  onShowNotificationLog: () => {},
  children: null,
};
