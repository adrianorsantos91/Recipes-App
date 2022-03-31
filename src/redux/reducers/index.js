import { combineReducers } from 'redux';
import login from './loginReducer';
import foodData from './foodAPIData';
import drinkData from './drinkAPIData';
import foodDataDetails from './foodDetailsAPIData';
import drinkDataDetails from './drinkDetailsAPIData';
import drinksRecommendation from './drinksRecommendationAPIData';
import foodsRecommendation from './foodsRecommendationAPIData';

const rootReducer = combineReducers({
  login,
  foodData,
  drinkData,
  foodDataDetails,
  drinkDataDetails,
  drinksRecommendation,
  foodsRecommendation,
});

export default rootReducer;
