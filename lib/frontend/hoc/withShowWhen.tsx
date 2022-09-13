import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { JobData } from '../redux/initialState';
import { WithViewValueComponentProps } from './withViewValue';

interface WithShowWhenProps extends JobData, WithViewValueComponentProps {
  showWhen: (viewValue: number | string, current: any) => boolean;
}
export default function withShowWhen<T>(WrappedComponent: React.FC<T>) {
  return function (props: WithShowWhenProps & T) {
    const { showWhen, current, viewValue } = props;

    if (showWhen && !showWhen(current, viewValue)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
export const ShowWhen: React.FC<PropsWithChildren<WithShowWhenProps>> = (
  props
) => {
  const { showWhen, current, viewValue } = props;

  if (showWhen && !showWhen(current, viewValue)) {
    return null;
  }

  return props.children;
};
