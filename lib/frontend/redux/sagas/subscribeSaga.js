import { call, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Nes from 'nes';
import { newDataReceived, SUBSCRIBE } from '../actions';

const client = new Nes.Client('ws://localhost:1337');
client.connect();

function subscribe(jobId) {
  return eventChannel((emitter) => {
    const handler = (update, flags) => {
      emitter(update);
    };
    client.subscribe(`/job/${jobId}`, handler);
    return () => {
      client.unsubscribe(`/job/${jobId}`, handler);
    };
  });
}


function* subscribeWebsockets(action) {
  const chan = yield call(subscribe, action.payload.jobId);
  while (true) {
    const data = yield take(chan);
    yield put(newDataReceived(data));
  }
}

export default function* () {
  yield takeEvery(SUBSCRIBE, subscribeWebsockets);
}

