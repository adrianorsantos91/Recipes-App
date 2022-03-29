export const minPasswordLength = 6;

const fetchIngredients = (ingredient) => {
  const URL_INGREDIENTS = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  fetch(URL_INGREDIENTS)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const fetchName = (name) => {
  const URL_NAME = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  fetch(URL_NAME)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const fetchFirstLetter = (firstLetter) => {
  const URL_FIRST_LETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  fetch(URL_FIRST_LETTER)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const requestObject = {
  'ingredient-search': (searchInput) => fetchIngredients(searchInput),
  'name-search': (searchInput) => fetchName(searchInput),
  'first-letter-search': (searchInput) => (
    searchInput.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : fetchFirstLetter(searchInput)
  ),
  '': () => global.alert('Select any option'),
};
