import React, { ReactNode } from 'react';
import { isFunction } from 'lodash';

import { ValueFn, ViewValueFn } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';
import { useSubscription } from '../hoc/withSubscription';
import { useViewValue } from '../hoc/withViewValue';
import { BaseProps } from '../utils/Base/Base';

type CustomTileProps = BaseProps & {
  job: string;
  value: ViewValueFn<string | number>;
  children?: ValueFn<ReactNode>;
};

export default (props: CustomTileProps) => {
  const { value, job, children } = props;
  const jobData = useSubscription(job);
  const viewValue = useViewValue(jobData?.current, value);

  return (
    <Base {...props}>
      <Content>
        {isFunction(children) ? children(jobData.current, viewValue) : children}
      </Content>
    </Base>
  );
};
