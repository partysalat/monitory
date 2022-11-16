import { call, take, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { onConnectionError, subscribeError } from './websocketClient';
import { NEW_JOB_SUBSCRIBED } from '../actions';

function* subscribeWebsockets(action) {
  const { jobId } = action.payload;

  const chan = yield call(subscribeError, jobId);
  while (true) {
    yield take(chan);
    yield call(toast.warn, `Error occured while processing Job ${jobId}!`);
  }
}

export default function* () {
  onConnectionError(() => toast.error('Websocket connection error occured'));
  yield takeEvery(NEW_JOB_SUBSCRIBED, subscribeWebsockets);
}
