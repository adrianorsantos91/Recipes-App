import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';
import foodDataDetails from './foodDetailsAPIData';
import drinkDataDetails from './drinkDetailsAPIData';

const rootReducer = combineReducers({
  login,
  foodData,
  drinkData,
  foodDataDetails,
  drinkDataDetails,
});

export default rootReducer;
