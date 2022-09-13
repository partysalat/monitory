import React from 'react';
import styled from 'styled-components';
import CountUpto from '../utils/CountUpto';
import { ViewValueFn } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';
import BackgroundChart from '../utils/BackgroundChart';
import { useViewValue } from '../hoc/withViewValue';
import { useSubscription } from '../hoc/withSubscription';
import { BaseProps } from '../utils/Base/Base';
import { BackgroundChartProps } from '../utils/BackgroundChart/BackgroundChart';

const Number = styled.h3`
  text-align: center;
  margin: 0;
  z-index: 1;
  flex: 0 0 auto;
`;
type CardProps = BaseProps &
  BackgroundChartProps & {
    job: string;
    value: ViewValueFn<string | number>;
  };
export default (props: CardProps) => {
  const { value, job } = props;
  const jobData = useSubscription(job);
  const viewValue = useViewValue(jobData?.current, value);
  return (
    <Base {...props} {...jobData} viewValue={viewValue}>
      <Content>
        <BackgroundChart {...props} {...jobData} viewValue={viewValue} />
        <Number>
          <CountUpto value={viewValue} duration={1} />
        </Number>
      </Content>
    </Base>
  );
};
