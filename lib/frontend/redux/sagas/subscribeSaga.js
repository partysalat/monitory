import { call, put, take, takeEvery } from 'redux-saga/effects';
import { requestInitialData, subscribe } from './websocketClient';
import { NEW_JOB_SUBSCRIBED, newDataReceived } from '../actions';

function* subscribeWebsockets(action) {
  const { jobId } = action.payload;

  const payload = yield call(requestInitialData, [jobId]);
  yield put(newDataReceived(jobId, payload[jobId]));

  const chan = yield call(subscribe, jobId);
  while (true) {
    const data = yield take(chan);
    yield put(newDataReceived(jobId, data[jobId]));
  }
}

export default function* () {
  yield takeEvery(NEW_JOB_SUBSCRIBED, subscribeWebsockets);
}
