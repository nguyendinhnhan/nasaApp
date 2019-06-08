import _ from 'lodash';
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
    /* Fetch Local Collection */
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

    /* Add nasa to COLLECTION */
    case COLLECTION.ADD_NASA_REQUEST:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          requesting: true,
          status: ''
        }
      };
    case COLLECTION.ADD_NASA_SUCCESS:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          status: 'success',
          requesting: false,
          result: _.concat(state.localCollection.result || [], [payload.data])
        }
      };
    case COLLECTION.ADD_NASA_FAIL:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          status: 'error',
          requesting: false,
          error: payload.message
        }
      };

    /* Remove nasa to COLLECTION */
    case COLLECTION.REMOVE_NASA_REQUEST:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          requesting: true,
          status: ''
        }
      };
    case COLLECTION.REMOVE_NASA_SUCCESS:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          status: 'success',
          requesting: false,
          result: _.reject(
            state.localCollection.result,
            item => item[0] === payload.data
          )
        }
      };
    case COLLECTION.REMOVE_NASA_FAIL:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          status: 'error',
          requesting: false,
          error: payload.message
        }
      };

    /* Remove nasa to COLLECTION */
    case COLLECTION.UPDATE_NASA_REQUEST:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          requesting: true,
          status: ''
        }
      };
    case COLLECTION.UPDATE_NASA_SUCCESS:
      return {
        ...state,
        localCollection: {
          ...state.localCollection,
          status: 'success',
          requesting: false,
          result: _.map(state.localCollection.result, item => {
            if (item[0] === payload.data[0]) {
              return [
                item[0],
                JSON.stringify(
                  _.merge(JSON.parse(item[1]), JSON.parse(payload.data[1]))
                )
              ];
            }
            return item;
          })
        }
      };
    case COLLECTION.UPDATE_NASA_FAIL:
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
