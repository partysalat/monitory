import { combineReducers } from 'redux';
import { NEW_DATA_RECEIVED } from './actions';

function jobDataReducer(state = [], action) {
  switch (action.type) {
    case NEW_DATA_RECEIVED:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    default:
      return state;
  }
}


export default combineReducers({
  jobData: jobDataReducer,
});
