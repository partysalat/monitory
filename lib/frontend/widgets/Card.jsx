import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import CountUpto from './../utils/CountUpto';
import { withColor, withShowWhen, withViewValue, withSubscription } from '../hoc';
import Base from '../utils/Base';
import withAlert from '../hoc/withAlert';
import Content from '../styled/Content';
import BackgroundChart from '../styled/BackgroundChart';


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
  withColor,
  withShowWhen,
  withAlert,
)(Card);

Card.propTypes = {
  viewValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
