import { COLLECTION } from '../constants/actionTypes';

export const fetchLocalCollectionAction = () => ({
  type: COLLECTION.FETCH_LOCAL_REQUEST
});

export const addNasaAction = item => ({
  type: COLLECTION.ADD_NASA_REQUEST,
  item
});
