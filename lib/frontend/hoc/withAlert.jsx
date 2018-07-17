import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';


export default (WrappedComponent) => {
  const withAlert = (props) => {
    const { alert, current, last } = props;
    const isAlert = isFunction(alert) ? alert({ current, last }) : alert;
    return <WrappedComponent isAlert={isAlert} {...props} />;
  };

  withAlert.propTypes = {
    alert: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]).isRequired,
    current: PropTypes.any.isRequired,
    last: PropTypes.any.isRequired,

  };
  return withAlert;
};
