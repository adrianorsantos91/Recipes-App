import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';
<<<<<<< HEAD
import foodDataDetails from './foodDetailsAPIData';
import drinkDataDetails from './drinkDetailsAPIData';
import drinksRecommendation from './drinksRecommendationAPIData';
import foodsRecommendation from './foodsRecommendationAPIData';
=======
import categoryFoodData from './foodCategoryAPIData';
>>>>>>> 4d6d14edbd0fd33bc30c19e1ccce7b20655fb46e

const rootReducer = combineReducers({
  login,
  foodData,
  drinkData,
<<<<<<< HEAD
  foodDataDetails,
  drinkDataDetails,
  drinksRecommendation,
  foodsRecommendation,
=======
  categoryFoodData,
>>>>>>> 4d6d14edbd0fd33bc30c19e1ccce7b20655fb46e
});

export default rootReducer;
