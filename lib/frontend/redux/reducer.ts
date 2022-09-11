import { combineReducers } from 'redux';
import {
  NEW_DATA_RECEIVED,
  NEW_JOB_SUBSCRIBED,
  newDataReceived,
  newJobSubscribed,
} from './actions';
import { AppState } from './initialState';
import { PayloadAction } from '@reduxjs/toolkit';

function jobDataReducer(state = {}, action: PayloadAction<unknown>) {
  switch (action.type) {
    case NEW_DATA_RECEIVED: {
      const newDataReceivedAction = action as ReturnType<
        typeof newDataReceived
      >;
      return {
        ...state,
        [newDataReceivedAction.payload.key]: {
          current: newDataReceivedAction.payload.data,
          lastUpdated: new Date(),
        },
      };
    }
    default:
      return state;
  }
}
function subscribedJobsReducer(
  state: string[] = [],
  action: PayloadAction<unknown>
) {
  switch (action.type) {
    case NEW_JOB_SUBSCRIBED: {
      const newJobSubscribedAction = action as ReturnType<
        typeof newJobSubscribed
      >;
      return [...state, newJobSubscribedAction.payload.jobId];
    }
    default:
      return state;
  }
}

export default combineReducers<AppState>({
  jobData: jobDataReducer,
  subscribedJobs: subscribedJobsReducer,
});
