import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { COLLECTION } from '../constants/actionTypes';
import { NASA_COLLECTION } from '../constants/appConstants';

async function retrieveData() {
  let result;
  try {
    const nasaColletion = await AsyncStorage.getItem(NASA_COLLECTION);
    if (nasaColletion) {
      result = await AsyncStorage.multiGet(JSON.parse(nasaColletion));
    }
  } catch (error) {
    result = error;
  }
  return result;
}

function* fetchLocalCollection() {
  try {
    const res = yield call(retrieveData);
    yield put({
      type: COLLECTION.FETCH_LOCAL_SUCCESS,
      data: res
    });
  } catch (e) {
    yield put({ type: COLLECTION.FETCH_LOCAL_FAIL, message: e.message });
  }
}

function* collectionSaga() {
  yield takeLatest(COLLECTION.FETCH_LOCAL_REQUEST, fetchLocalCollection);
}

export default collectionSaga;
