import { fetchFirstLetter, fetchIngredients, fetchName } from './fetchFoodAPI';

export const minPasswordLength = 6;

export const requestFoodObject = {
  'ingredient-search': (searchInput) => fetchIngredients(searchInput),
  'name-search': (searchInput) => fetchName(searchInput),
  'first-letter-search': (searchInput) => fetchFirstLetter(searchInput),
  '': () => global.alert('Select any option'),
};
