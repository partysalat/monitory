import React from 'react';
import PropTypes from 'prop-types';


export default (WrappedComponent) => {
  const withShowWhen = (props) => {
    const {
      showWhen,
      current,
    } = props;

    if (!showWhen(current)) {
      return null;
    }


    return <WrappedComponent {...props} />;
  };
  withShowWhen.propTypes = {
    showWhen: PropTypes.func,
    current: PropTypes.any.isRequired,

  };
  withShowWhen.defaultProps = {
    showWhen: () => true,
  };
  return withShowWhen;
};

