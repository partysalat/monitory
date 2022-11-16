import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { subscribe } from '../redux/actions';
import { AppState, JobData } from '../redux/initialState';

export function useSubscription<C>(jobId: string): JobData<C> | undefined {
  const dispatch = useDispatch();
  const state = useSelector<AppState, JobData<C> | undefined>(
    (state) => state.jobData[jobId] as JobData<C>
  );
  useEffect(() => {
    dispatch(subscribe(jobId));
  }, []);
  return state;
}
