import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

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

async function _storeData(item) {
  const nasaId = _.get(item, 'data[0].nasa_id');
  try {
    let collection = await AsyncStorage.getItem(NASA_COLLECTION);
    collection = _.concat(JSON.parse(collection) || [], nasaId);
    const firstPair = [NASA_COLLECTION, JSON.stringify(collection)];
    const secondPair = [nasaId, JSON.stringify(item)];
    await AsyncStorage.multiSet([firstPair, secondPair]);

    return nasaId;
  } catch (error) {
    return error;
  }
}

function* addNasaToCollection({ item }) {
  try {
    const res = yield call(_storeData, item);
    yield put({
      type: COLLECTION.ADD_NASA_SUCCESS,
      data: [res, JSON.stringify(item)]
    });
  } catch (e) {
    yield put({ type: COLLECTION.ADD_NASA_FAIL, message: e.message });
  }
}

export function* collectionSaga() {
  yield all([
    takeLatest(COLLECTION.FETCH_LOCAL_REQUEST, fetchLocalCollection),
    takeLatest(COLLECTION.ADD_NASA_REQUEST, addNasaToCollection)
  ]);
}
