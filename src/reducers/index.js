import { combineReducers } from 'redux';
import nasa from './nasa.reducer';
import collection from './collection.reducer';

export default combineReducers({
  nasa,
  collection
});
