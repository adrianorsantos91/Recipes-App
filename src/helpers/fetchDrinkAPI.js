export const fetchDrinksIngredients = (ingredient) => {
  const URL_INGREDIENTS = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  return fetch(URL_INGREDIENTS)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export const fetchDrinksName = (name) => {
  const URL_NAME = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

  return fetch(URL_NAME)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export const fetchDrinksFirstLetter = (firstLetter) => {
  const URL_FIRST_LETTER = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  return fetch(URL_FIRST_LETTER)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};
