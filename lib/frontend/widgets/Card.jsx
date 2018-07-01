import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribe } from '../redux/actions';

class Card extends Component {
  componentWillMount() {
    this.props.subscribe(this.props.job);
  }

  render() {
    const viewValue = this.props.value(this.props);
    return (
      <div>{viewValue}</div>
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
