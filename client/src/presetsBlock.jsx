import React from 'react';

export default class PresetsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPreset: 0,
    };
    this.handlePresetChange = this.handlePresetChange.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handlePresetChange(ev) {
    this.setState({ selectedPreset: Number.parseInt(ev.target.value, 10) });
  }

  handleActivate() {
    const { onActivate } = this.props;
    const { selectedPreset } = this.state;
    if (selectedPreset !== 0) {
      onActivate(selectedPreset);
    }
  }

  handleSave() {
    const { onUpdate } = this.props;
    const { selectedPreset } = this.state;
    if (selectedPreset !== 0) {
      onUpdate(selectedPreset);
    }
  }

  handleDelete() {
    const { onDelete } = this.props;
    const { selectedPreset } = this.state;
    if (selectedPreset !== 0) {
      onDelete(selectedPreset);
      this.setState({ selectedPreset: 0 });
    }
  }

  handleRefresh() {
    const { onRefresh } = this.props;
    const { selectedPreset } = this.state;
    onRefresh(selectedPreset);
  }

  handleNew() {
    const { onCreate } = this.props;
    onCreate();
  }

  render() {
    const { presets } = this.props;
    const { selectedPreset } = this.state;

    const options = presets.map(preset => (
      <option key={preset.id} value={preset.id}>{preset.name}</option>
    ));
    options.unshift(<option key="0" value="0" />);

    const actionsDisabled = (selectedPreset === 0);

    return (
      <div className="navbar-form navbar-left presets-block">
        Presets
        &nbsp;
        <div className="input-group">
          <select
            className="form-control presets-list"
            value={selectedPreset}
            onChange={this.handlePresetChange}
          >
            {options}
          </select>
          <div className="input-group-btn">
            <button
              className="dropdown-toggle btn btn-default"
              type="button"
              data-toggle="dropdown"
            >
              <span className="caret" />
            </button>
            <ul className="dropdown-menu">
              <li className={actionsDisabled ? 'disabled' : ''}>
                <a href="#" onClick={this.handleActivate}>
                  Activate
                </a>
              </li>
              <li className={actionsDisabled ? 'disabled' : ''}>
                <a href="#" onClick={this.handleSave}>
                  Save changes
                </a>
              </li>
              <li className={actionsDisabled ? 'disabled' : ''}>
                <a href="#" onClick={this.handleDelete}>
                  Delete
                </a>
              </li>
              <li className="divider" />
              <li>
                <a href="#" onClick={this.handleNew}>New preset...</a></li>
              <li className="divider" />
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
  onDelete: React.PropTypes.func,
  onUpdate: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
};

PresetsBlock.defaultProps = {
  presets: [],
  stationsSelected: false,
  onCreate: () => {},
  onActivate: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  onRefresh: () => {},
};
