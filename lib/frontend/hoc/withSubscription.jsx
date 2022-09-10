import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { subscribe } from '../redux/actions';

export default function withSubscription(WrappedComponent) {
  function mapStateToProps(state, props) {
    return { ...state.jobData[props.job] };
  }
  function mapDispatchToProps(dispatch) {
    return {
      subscribe: (jobId) => dispatch(subscribe(jobId)),
    };
  }

  const WithSubscriptionClass = class extends Component {
    static propTypes = {
      job: PropTypes.string.isRequired,
      subscribe: PropTypes.func.isRequired,
    };

    componentWillMount() {
      this.props.subscribe(this.props.job);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithSubscriptionClass);
}
