import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';

const rootReducer = combineReducers({
  login,
  foodData,
  drinkData,
});

export default rootReducer;
