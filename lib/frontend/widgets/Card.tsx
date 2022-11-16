import React from 'react';
import styled from 'styled-components';
import CountUpto from '../utils/CountUpto';
import { ValueFn, ViewValueFn } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';
import BackgroundChart from '../utils/BackgroundChart';
import { useViewValue } from '../hoc/withViewValue';
import { useSubscription } from '../hoc/withSubscription';
import { BaseProps } from '../utils/Base/Base';
import { BackgroundChartProps } from '../utils/BackgroundChart/BackgroundChart';
import { ShowWhen, WithShowWhenProps } from '../hoc/withShowWhen';

const Number = styled.h3`
  text-align: center;
  margin: 0;
  z-index: 1;
  flex: 0 0 auto;
`;
export interface CardProps<C, V>
  extends Omit<BaseProps<C, V>, 'current' | 'lastUpdated' | 'viewValue'>,
    Omit<BackgroundChartProps<C, V>, 'current' | 'viewValue'>,
    Omit<WithShowWhenProps<C, V>, 'current' | 'lastUpdated' | 'viewValue'> {
  job: string;
  value?: ViewValueFn<C, V>;
}
export default <C, V>(props: CardProps<C, V>) => {
  const { value, job, showWhen } = props;
  const jobData = useSubscription(job);
  const viewValue = useViewValue(jobData?.current, value);
  return (
    <ShowWhen showWhen={showWhen} {...jobData} viewValue={viewValue}>
      <Base {...props} {...jobData} viewValue={viewValue}>
        <Content>
          <BackgroundChart {...props} {...jobData} viewValue={viewValue} />
          <Number>
            <CountUpto value={viewValue} duration={1} />
          </Number>
        </Content>
      </Base>
    </ShowWhen>
  );
};
