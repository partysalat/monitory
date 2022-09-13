import React, { useMemo } from 'react';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import { ValueFn } from './index';

function execFuncOrValue(thing, current, viewValue) {
  return isFunction(thing) ? thing(current, viewValue) : thing;
}
export default (WrappedComponent) => {
  const withDynamicRowsAndCols = (props) => {
    const { rows, cols, current, viewValue } = props;
    const calculatedRows = execFuncOrValue(rows, current, viewValue);
    const calculatedCols = execFuncOrValue(cols, current, viewValue);

    return (
      <WrappedComponent
        {...props}
        rows={calculatedRows}
        cols={calculatedCols}
      />
    );
  };
  withDynamicRowsAndCols.propTypes = {
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    cols: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    current: PropTypes.any,
    viewValue: PropTypes.any,
  };
  return withDynamicRowsAndCols;
};

export function useDynamicRowsAndCols(
  current: any,
  viewValue: number | string,
  rows: ValueFn<string>,
  cols: ValueFn<string>
) {
  const calculatedRows = useMemo(
    () => execFuncOrValue(rows, current, viewValue),
    [viewValue, current]
  );
  const calculatedCols = useMemo(
    () => execFuncOrValue(cols, current, viewValue),
    [viewValue, current]
  );
  return {
    rows: calculatedRows,
    cols: calculatedCols,
  };
}
