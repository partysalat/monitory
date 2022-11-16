import React from 'react';
import PropTypes, { ReactComponentLike } from 'prop-types';
import isFunction from 'lodash/isFunction';
import { ValueFn } from './index';

export function useAlert<C, V>(
  current: C,
  viewValue: V,
  alertFn: ValueFn<C, V, boolean>
) {
  const isAlert = isFunction(alertFn) ? alertFn(current, viewValue) : alertFn;
  return isAlert;
}
