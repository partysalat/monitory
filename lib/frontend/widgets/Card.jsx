import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import CountUp from 'react-countup';
import format from 'date-fns/format';
import { flipInX } from 'react-animations';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import { subscribe } from '../redux/actions';

const bounceAnimation = keyframes`${flipInX}`;
const CounterCard = styled.div`
  animation: 1s ${bounceAnimation};
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
function getColorByBgColor(bgColor, alpha = 1) {
  if (!bgColor) { return ''; }
  return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha})`;
}

class Card extends Component {
  static formatDate(date) {
    if (!date) {
      return '';
    }
    return format(date, 'HH:mm');
  }

  componentWillMount() {
    this.lastValue = 0;
    this.props.subscribe(this.props.job);
  }
  render() {
    const { showWhen, value, color } = this.props;
    const currentData = {
      current: this.props.current,
      last: this.props.last,
    };

    if (!showWhen(currentData)) {
      return null;
    }

    const finalColor = isFunction(color) ? color(currentData) : color;

    const viewValue = value(currentData);
    const lastValue = this.lastValue;
    this.lastValue = viewValue;

    return (
      <CounterCard style={{ backgroundColor: finalColor, color: getColorByBgColor(finalColor) }}>
        <Title style={{ color: getColorByBgColor(finalColor, 0.7) }}>{this.props.title}</Title>
        <Number>
          <CountUp start={lastValue} end={viewValue} duration={1} />
        </Number>
        <UpdatedAt style={{ color: getColorByBgColor(finalColor, 0.7) }}>
          Last updated at: {Card.formatDate(this.props.lastUpdated)}
        </UpdatedAt>
      </CounterCard>
    );
  }
}

function mapStateToProps(state, props) {
  return { ...state.jobData[props.job] };
}
function mapDispatchToProps(dispatch) {
  return {
    subscribe: jobId => dispatch(subscribe(jobId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);

Card.defaultProps = {
  title: '',
  showWhen: () => true,
  value: (data = {}) => data.current,

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


};
