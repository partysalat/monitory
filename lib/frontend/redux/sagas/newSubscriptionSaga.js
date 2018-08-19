import { put, select, takeEvery } from 'redux-saga/effects';
import includes from 'lodash/includes';
import { newJobSubscribed, SUBSCRIBE } from '../actions';


function* subscribeWebsockets(action) {
  const { jobId } = action.payload;
  const subscribedJobs = yield select(state => state.subscribedJobs);
  if (includes(subscribedJobs, jobId)) {
    return;
  }
  yield put(newJobSubscribed(jobId));
}


export default function* () {
  yield takeEvery(SUBSCRIBE, subscribeWebsockets);
}

