import React from 'react';

/**
 * Presets Block component
 * Allows activating, deleting and creating components
 */
export default class PresetsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPreset: 0,
    };
    this.clickedCreate = this.clickedCreate.bind(this);
    this.clickedActivate = this.clickedActivate.bind(this);
    this.clickedDelete = this.clickedDelete.bind(this);
    this.handlePresetChange = this.handlePresetChange.bind(this);
  }

  clickedCreate() {
    if (this.props.onCreate) {
      this.props.onCreate();
    }
  }

  clickedActivate() {
    if (this.props.onActivate) {
      this.props.onActivate(this.state.selectedPreset);
    }
  }

  clickedDelete() {
    if (this.props.onDelete) {
      this.props.onDelete(this.state.selectedPreset);
    }
  }

  handlePresetChange(ev) {
    this.setState({ selectedPreset: Number.parseInt(ev.target.value, 10) });
  }

  render() {
    const options = [
      <option key="0" value="0" />,
    ];

    for (const preset of this.props.presets) {
      options.push(<option key={preset.id} value={preset.id}>{preset.name}</option>);
    }

    const createDisabled = this.props.createDisabled ? ' disabled' : '';
    const actionsDisabled = this.state.selectedPreset === 0 ? ' disabled' : '';


    return (<div className="presets-block">
      <div className="form-inline">
        <div className="form-group form-group-minwidth">
          <select
            className="form-control presets-list"
            value={this.state.selectedPreset}
            onChange={this.handlePresetChange}
          >{options}</select>
        </div>
        <a className={`btn btn-warning${actionsDisabled}`} onClick={this.clickedActivate}>Activate preset</a>
        <a className={`btn btn-danger${actionsDisabled}`} onClick={this.clickedDelete}><span className="fa fa-trash-o" /></a>
      </div>
      <div className="presets-actions">
        <a className={`btn btn-success${createDisabled}`} onClick={this.clickedCreate}>Create preset</a>
      </div>
    </div>);
  }
}

PresetsBlock.propTypes = {
  presets: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string,
      stationApps: React.PropTypes.objectOf(React.PropTypes.string),
    })
  ),
  onCreate: React.PropTypes.func,
  onActivate: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  createDisabled: React.PropTypes.bool,
};

PresetsBlock.defaultProps = {
  presets: [],
  onCreate: () => {},
  onActivate: () => {},
  onDelete: () => {},
  createDisabled: false,
};
