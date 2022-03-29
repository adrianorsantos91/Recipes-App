import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';

const rootReducer = combineReducers({
  login,
  foodData,
});

export default rootReducer;
