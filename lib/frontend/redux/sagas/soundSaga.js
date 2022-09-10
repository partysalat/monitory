import { takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { PLAY_AUDIO } from '../actions';

const audioObjects = {};
function* playSoundSaga(action) {
  const { audioPath } = action.payload;
  if (!audioObjects[audioPath]) {
    const audio = document.createElement('audio');
    audio.setAttribute('src', audioPath);
    audioObjects[audioPath] = audio;
  }
  yield audioObjects[audioPath]
    .play()
    .catch(() => toast.error(`Soundfile ${audioPath} cannot be found!`));
}

export default function* () {
  yield takeLatest(PLAY_AUDIO, playSoundSaga);
}
