import React, { useMemo } from 'react';
import isFunction from 'lodash/isFunction';
import PropTypes, { ReactComponentLike } from 'prop-types';
import { ValueFn } from './index';

function execFuncOrValue<C, V>(
  thing: ValueFn<C, V, string | number>,
  current: C,
  viewValue: V
) {
  return isFunction(thing) ? thing(current, viewValue) : thing;
}

export function useDynamicRowsAndCols<C, V>(
  current: C,
  viewValue: V,
  rows: ValueFn<C, V, string | number>,
  cols: ValueFn<C, V, string | number>
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
