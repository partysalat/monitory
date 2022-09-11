export const SUBSCRIBE = 'SUBSCRIBE';

export function subscribe(jobId: string) {
  return {
    type: SUBSCRIBE,
    payload: { jobId },
  };
}

export const NEW_DATA_RECEIVED = 'NEW_DATA_RECEIVED';
export function newDataReceived(key: string, data: any) {
  return {
    type: NEW_DATA_RECEIVED,
    payload: {
      key,
      data,
    },
  };
}
export const NEW_JOB_SUBSCRIBED = 'NEW_JOB_SUBSCRIBED';
export function newJobSubscribed(jobId: string) {
  return {
    type: NEW_JOB_SUBSCRIBED,
    payload: {
      jobId,
    },
  };
}

export const PLAY_AUDIO = 'PLAY_AUDIO';
export function playAudio(audioPath: string) {
  return {
    type: PLAY_AUDIO,
    payload: {
      audioPath,
    },
  };
}
