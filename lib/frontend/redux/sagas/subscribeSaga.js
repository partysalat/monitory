import {call, put, take, takeEvery} from 'redux-saga/effects';
import includes from 'lodash/includes';
import {requestInitialData, subscribe} from './websocketClient';
import {newDataReceived, SUBSCRIBE} from '../actions';

const alreadyHandledJobIds = [];

function* subscribeWebsockets(action) {
  const { jobId } = action.payload;
  if (includes(alreadyHandledJobIds, jobId)) {
    return;
  }
  alreadyHandledJobIds.push(jobId);

  const payload = yield call(requestInitialData, [jobId]);
  yield put(newDataReceived(jobId, payload[jobId]));

  const chan = yield call(subscribe, jobId);
  while (true) {
    const data = yield take(chan);
    yield put(newDataReceived(jobId, data[jobId]));
  }
}


export default function* () {
  yield takeEvery(SUBSCRIBE, subscribeWebsockets);
}

