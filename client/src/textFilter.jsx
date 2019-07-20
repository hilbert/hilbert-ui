import React from 'react';

export default class TextFilter extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
  }

  handleChange(ev) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(ev.target.value);
    }
  }

  handleCancelButton(ev) {
    const { onChange } = this.props;

    if (onChange) {
      onChange('');
    }
    ev.preventDefault();
  }

  render() {
    const { value } = this.props;

    return (
      <div className="textFilter navbar-form navbar-left">
        <div className="input-group">
          <input type="text" value={value} onChange={this.handleChange} className="form-control" placeholder="Search" />
          <div className="input-group-btn">
            <button className="btn btn-default textFilter-cancel" onClick={this.handleCancelButton}>
              <i className="fa fa-times-circle" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TextFilter.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

TextFilter.defaultProps = {
  value: '',
  onChange: () => {},
};
