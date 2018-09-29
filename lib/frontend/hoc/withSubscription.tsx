import * as React from 'react';
import { connect } from 'react-redux';

import { subscribe } from '../redux/actions';
interface WithSubscriptionProps<T, U> {
    job: string,
    subscribe:(jobId:string) => null
}
export default <T, U>(WrappedComponent: typeof React.Component) => {
  function mapStateToProps(state:any, props:WithSubscriptionProps<T,U>) {
    return { ...state.jobData[props.job] };
  }
  function mapDispatchToProps(dispatch) {
    return {
      subscribe: jobId => dispatch(subscribe(jobId)),
    };
  }

  const WithSubscriptionClass = class extends React.Component<WithSubscriptionProps<T,U>,any> {
    componentWillMount() {
      this.props.subscribe(this.props.job);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithSubscriptionClass);
}
