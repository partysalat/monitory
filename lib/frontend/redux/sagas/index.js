import { fork, all } from 'redux-saga/effects';
import subscribeSaga from './subscribeSaga';
import jobProcessingErrorSaga from './jobProcessingErrorSaga';
import newSubscriptionSaga from './newSubscriptionSaga';
import soundSaga from './soundSaga';


export default function* rootSaga() {
  yield all([
    fork(newSubscriptionSaga),
    fork(subscribeSaga),
    fork(jobProcessingErrorSaga),
    fork(soundSaga),

  ]);
}
