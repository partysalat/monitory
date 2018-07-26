import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';


export default (WrappedComponent) => {
  const withAlert = (props) => {
    const { alert, current } = props;
    const isAlert = isFunction(alert) ? alert(current) : alert;
    return <WrappedComponent isAlert={isAlert} {...props} />;
  };

  withAlert.propTypes = {
    alert: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]).isRequired,
    current: PropTypes.any.isRequired,

  };
  return withAlert;
};
