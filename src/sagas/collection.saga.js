import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import { COLLECTION } from '../constants/actionTypes';
import { NASA_COLLECTION } from '../constants/appConstants';

async function _retrieveData() {
  let result;
  try {
    const nasaColletion = await AsyncStorage.getItem(NASA_COLLECTION);
    if (nasaColletion) {
      result = await AsyncStorage.multiGet(JSON.parse(nasaColletion));
    }
  } catch (error) {
    throw error;
  }
  return result;
}

function* fetchLocalCollection() {
  try {
    const res = yield call(_retrieveData);
    yield put({
      type: COLLECTION.FETCH_LOCAL_SUCCESS,
      data: res
    });
  } catch (e) {
    yield put({ type: COLLECTION.FETCH_LOCAL_FAIL, message: e.message });
  }
}

async function _storeData(nasaId, item) {
  try {
    let collection = await AsyncStorage.getItem(NASA_COLLECTION);
    collection = _.concat(JSON.parse(collection) || [], nasaId);
    const firstPair = [NASA_COLLECTION, JSON.stringify(collection)];
    const secondPair = [nasaId, JSON.stringify(item)];
    await AsyncStorage.multiSet([firstPair, secondPair]);
  } catch (error) {
    throw error;
  }
  return nasaId;
}

function* addNasaToCollection({ item }) {
  try {
    const { result } = yield select(state => state.collection.localCollection);
    const nasaId = _.get(item, 'data[0].nasa_id');
    const existed = result.find(nasa => nasa[0] === nasaId);
    if (!existed) {
      const res = yield call(_storeData, nasaId, item);
      yield put({
        type: COLLECTION.ADD_NASA_SUCCESS,
        data: [res, JSON.stringify(item)]
      });
    }
  } catch (e) {
    yield put({ type: COLLECTION.ADD_NASA_FAIL, message: e.message });
  }
}

async function _removeData(nasaId) {
  try {
    await AsyncStorage.removeItem(nasaId);
    let collection = await AsyncStorage.getItem(NASA_COLLECTION);
    collection = JSON.parse(collection);
    _.remove(collection, id => id === nasaId);
    await AsyncStorage.setItem(NASA_COLLECTION, JSON.stringify(collection));
  } catch (error) {
    throw error;
  }
  return nasaId;
}

function* removeNasaToCollection({ nasaId }) {
  try {
    const res = yield call(_removeData, nasaId);
    yield put({
      type: COLLECTION.REMOVE_NASA_SUCCESS,
      data: res
    });
  } catch (e) {
    yield put({ type: COLLECTION.REMOVE_NASA_FAIL, message: e.message });
  }
}

async function _updateData(nasaId, data) {
  try {
    await AsyncStorage.mergeItem(nasaId, data);
  } catch (error) {
    throw error;
  }
  return nasaId;
}

function* updateNasaOfCollection({ formData }) {
  const nasaId = formData.id;
  const newData = {
    links: [
      {
        href: formData.imageUrl
      }
    ],
    data: [
      {
        title: formData.title,
        nasa_id: nasaId,
        description: formData.description
      }
    ]
  };
  try {
    const res = yield call(_updateData, nasaId, newData);
    yield put({
      type: COLLECTION.UPDATE_NASA_SUCCESS,
      data: [res, JSON.stringify(newData)]
    });
  } catch (e) {
    yield put({ type: COLLECTION.UPDATE_NASA_FAIL, message: e.message });
  }
}

function* favoriteNasaOfCollection({ data }) {
  const nasaId = _.get(data, 'nasaId');
  const newData = { isFavorite: data.isFavorite };

  try {
    const res = yield call(_updateData, nasaId, newData);
    yield put({
      type: COLLECTION.FAVORITE_NASA_SUCCESS,
      data: [res, JSON.stringify(newData)]
    });
  } catch (e) {
    yield put({ type: COLLECTION.FAVORITE_NASA_FAIL, message: e.message });
  }
}

export function* collectionSaga() {
  yield all([
    takeLatest(COLLECTION.FETCH_LOCAL_REQUEST, fetchLocalCollection),
    takeLatest(COLLECTION.ADD_NASA_REQUEST, addNasaToCollection),
    takeLatest(COLLECTION.FAVORITE_NASA_REQUEST, favoriteNasaOfCollection),
    takeLatest(COLLECTION.REMOVE_NASA_REQUEST, removeNasaToCollection),
    takeLatest(COLLECTION.UPDATE_NASA_REQUEST, updateNasaOfCollection)
  ]);
}
