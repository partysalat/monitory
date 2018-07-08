import { call, put, take, takeEvery } from 'redux-saga/effects';
import includes from 'lodash/includes';
import { toast } from 'react-toastify';

import { subscribeError } from './websocketClient';
import { SUBSCRIBE } from '../actions';

const alreadyHandledJobIds = [];

function* subscribeWebsockets(action) {
  const { jobId } = action.payload;
  if (includes(alreadyHandledJobIds, jobId)) {
    return;
  }
  alreadyHandledJobIds.push(jobId);

  const chan = yield call(subscribeError, jobId);
  while (true) {
    yield take(chan);
    yield call(toast.warn, `Error occured while processing Job ${jobId}!`);
  }
}


export default function* () {
  yield takeEvery(SUBSCRIBE, subscribeWebsockets);
}

