import React, { useMemo } from 'react';
import isFunction from 'lodash/isFunction';
import { JobData } from '../redux/initialState';
import { ViewValueFn } from './index';

interface WithViewValueProps extends JobData {
  value?: (current: any) => number | string;
}
export interface WithViewValueComponentProps {
  viewValue: number | string;
}
export default function withViewValue<T extends WithViewValueComponentProps>(
  WrappedComponent: React.FC<T>
) {
  return function (props: WithViewValueProps & T) {
    const { value, current } = props;
    const viewValue = value ? value(current) : current;
    return <WrappedComponent viewValue={viewValue} {...props} />;
  };
}

export function useViewValue<C = any>(current: C, valueFn: ViewValueFn<C>) {
  return useMemo(
    () => (valueFn ? valueFn(current) : current),
    [current, valueFn]
  );
}
