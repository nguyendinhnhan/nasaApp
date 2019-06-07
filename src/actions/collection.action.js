import { COLLECTION } from '../constants/actionTypes';

export const fetchLocalCollectionAction = () => ({
  type: COLLECTION.FETCH_LOCAL_REQUEST
});

export const addNasaAction = item => ({
  type: COLLECTION.ADD_NASA_REQUEST,
  item
});

export const removeNasaAction = nasaId => ({
  type: COLLECTION.REMOVE_NASA_REQUEST,
  nasaId
});

export const updateNasaAction = data => ({
  type: COLLECTION.UPDATE_NASA_REQUEST,
  data
});
