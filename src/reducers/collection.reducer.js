import { COLLECTION } from '../constants/actionTypes';

const initialState = {
  localCollection: {
    status: '',
    result: null,
    error: null,
    requesting: false
  }
};

export default function(state = initialState, payload) {
  switch (payload.type) {
    /* Add nasa to COLLECTION */
    case COLLECTION.FETCH_LOCAL_REQUEST:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          requesting: true,
          status: ''
        }
      };
    case COLLECTION.FETCH_LOCAL_SUCCESS:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          status: 'success',
          requesting: false,
          result: payload.data
        }
      };
    case COLLECTION.FETCH_LOCAL_FAIL:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          status: 'error',
          requesting: false,
          error: payload.message
        }
      };

    default:
      return state;
  }
}
