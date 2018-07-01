import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { subscribe } from '../redux/actions';

const CounterCard = styled.div`
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  display: inline-block;
  float:left;
  width: 10vw;
  height: 10vw;
  text-align: center;
`;
const UpdatedAt = styled.div`
  font-size: .5em;
  padding: 0.25em 1em;
  
  display: inline-block;
  float: left;
`;

class Card extends Component {
  componentWillMount() {
    this.lastValue = 0;
    this.props.subscribe(this.props.job);
  }
  formatDate(date) {
    if (!date) {
      return '';
    }

    return `${date.getHours()}:${date.getMinutes()}`;
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
        <UpdatedAt>Last updated at: {this.formatDate(this.props.lastUpdated)}</UpdatedAt>
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
