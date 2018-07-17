import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import CountUpto from './../utils/CountUpto';
import { withColor, withShowWhen, withSingleViewValue, withSubscription } from '../hoc';
import Base from '../utils/Base';
import withAlert from '../hoc/withAlert';


const Number = styled.h3`
  text-align: center;
`;


const Card = (props) => {
  const {
    viewValue,
  } = props;

  return (
    <Base {...props} >
      <Number>
        <CountUpto value={viewValue} duration={1} />
      </Number>
    </Base>);
};


export default compose(
  withSubscription,
  withSingleViewValue,
  withColor,
  withShowWhen,
  withAlert,
)(Card);

Card.defaultProps = {
  title: '',
  alert: false,
  backgroundColor: '#fff',
  fontColor: '#000',
  fontColorLight: 'rgba(0,0,0,0.7)',
  cols: 1,
  rows: 1,
};

Card.propTypes = {
  current: PropTypes.any.isRequired,
  last: PropTypes.any.isRequired,
  lastUpdated: PropTypes.object.isRequired,
  title: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  viewValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,

  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontColorLight: PropTypes.string,
  alert: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func, // returning boolean
  ]),

};
