import { call, put, take, takeEvery, fork, cancel } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Nes from 'nes';
import { newDataReceived, SUBSCRIBE } from '../actions';

const client = new Nes.Client('ws://localhost:1337');
let connectionPromise;
function connectClient() {
  if (!connectionPromise) {
    connectionPromise = client.connect();
  }
  return connectionPromise;
}
function requestInitialData(jobIds) {
  return connectClient()
    .then(() => client.request({
      path: '/job-data',
      // It has to be a post because nes library does not
      // support query parameters for GET request m(
      method: 'POST',
      payload: { ids: jobIds },

    })).then(data => data.payload);
}

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
  yield takeEvery(SUBSCRIBE, subscribeWebsockets);
}

