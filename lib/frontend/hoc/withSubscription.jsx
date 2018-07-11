import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribe } from '../redux/actions';

export default function withSubscription(WrappedComponent) {
  function mapStateToProps(state, props) {
    return { ...state.jobData[props.job] };
  }
  function mapDispatchToProps(dispatch) {
    return {
      subscribe: jobId => dispatch(subscribe(jobId)),
    };
  }

  const WithSubscriptionClass = class extends Component {
    componentWillMount() {
      this.props.subscribe(this.props.job);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithSubscriptionClass);
}
