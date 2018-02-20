import React from 'react';

const ButtonFilter = (props) => {
  const options = [];

  for (const option of props.options) {
    const classes = ['btn', 'btn-default', `button-filter-option-${option.id}`];
    if (props.value === option.id) {
      classes.push('active');
    }
    let counter = '';
    let spacing = '';
    if (props.counts !== null) {
      let count = 0;
      if (option.id in props.counts && props.counts[option.id] !== 0) {
        count = props.counts[option.id];
      }
      const badgeClasses = `badge${count === 0 ? ' zero' : ' non-zero'}`;
      counter = (<span className={badgeClasses}>{count}</span>);
      spacing = ' ';
    }
    options.push(
      <a
        href="#"
        className={classes.join(' ')}
        key={option.id}
        onClick={() => props.onChange(option.id)}
        title={option.description || ''}
      >{option.name || option.id}{spacing}{counter}</a>
    );
  }

  const defaultClasses = ['btn', 'btn-default'];
  if (props.value === '') {
    defaultClasses.push('active');
  }

  return (
    <div className="btn-toolbar button-filter">
      <div className="btn-group">
        <a
          href="#"
          className={defaultClasses.join(' ')}
          key="null"
          onClick={() => props.onChange('')}
        >{props.allText}</a>
      </div>
      <div className="btn-group">
        {options}
      </div>
    </div>
  );
};

ButtonFilter.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
  })),
  counts: React.PropTypes.objectOf(React.PropTypes.number),
  allText: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

ButtonFilter.defaultProps = {
  options: [],
  counts: null,
  allText: 'All',
  value: '',
  onChange: () => {},
};

export default ButtonFilter;
