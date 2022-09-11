import React from 'react';
import isFunction from 'lodash/isFunction';

interface WithViewValueProps {
  value?: (value: number) => number;
  current: any;
}

export default function withViewValue<T>(WrappedComponent: React.FC<T>) {
  return function (props: WithViewValueProps & T) {
    const { value, current } = props;
    const viewValue = value ? value(current) : current;
    return <WrappedComponent viewValue={viewValue} {...props} />;
  };
}
