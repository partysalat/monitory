import { fork } from 'redux-saga/effects';
import subscribeSaga from './subscribeSaga';
import jobProcessingErrorSaga from './jobProcessingErrorSaga';


export default function* rootSaga() {
  yield [
    fork(subscribeSaga),
    fork(jobProcessingErrorSaga),
  ];
}
