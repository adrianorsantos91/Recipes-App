import { action, FOOD_DATA_DETAILS, DRINK_RECOMMENDATION } from '../redux/actions';

export const fetchFoodById = (idFood) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`)
  .then((response) => response.json())
  .then(({ meals }) => {
    dispatch(action(FOOD_DATA_DETAILS, meals));
  })
  .catch((error) => error.message);

export const fetchDrinkRecommendation = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
  .then((response) => response.json())
  .then(({ drinks }) => {
    dispatch(action(DRINK_RECOMMENDATION, drinks));
  })
  .catch((error) => error.message);
