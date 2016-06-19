import React from 'react';

const ButtonFilter = (props) => {
  const options = [];

  for (const option of props.options) {
    const classes = ['btn', 'btn-default'];
    if (props.value === option) {
      classes.push('active');
    }
    options.push(
      <a
        href="#"
        className={classes.join(' ')}
        key={option}
        onClick={() => props.onChange(option)}
      >{option}</a>
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
  allText: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

ButtonFilter.defaultProps = {
  options: [],
  allText: 'All',
  value: '',
  onChange: () => {},
};

export default ButtonFilter;
