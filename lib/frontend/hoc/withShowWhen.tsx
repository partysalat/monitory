import React, { PropsWithChildren } from 'react';
import { JobData } from '../redux/initialState';
import { WithViewValueComponentProps } from './withViewValue';

export interface WithShowWhenProps<C, V>
  extends JobData<C>,
    WithViewValueComponentProps<V> {
  showWhen?: (viewValue: C, current: V) => boolean;
}
export const ShowWhen = <C, V>(
  props: PropsWithChildren<WithShowWhenProps<C, V>>
) => {
  const { showWhen, current, viewValue } = props;

  if (showWhen && !showWhen(current, viewValue)) {
    return null;
  }

  return <>{props.children}</>;
};
