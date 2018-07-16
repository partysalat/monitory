import React, {Component} from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import {compose} from 'redux';
import {withColor, withShowWhen, withSingleViewValue, withSubscription,} from '../hoc';
import {StyledCard, Title, UpdatedAt} from '../styled';
import Content from "../styled/Content";


class Base extends Component {
  static formatDate(date) {
    if (!date) {
      return '';
    }
    return format(date, 'HH:mm');
  }

  render() {
    const {
      title,
      alert,
      current,
      last,
      backgroundColor,
      fontColorLight,
      fontColor,
      lastUpdated,
      rows,
      cols,
      children,
    } = this.props;

    const isAlert = isFunction(alert) ? alert({ current, last }) : alert;
    return (
      <StyledCard
        style={{ backgroundColor, color: fontColor }}
        alert={isAlert}
        rows={rows}
        cols={cols}
      >
        <Title style={{ color: fontColorLight }}>{title}</Title>
        <Content>
          {children}
        </Content>
        <UpdatedAt style={{ color: fontColorLight }}>
          Last updated at: {Base.formatDate(lastUpdated)}
        </UpdatedAt>
      </StyledCard>);
  }
}


export default compose(
  withSubscription,
  withSingleViewValue,
  withColor,
  withShowWhen,
)(Base);

Base.defaultProps = {
  title: '',
  alert: false,
  backgroundColor: '#fff',
  fontColor: '#000',
  fontColorLight: 'rgba(0,0,0,0.7)',
  cols: 1,
  rows: 1,
};

Base.propTypes = {
  current: PropTypes.any.isRequired,
  last: PropTypes.any.isRequired,
  lastUpdated: PropTypes.object.isRequired,
  title: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontColorLight: PropTypes.string,

  alert: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func, // returning boolean
  ]),

};
