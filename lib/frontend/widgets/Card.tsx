import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CountUpto from '../utils/CountUpto';
import { ViewValueFn } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';
import BackgroundChart from '../utils/BackgroundChart';
import { useViewValue } from '../hoc/withViewValue';
import { useSubscription } from '../hoc/withSubscription';
import { BaseProps } from '../utils/Base/Base';

const Number = styled.h3`
  text-align: center;
  margin: 0;
  z-index: 1;
  flex: 0 0 auto;
`;
type CardProps = BaseProps & {
  job: string;
  value: ViewValueFn<string | number>;
};
const Card = (props: CardProps) => {
  const { value, job } = props;
  const current = useSubscription(job);
  const viewValue = useViewValue(current?.current, value);
  return (
    <Base {...props} viewValue={viewValue}>
      <Content>
        <BackgroundChart {...props} current={current} viewValue={viewValue} />
        <Number>
          <CountUpto value={viewValue} duration={1} />
        </Number>
        {/*<Tendency {...props} />*/}
      </Content>
    </Base>
  );
};

Card.propTypes = {
  job: PropTypes.string.isRequired,
  title: PropTypes.string,
  showWhen: PropTypes.func,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  alert: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  value: PropTypes.func,

  graph: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  graphOptions: PropTypes.object,
  graphColor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  withTendency: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  playAudioWhen: PropTypes.func,
};
