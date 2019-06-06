import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import { NASA } from '../constants/actionTypes';

function* searchNasa(action) {
  try {
    const res = yield call(Api.Nasa.searchNasa, action.query);
    yield put({ type: NASA.SEARCH_SUCCESS, data: res.data.collection });
  } catch (e) {
    yield put({ type: NASA.SEARCH_FAIL, message: e.message });
  }
}

function* nasaSaga() {
  yield takeLatest(NASA.SEARCH_REQUEST, searchNasa);
}

export default nasaSaga;
