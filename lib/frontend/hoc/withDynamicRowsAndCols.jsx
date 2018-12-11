import React from 'react';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';

function execFuncOrValue(thing, current, viewValue) {
  return isFunction(thing) ? thing(current, viewValue) : thing;
}
export default (WrappedComponent) => {
  const withDynamicRowsAndCols = (props) => {
    const {
      rows,
      cols,
      current,
      viewValue,
    } = props;
    const calculatedRows = execFuncOrValue(rows, current, viewValue);
    const calculatedCols = execFuncOrValue(cols, current, viewValue);

    return (<WrappedComponent {...props} rows={calculatedRows} cols={calculatedCols} />);
  };
  withDynamicRowsAndCols.propTypes = {
    rows: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    cols: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    current: PropTypes.any,
    viewValue: PropTypes.any,
  };
  return withDynamicRowsAndCols;
};

