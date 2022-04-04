import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';
import categoryFoodData from './foodCategoryAPIData';
import foodsPerCategory from './foodsPerCategory';
import categoryDrinkData from './drinkCategoryAPIData';
import drinksPerCategory from './drinksPerCategory';
import foodDataDetails from './foodDetailsAPIData';
import drinkDataDetails from './drinkDetailsAPIData';
import drinksRecommendation from './drinksRecommendationAPIData';
import foodsRecommendation from './foodsRecommendationAPIData';
import nationalities from './nationalities';
import foodNationalities from './foodsNationality';

const rootReducer = combineReducers({
  login,
  foodData,
  categoryFoodData,
  drinkData,
  categoryDrinkData,
  drinksPerCategory,
  foodsPerCategory,
  foodDataDetails,
  drinkDataDetails,
  drinksRecommendation,
  foodsRecommendation,
  nationalities,
  foodNationalities,
});

export default rootReducer;
