import { eventChannel } from 'redux-saga';
import Nes from 'nes';

const client = new Nes.Client(`ws://${window.location.host}`);
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

function websocketToChannel(jobId, topic) {
  return eventChannel((emitter) => {
    const handler = (update) => {
      emitter(update);
    };
    client.subscribe(topic, handler);
    return () => {
      client.unsubscribe(topic, handler);
    };
  });
}


function subscribe(jobId) {
  return websocketToChannel(jobId, `/job/${jobId}`);
}
function subscribeError(jobId) {
  return websocketToChannel(jobId, `/job/${jobId}/error`);
}
function onConnectionError(cb) {
  client.onError = cb;
}

export {
  subscribe,
  subscribeError,
  requestInitialData,
  onConnectionError,
};
