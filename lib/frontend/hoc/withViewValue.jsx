import React from 'react';
import PropTypes from 'prop-types';


export default (WrappedComponent) => {
  const withViewValue = (props) => {
    const { value, current, last } = props;
    const viewValue = value({ current, last });
    return <WrappedComponent viewValue={viewValue} {...props} />;
  };

  withViewValue.propTypes = {
    value: PropTypes.func,
    current: PropTypes.any.isRequired,
    last: PropTypes.any.isRequired,

  };
  withViewValue.defaultProps = {
    value: (data = {}) => data.current,
  };
  return withViewValue;
};
