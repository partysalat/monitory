import { takeLatest } from 'redux-saga/effects';
import { PLAY_AUDIO } from '../actions';
import { toast } from 'react-toastify';

const audioObjects = {};
function* playSoundSaga(action) {
  const { audioPath } = action.payload;
  if (!audioObjects[audioPath]) {
    const myAudio = document.createElement('audio');
    myAudio.setAttribute('src', audioPath);
    audioObjects[audioPath] = myAudio;
  }
  yield audioObjects[audioPath].play()
    .catch(() => toast.error(`Soundfile ${audioPath} cannot be found!`));
}


export default function* () {
  yield takeLatest(PLAY_AUDIO, playSoundSaga);
}

