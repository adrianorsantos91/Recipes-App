export const fetchIngredients = (ingredient) => {
  const URL_INGREDIENTS = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  fetch(URL_INGREDIENTS)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchName = (name) => {
  const URL_NAME = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  fetch(URL_NAME)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchFirstLetter = (firstLetter) => {
  const URL_FIRST_LETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  fetch(URL_FIRST_LETTER)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
