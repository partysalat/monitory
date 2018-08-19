import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import CountUpto from './../utils/CountUpto';
import { withSubscription, withViewValue, withAudio } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';
import BackgroundChart from '../utils/BackgroundChart';
import Tendency from '../utils/Tendency';


const Number = styled.h3`
  text-align: center;
  margin: 0;
  z-index: 1;
  flex: 0 0 auto;
`;

const Card = (props) => {
  const {
    viewValue,
  } = props;
  return (
    <Base {...props} >
      <Content>
        <BackgroundChart {...props} />
        <Number>
          <CountUpto value={viewValue} duration={1} />
        </Number>
        <Tendency {...props} />
      </Content>
    </Base>);
};


export default compose(
  withSubscription,
  withViewValue,
  withAudio,
)(Card);

Card.propTypes = {
  job: PropTypes.string.isRequired,
  title: PropTypes.string,
  showWhen: PropTypes.func,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  alert: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
  cols: PropTypes.number,
  rows: PropTypes.number,
  value: PropTypes.func,

  graph: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.bool,
  ]),
  graphOptions: PropTypes.object,
  graphColor: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.string,
  ]),
  withTendency: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.bool,
  ]),
};
