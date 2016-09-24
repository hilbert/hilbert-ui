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
    const applications = [];

    if (this.props.allowBlank) {
      applications.push(
        <option key="null" value="">&nbsp;</option>
      );
    }

    for (const application of this.props.applications) {
      applications.push(
        <option key={application} value={application}>{application}</option>
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
              {applications}
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
    React.PropTypes.string
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
