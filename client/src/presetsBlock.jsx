import React from 'react';

export default class PresetsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPreset: 0,
    };
    this.handlePresetChange = this.handlePresetChange.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
    this.handleActivateOnSelected = this.handleActivateOnSelected.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handlePresetChange(ev) {
    this.setState({ selectedPreset: Number.parseInt(ev.target.value, 10) });
  }

  handleActivate() {
    if (this.state.selectedPreset !== 0) {
      this.props.onActivate(this.state.selectedPreset);
    }
  }

  handleActivateOnSelected() {
    if (this.state.selectedPreset !== 0) {
      this.props.onActivateOnSelected(this.state.selectedPreset);
    }
  }

  handleSave() {
    if (this.state.selectedPreset !== 0) {
      this.props.onUpdate(this.state.selectedPreset);
    }
  }

  handleDelete() {
    if (this.state.selectedPreset !== 0) {
      this.props.onDelete(this.state.selectedPreset);
      this.setState({ selectedPreset: 0 });
    }
  }

  handleRefresh() {
    this.props.onRefresh(this.state.selectedPreset);
  }

  handleNew() {
    this.props.onCreate();
  }

  render() {
    const options = [
      <option key="0" value="0" />,
    ];

    for (const preset of this.props.presets) {
      options.push(<option key={preset.id} value={preset.id}>{preset.name}</option>);
    }

    const actionsDisabled = (this.state.selectedPreset === 0);

    return (
      <div className="navbar-form navbar-left">
        Presets
        &nbsp;
        <div className="input-group">
          <select
            className="form-control presets-list"
            value={this.state.selectedPreset}
            onChange={this.handlePresetChange}
          >{options}</select>
          <div className="input-group-btn">
            <button
              href="#"
              className="dropdown-toggle btn btn-default"
              data-toggle="dropdown"
            ><span className="caret" /></button>
            <ul className="dropdown-menu">
              <li className={actionsDisabled ? 'disabled' : ''} >
                <a href="#" onClick={this.handleActivate}>
                  Activate
                </a>
              </li>
              {/*<li className={actionsDisabled || !this.props.stationsSelected ? 'disabled' : ''} >*/}
                {/*<a href="#" onClick={this.handleActivate}>*/}
                  {/*Activate on selected*/}
                {/*</a>*/}
              {/*</li>*/}
              <li className={actionsDisabled ? 'disabled' : ''} >
                <a href="#" onClick={this.handleSave}>
                  Save changes
                </a>
              </li>
              <li className={actionsDisabled ? 'disabled' : ''} >
                <a href="#" onClick={this.handleDelete}>
                  Delete
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="#" onClick={this.handleNew}>New preset...</a></li>
              <li className="divider"></li>
              <li><a href="#" onClick={this.handleRefresh}>Refresh</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
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
  stationsSelected: React.PropTypes.bool,
  onCreate: React.PropTypes.func,
  onActivate: React.PropTypes.func,
  onActivateOnSelected: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  onUpdate: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
};

PresetsBlock.defaultProps = {
  presets: [],
  stationsSelected: false,
  onCreate: () => {},
  onActivate: () => {},
  onActivateOnSelected: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  onRefresh: () => {},
}