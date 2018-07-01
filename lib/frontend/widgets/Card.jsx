import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CountUp, { startAnimation } from 'react-countup';
import { subscribe } from '../redux/actions';

const CounterCard = styled.div`
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

class Card extends Component {
  componentWillMount() {
    this.lastValue = 0;
    this.props.subscribe(this.props.job);
  }

  render() {
    const viewValue = this.props.value({
      current: this.props.current,
      last: this.props.last,
    });

    const tmp = this.lastValue;
    this.lastValue = viewValue;

    return (
      <CounterCard>
        <CountUp start={tmp} end={viewValue} duration={1} />
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
