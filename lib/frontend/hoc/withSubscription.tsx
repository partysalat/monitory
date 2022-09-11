import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { subscribe } from '../redux/actions';
import { AppState, JobData } from '../redux/initialState';

type WithSubscriptionProps = { job: string };

export default function withSubscription<T extends JobData>(
  WrappedComponent: React.FC<T>
) {
  return function (props: WithSubscriptionProps & T) {
    const state = useSubscription(props.job);
    return <WrappedComponent {...props} {...state} />;
  };
}

export function useSubscription(jobId: string) {
  const dispatch = useDispatch();
  const state = useSelector<AppState, JobData | undefined>(
    (state) => state.jobData[jobId]
  );
  useEffect(() => {
    dispatch(subscribe(jobId));
  }, []);
  return state;
}
