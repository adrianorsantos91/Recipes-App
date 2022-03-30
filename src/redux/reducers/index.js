import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';
import categoryFoodData from './foodCategoryAPIData';
import categoryDrinkData from './drinkCategoryAPIData';

const rootReducer = combineReducers({
  login,
  foodData,
  drinkData,
  categoryFoodData,
  categoryDrinkData,
});

export default rootReducer;
