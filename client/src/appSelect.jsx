/* eslint-disable react/no-unused-prop-types */
import React from 'react';

/**
 * AppSelect component
 * Allows the user to select an application from a list
 */
export default class AppSelect extends React.Component {

  constructor(props) {
    super(props);
    this.appSelector = null;
    this.clickedChangeApp = this.clickedChangeApp.bind(this);
  }

  clickedChangeApp() {
    if (this.props.onChange) {
      this.props.onChange(this.appSelector.value);
    }
  }

  render() {
    const options = [];

    if (this.props.allowBlank) {
      options.push(
        <option key="null" value="">&nbsp;</option>
      );
    }

    const sortedApps = Object.values(this.props.applications).sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      return 0;
    });

    for (const application of sortedApps) {
      options.push(
        <option key={application.id} value={application.id}>{application.name}</option>
      );
    }

    const disabledClass = (this.props.disabled ? ' disabled' : '');

    return (
      <div className={`appSelect${disabledClass}`}>
        <div className="form-inline">
          <div className="form-group form-group-minwidth">
            <select
              className={`form-control${disabledClass}`}
              defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
              ref={(sel) => { this.appSelector = sel; }}
            >
              {options}
            </select>
          </div>
          &nbsp;
          <a
            className={`btn btn-warning${disabledClass}`}
            onClick={this.clickedChangeApp}
          >Change application</a>
        </div>
      </div>
    );
  }
}

AppSelect.propTypes = {
  applications: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      description: React.PropTypes.string,
    })
  ),
  defaultValue: React.PropTypes.string,
  allowBlank: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

AppSelect.defaultProps = {
  applications: [],
  defaultValue: '',
  allowBlank: false,
  disabled: false,
  onChange: () => {},
};
