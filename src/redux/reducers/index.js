import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';
import categoryFoodData from './foodCategoryAPIData';

const rootReducer = combineReducers({
  login,
  foodData,
  drinkData,
  categoryFoodData,
});

export default rootReducer;
