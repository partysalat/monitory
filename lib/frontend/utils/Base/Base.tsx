import * as React from 'react';
import format from 'date-fns/format';
import { compose } from 'redux';
import { StyledCard, Title, UpdatedAt } from './styled';
import { withColor, withShowWhen, withAlert } from '../../hoc';
import withAudio from '../../hoc/withAudio';

interface BaseProps<T,U>{
  title:string,
  lastUpdated:object,
  cols:number,
  rows:number,
  backgroundColor:string,
  fontColor:string,
  fontColorLight:string,
  isAlert:boolean,
  playAudioWhen:(current: T, viewValue: U) => string

}
class Base<T,U> extends React.Component<BaseProps<T,U>,any> {
  static formatDate(date) {
    if (!date) {
      return '';
    }
    return format(date, 'HH:mm');
  }

  render() {
    const {
      title = '',
      isAlert = false,
      backgroundColor,
      fontColorLight,
      fontColor,
      lastUpdated,
      rows = 1,
      cols = 1,
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
        {lastUpdated && <UpdatedAt style={{ color: fontColorLight }}>
          Last updated at: {Base.formatDate(lastUpdated)}
        </UpdatedAt>}
      </StyledCard>);
  }
}

export default compose(
  withAudio,
  withColor,
  withShowWhen,
  withAlert,
)(Base);

// Base.defaultProps = {
//   title: '',
//   isAlert: false,
//   cols: 1,
//   rows: 1,
// };
//
// Base.propTypes = {
//   lastUpdated: PropTypes.object,
//   title: PropTypes.string,
//   cols: PropTypes.number,
//   rows: PropTypes.number,
//   backgroundColor: PropTypes.string,
//   fontColor: PropTypes.string,
//   fontColorLight: PropTypes.string,
//   isAlert: PropTypes.bool,
//   playAudioWhen: PropTypes.func,
// };
