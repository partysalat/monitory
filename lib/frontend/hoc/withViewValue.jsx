import React from 'react';
import PropTypes from 'prop-types';


export default (WrappedComponent) => {
  const withViewValue = (props) => {
    const { value, current } = props;
    const viewValue = value(current);
    return <WrappedComponent viewValue={viewValue} {...props} />;
  };

  withViewValue.propTypes = {
    value: PropTypes.func,
    current: PropTypes.any,

  };
  withViewValue.defaultProps = {
    value: data => data,
  };
  return withViewValue;
};
