import React, { Component } from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withColor, withShowWhen, withSubscription, withViewValue } from '../hoc';
import { StyledCard, Title, UpdatedAt } from '../styled';
import Content from '../styled/Content';


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
      isAlert,
      backgroundColor,
      fontColorLight,
      fontColor,
      lastUpdated,
      rows,
      cols,
      children,
    } = this.props;

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
  withViewValue,
  withColor,
  withShowWhen,
)(Base);

Base.defaultProps = {
  title: '',
  isAlert: false,
  backgroundColor: '#fff',
  fontColor: '#000',
  fontColorLight: 'rgba(0,0,0,0.7)',
  cols: 1,
  rows: 1,
};

Base.propTypes = {
  lastUpdated: PropTypes.object.isRequired,
  title: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontColorLight: PropTypes.string,
  isAlert: PropTypes.bool,

};
