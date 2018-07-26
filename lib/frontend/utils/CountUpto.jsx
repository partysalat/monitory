import React, { Component } from 'react';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';

class CountUpto extends Component {
  componentWillMount() {
    this.lastValue = 0;
  }


  render() {
    const { value } = this.props;
    const { lastValue } = this;
    this.lastValue = value;
    if (!isNumber(lastValue) || !isNumber(value)) {
      return <span>{value}</span>;
    }
    return (
      <CountUp start={lastValue} end={value} {...this.props} />
    );
  }
}


CountUpto.propTypes = {
  value: PropTypes.number.isRequired,
};
export default CountUpto;
