import React from 'react';

export default class ViewMenu extends React.Component {
  constructor(props) {
    super(props);

    this.sortByDefault = this.setSortCriteria.bind(this, 'default');
    this.sortByName = this.setSortCriteria.bind(this, 'name');
    this.sortByApp = this.setSortCriteria.bind(this, 'app');
    this.sortByProfile = this.setSortCriteria.bind(this, 'profile');
  }

  setSortCriteria(criteria) {
    const { onSortCriteria } = this.props;
    if (onSortCriteria) {
      onSortCriteria(criteria);
    }
  }

  render() {
    const { sortCriteria } = this.props;

    return (
      <li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
        >
          View <span className="caret" />
        </a>
        <ul className="dropdown-menu">
          <li>
            <a href="#" className={sortCriteria === 'default' ? 'checked' : ''} onClick={this.sortByDefault}>
              Default order
            </a>
          </li>
          <li>
            <a href="#" className={sortCriteria === 'name' ? 'checked' : ''} onClick={this.sortByName}>
              Order by name
            </a>
          </li>
          <li>
            <a href="#" className={sortCriteria === 'app' ? 'checked' : ''} onClick={this.sortByApp}>
              Order by application
            </a>
          </li>
          <li>
            <a href="#" className={sortCriteria === 'profile' ? 'checked' : ''} onClick={this.sortByProfile}>
              Order by profile
            </a>
          </li>
        </ul>
      </li>
    );
  }
}

ViewMenu.propTypes = {
  sortCriteria: React.PropTypes.string,
  onSortCriteria: React.PropTypes.func,
};
