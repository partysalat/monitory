import React from 'react';
import PropTypes from 'prop-types';


export default (WrappedComponent) => {
  const withShowWhen = (props) => {
    const {
      showWhen,
    } = props;
    const currentData = {
      current: props.current,
      last: props.last,
    };

    if (!showWhen(currentData)) {
      return null;
    }


    return <WrappedComponent {...props} />;
  };
  withShowWhen.propTypes = {
    showWhen: PropTypes.func,
    current: PropTypes.any.isRequired,
    last: PropTypes.any.isRequired,

  };
  withShowWhen.defaultProps = {
    showWhen: () => true,
  };
  return withShowWhen;
};

