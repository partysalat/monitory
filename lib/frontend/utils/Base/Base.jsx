import React, { Component } from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { StyledCard, Title, UpdatedAt } from './styled';
import { withColor, withShowWhen, withAlert } from '../../hoc';
import withAudio from '../../hoc/withAudio';
import withDynamicRowsAndCols from '../../hoc/withDynamicRowsAndCols';


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
        {children}
        {lastUpdated && (
        <UpdatedAt style={{ color: fontColorLight }}>
          Last updated at:
          {' '}
          {Base.formatDate(lastUpdated)}
        </UpdatedAt>
)}
      </StyledCard>
);
  }
}

export default compose(
  withAudio,
  withColor,
  withShowWhen,
  withDynamicRowsAndCols,
  withAlert,
)(Base);

Base.defaultProps = {
  title: '',
  isAlert: false,
  cols: 1,
  rows: 1,
};

Base.propTypes = {
  lastUpdated: PropTypes.object,
  title: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontColorLight: PropTypes.string,
  isAlert: PropTypes.bool,
  playAudioWhen: PropTypes.func,
};
