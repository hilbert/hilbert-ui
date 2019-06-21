import React from 'react';

/**
 * A filter component made out of several buttons
 *
 * Only one button can be active at a time
 */
const ButtonFilter = (props) => {
  const {
    options, value, counts, allText, onChange,
  } = props;

  const optionButtons = options.map((option) => {
    const classes = ['btn', 'btn-default', 'btn-sm', `button-filter-option-${option.id}`];
    if (value === option.id) {
      classes.push('active');
    }
    let counter = '';
    let spacing = '';
    if (counts !== null) {
      let count = 0;
      if (option.id in counts && counts[option.id] !== 0) {
        count = counts[option.id];
      }
      const badgeClasses = `badge${count === 0 ? ' zero' : ' non-zero'}`;
      counter = (<span className={badgeClasses}>{count}</span>);
      spacing = ' ';
    }
    return (
      <a
        href="#"
        className={classes.join(' ')}
        key={option.id}
        onClick={() => onChange(option.id)}
        title={option.description || ''}
      >
        {option.name || option.id}{spacing}{counter}
      </a>
    );
  });

  const defaultClasses = ['btn', 'btn-default', 'btn-sm'];
  if (value === '') {
    defaultClasses.push('active');
  }

  return (
    <div className="btn-toolbar button-filter">
      <div className="btn-group btn-group-all">
        <a
          href="#"
          className={defaultClasses.join(' ')}
          key="null"
          onClick={() => onChange('')}
        >
          {allText}
        </a>
      </div>
      <div className="btn-group">
        {optionButtons}
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
