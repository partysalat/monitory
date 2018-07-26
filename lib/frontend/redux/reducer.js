import { combineReducers } from 'redux';
import { NEW_DATA_RECEIVED } from './actions';

function jobDataReducer(state = [], action) {
  switch (action.type) {
    case NEW_DATA_RECEIVED:
      return {
        ...state,
        [action.payload.key]: {
          current: action.payload.data,
          lastUpdated: new Date(),
        },
      };
    default:
      return state;
  }
}


export default combineReducers({
  jobData: jobDataReducer,
});
