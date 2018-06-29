import { SUBSCRIBE } from './../actions';
import { takeEvery } from 'redux-saga/effects';

function fetchUser(action) {
  console.log('SUBSCRIBE EVENT', action);
}

export default function* () {
  yield takeEvery(SUBSCRIBE, fetchUser);
}
