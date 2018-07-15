import React, { Component } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { compose } from 'redux';
import CountUpto from './CountUpto';
import {
  withSubscription,
  withSingleViewValue,
  withColor,
  withShowWhen,
} from '../hoc';
import { StyledCard, Title, UpdatedAt } from '../styled';


const Number = styled.h3`
  text-align: center;
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
      lastUpdated,
    } = this.props;

    const isAlert = isFunction(alert) ? alert({ current, last }) : alert;
    return (
      <StyledCard style={{ backgroundColor, color: fontColor }} alert={isAlert}>
        <Title style={{ color: fontColorLight }}>{this.props.title}</Title>
        <Number>
          <CountUpto value={viewValue} duration={1} />
        </Number>
        <UpdatedAt style={{ color: fontColorLight }}>
            Last updated at: {Card.formatDate(lastUpdated)}
        </UpdatedAt>
      </StyledCard>);
  }
}


export default compose(
  withSubscription,
  withSingleViewValue,
  withColor,
  withShowWhen,
)(Card);

Card.defaultProps = {
  title: '',
  alert: false,
  backgroundColor: '#fff',
  fontColor: '#000',
  fontColorLight: 'rgba(0,0,0,0.7)',

};

Card.propTypes = {
  current: PropTypes.any.isRequired,
  last: PropTypes.any.isRequired,
  lastUpdated: PropTypes.object.isRequired,
  title: PropTypes.string,
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
