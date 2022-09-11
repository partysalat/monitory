import React, { Component, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { subscribe } from '../redux/actions';
import { AppState } from '../redux/initialState';

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

export function useSubscription(jobId: string) {
  const dispatch = useDispatch();
  const state = useSelector<AppState>((state) => state.jobData[jobId]);
  useEffect(() => {
    dispatch(subscribe(jobId));
  }, []);
  return state;
}
