import { NASA } from '../constants/actionTypes';

const initialState = {
  feed: {
    status: '',
    result: null,
    error: null,
    requesting: false
  }
};

export default function(state = initialState, payload) {
  switch (payload.type) {
    /* Search NASA */
    case NASA.SEARCH_REQUEST:
      return {
        ...state,
        feed: {
          ...state.feed,
          requesting: true,
          status: ''
        }
      };
    case NASA.SEARCH_SUCCESS:
      return {
        ...state,
        feed: {
          ...state.feed,
          status: 'success',
          requesting: false,
          result: payload.data
        }
      };
    case NASA.SEARCH_FAIL:
      return {
        ...state,
        feed: {
          ...state.feed,
          status: 'error',
          requesting: false,
          error: payload.message
        }
      };

    default:
      return state;
  }
}
