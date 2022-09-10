import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

export default (WrappedComponent) => {
  const withAlert = (props) => {
    const { alert, current, viewValue } = props;
    const isAlert = isFunction(alert) ? alert(current, viewValue) : alert;
    return <WrappedComponent isAlert={isAlert} {...props} />;
  };

  withAlert.propTypes = {
    alert: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    current: PropTypes.any,
    viewValue: PropTypes.any,
  };
  return withAlert;
};
