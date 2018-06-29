export const SUBSCRIBE = 'SUBSCRIBE';

export function subscribe(property) {
  return {
    type: SUBSCRIBE,
    payload: { property },
  };
}

export const NEW_DATA_RECEIVED = 'NEW_DATA_RECEIVED';

export function newDataReceived(key, data) {
  return {
    type: NEW_DATA_RECEIVED,
    payload: {
      key,
      data,
    },
  };
}

