import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import format from 'date-fns/format';
import { flipInX, pulse } from 'react-animations';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { compose } from 'redux';
import CountUpto from './CountUpto';
import withSubscription from '../util/withSubscription';
import withSingleViewValue from '../util/withSingleViewValue';
import withColor from '../util/withColor';
import withShowWhen from '../util/withShowWhen';


const bounceAnimation = keyframes`${flipInX}`;
const pulseAnimation = keyframes`${pulse}`;
const CounterCard = styled.div`
  animation: ${props => (props.alert ? css`1s ${pulseAnimation} infinite` : css`1s ${bounceAnimation}`)};
  display: flex;
  flex-direction: column;
  padding: 2%;
  flex: 1 16%;
  background-color: #FFF;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.25);
  font-size: 2rem;
  max-width: 15vw;
`;

const UpdatedAt = styled.div`
  margin-top: auto;
  padding-top: 20px;
  text-align: center;
  font-size:0.5rem;
`;
const Number = styled.h3`
  text-align: center;
`;
const Title = styled.div`
  text-align: center;
  margin-bottom:auto;
  font-size:1rem;
`;


class Card extends Component {
  static formatDate(date) {
    if (!date) {
      return '';
    }
    return format(date, 'HH:mm');
  }

  render() {
    const {
      alert,
      current,
      last,
      backgroundColor,
      fontColorLight,
      fontColor,
      viewValue,
    } = this.props;

    const isAlert = isFunction(alert) ? alert({ current, last }) : alert;
    return (
      <CounterCard style={{ backgroundColor, color: fontColor }} alert={isAlert}>
        <Title style={{ color: fontColorLight }}>{this.props.title}</Title>
        <Number>
          <CountUpto value={viewValue} duration={1} />
        </Number>
        <UpdatedAt style={{ color: fontColorLight }}>
            Last updated at: {Card.formatDate(this.props.lastUpdated)}
        </UpdatedAt>
      </CounterCard>);
  }
}


export default compose(withSubscription, withSingleViewValue, withColor, withShowWhen)(Card);

Card.defaultProps = {
  title: '',
  showWhen: () => true,
  value: (data = {}) => data.current,
  alert: false,
  color: '#fff',
};

Card.propTypes = {
  job: PropTypes.string.isRequired,
  title: PropTypes.string,
  showWhen: PropTypes.func,
  value: PropTypes.func,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  alert: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func, // returning boolean
  ]),
};
