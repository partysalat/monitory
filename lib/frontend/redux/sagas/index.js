import { fork } from 'redux-saga/effects';
import subscribeSaga from './subscribeSaga';


export default function* rootSaga() {
  yield [
    fork(subscribeSaga),
  ];
}
