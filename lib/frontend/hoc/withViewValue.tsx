import React, { useMemo } from 'react';
import { JobData } from '../redux/initialState';
import { ViewValueFn } from './index';

export interface WithViewValueProps<C, V> extends JobData<C> {
  value?: (current: C) => V;
}
export interface WithViewValueComponentProps<V> {
  viewValue: V;
}

export function useViewValue<C, V>(
  current: C,
  valueFn?: ViewValueFn<C, V>
): V | C {
  return useMemo<V | C>(
    () => (valueFn ? valueFn(current) : current),
    [current, valueFn]
  );
}
