import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';
import categoryFoodData from './foodCategoryAPIData';
import foodsPerCategory from './foodsPerCategory';
import categoryDrinkData from './drinkCategoryAPIData';
import drinksPerCategory from './drinksPerCategory';

const rootReducer = combineReducers({
  login,
  foodData,
  categoryFoodData,
  drinkData,
  categoryDrinkData,
  drinksPerCategory,
  foodsPerCategory,
});

export default rootReducer;
