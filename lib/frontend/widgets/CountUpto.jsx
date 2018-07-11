import React, { Component } from 'react';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';


class CountUpto extends Component {
  componentWillMount() {
    this.lastValue = 0;
  }


  render() {
    const { value } = this.props;
    const lastValue = this.lastValue;
    this.lastValue = value;

    return (
      <CountUp start={lastValue} end={value} {...this.props} />
    );
  }
}


CountUpto.propTypes = {
  value: PropTypes.number.isRequired,
};
export default CountUpto;
