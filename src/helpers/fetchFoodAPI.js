export const fetchFoodsIngredients = (ingredient) => {
  const URL_INGREDIENTS = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  return fetch(URL_INGREDIENTS)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error.message);
};

export const fetchFoodsName = (name) => {
  const URL_NAME = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  return fetch(URL_NAME)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error.message);
};

export const fetchFoodsFirstLetter = (firstLetter) => {
  const URL_FIRST_LETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  return fetch(URL_FIRST_LETTER)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error.message);
};
