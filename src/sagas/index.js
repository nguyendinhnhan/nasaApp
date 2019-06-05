import { all, fork } from 'redux-saga/effects';
import nasaSaga from './nasa.saga';

export default function* sagas() {
  yield all([fork(nasaSaga)]);
}
