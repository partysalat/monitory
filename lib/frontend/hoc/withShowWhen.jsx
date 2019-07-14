import React from 'react';
import PropTypes from 'prop-types';


export default (WrappedComponent) => {
  const withShowWhen = (props) => {
    const {
      showWhen,
      current,
      viewValue,
    } = props;

    if (!showWhen(current, viewValue)) {
      return null;
    }


    return <WrappedComponent {...props} />;
  };
  withShowWhen.propTypes = {
    showWhen: PropTypes.func,
    current: PropTypes.any,
    viewValue: PropTypes.any,

  };
  withShowWhen.defaultProps = {
    showWhen: () => true,
  };
  return withShowWhen;
};
