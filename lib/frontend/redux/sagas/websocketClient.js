import { eventChannel } from 'redux-saga';
import Nes from '@hapi/nes/lib/client';

const client = window.location.protocol === 'https:' ? new Nes.Client(`wss://${window.location.host}`) : new Nes.Client(`ws://${window.location.host}`);
let connectionPromise;
let onErrorCallback;
const RECONNECT_TIMEOUT = 5000;


function connectWithAuth() {
  return fetch('/nes/auth', {
    credentials: 'same-origin',
  }).then((res) => res.json())
    .then((res) => client.connect({ auth: res.token, reconnect: false }));
}
function reconnect() {
  connectionPromise = null;
  connectClient();
}

function connectClient() {
  if (!connectionPromise) {
    client.onDisconnect = reconnect;
    connectionPromise = connectWithAuth()
      .catch(() => {
        onErrorCallback && onErrorCallback();
        setTimeout(reconnect, RECONNECT_TIMEOUT);
      });
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

    })).then((data) => data.payload);
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
  onErrorCallback = cb;
  client.onError = cb;
}

export {
  subscribe,
  subscribeError,
  requestInitialData,
  onConnectionError,
};
