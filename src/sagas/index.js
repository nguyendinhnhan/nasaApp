import { all, fork } from 'redux-saga/effects';
import { nasaSaga } from './nasa.saga';
import { collectionSaga } from './collection.saga';

export default function* sagas() {
  yield all([fork(nasaSaga), fork(collectionSaga)]);
}
