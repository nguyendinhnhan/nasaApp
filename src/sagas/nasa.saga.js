import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import { NASA } from '../constants/actionTypes';

function* searchNasa() {
  try {
    const res = yield call(Api.Nasa.searchNasa);
    yield put({ type: NASA.SEARCH_SUCCESS, data: res.collection });
  } catch (e) {
    yield put({ type: NASA.SEARCH_FAIL, message: e.message });
  }
}

function* nasaSaga() {
  yield takeLatest(NASA.SEARCH_REQUEST, searchNasa);
}

export default nasaSaga;
