import React from 'react';

const ButtonFilter = (props) => {
  const options = [];

  for (const option of props.options) {
    const classes = ['btn', 'btn-default', `button-filter-option-${option}`];
    if (props.value === option) {
      classes.push('active');
    }
    let counter = '';
    let spacing = '';
    if (props.counts !== null) {
      let count = 0;
      if (props.counts.hasOwnProperty(option) && props.counts[option] !== 0) {
        count = props.counts[option];
      }
      const badgeClasses = `badge${count === 0 ? ' zero' : ' non-zero'}`;
      counter = (<span className={badgeClasses}>{count}</span>);
      spacing = ' ';
    }
    options.push(
      <a
        href="#"
        className={classes.join(' ')}
        key={option}
        onClick={() => props.onChange(option)}
      >{option}{spacing}{counter}</a>
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
  options: React.PropTypes.arrayOf(React.PropTypes.string),
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
