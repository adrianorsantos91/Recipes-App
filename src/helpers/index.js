import { fetchFirstLetter, fetchIngredients, fetchName } from './fetchFoodAPI';

export const minPasswordLength = 6;

export const requestFoodObject = {
  'ingredient-search': (searchInput) => fetchIngredients(searchInput),
  'name-search': (searchInput) => fetchName(searchInput),
  'first-letter-search': (searchInput) => (
    searchInput.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : fetchFirstLetter(searchInput)
  ),
  '': () => global.alert('Select any option'),
};
