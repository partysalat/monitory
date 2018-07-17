import React from 'react';
import PropTypes from 'prop-types';


export default (WrappedComponent) => {
  const withSingleViewValue = (props) => {
    const { value, current, last } = props;
    const viewValue = value({ current, last });
    return <WrappedComponent viewValue={viewValue} {...props} />;
  };

  withSingleViewValue.propTypes = {
    value: PropTypes.func,
    current: PropTypes.any.isRequired,
    last: PropTypes.any.isRequired,

  };
  withSingleViewValue.defaultProps = {
    value: (data = {}) => data.current,
  };
  return withSingleViewValue;
};
