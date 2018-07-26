import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import CountUpto from './../utils/CountUpto';
import { withSubscription, withViewValue } from '../hoc';
import Base from '../utils/Base';
import Content from '../styled/Content';
import BackgroundChart from '../utils/BackgroundChart';


const Number = styled.h3`
  text-align: center;
  margin:0;
  z-index:1;
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
      </Content>
    </Base>);
};


export default compose(
  withSubscription,
  withViewValue,
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

  graph: PropTypes.func,
  graphColor: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.string,
  ]),
};
