import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import CountUp from 'react-countup';
import format from 'date-fns/format';
import { flipInX } from 'react-animations';
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
    const currentData = {
      current: this.props.current,
      last: this.props.last,
    };

    const viewValue = this.props.value(currentData);
    const { showWhen } = this.props;
    const tmp = this.lastValue;
    this.lastValue = viewValue;

    if (showWhen && !showWhen(currentData)) {
      return null;
    }
    return (
      <CounterCard>
        <Title>{this.props.title}</Title>
        <Number>
          <CountUp start={tmp} end={viewValue} duration={1} />
          {/* <div>{viewValue}</div> */}
        </Number>
        <UpdatedAt>Last updated at: {Card.formatDate(this.props.lastUpdated)}</UpdatedAt>
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
