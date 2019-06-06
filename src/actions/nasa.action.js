import { NASA } from '../constants/actionTypes';

export const searchNasaAction = query => ({
  type: NASA.SEARCH_REQUEST,
  query
});
