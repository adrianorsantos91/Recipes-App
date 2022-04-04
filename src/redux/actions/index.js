export const DRINK_DATA = 'DRINK_DATA';
export const FOOD_DATA = 'FOOD_DATA';
export const FOOD_CATEGORY_DATA = 'FOOD_CATEGORY_DATA';
export const DRINKS_CATEGORY_DATA = 'DRINKS_CATEGORY_DATA';
export const DRINKS_PER_CATEGORY_DATA = 'DRINKS_PER_CATEGORY_DATA';
export const FOODS_PER_CATEGORY_DATA = 'FOODS_PER_CATEGORY_DATA';
export const FOOD_DATA_DETAILS = 'FOOD_DATA_DETAILS';
export const DRINK_DATA_DETAILS = 'DRINK_DATA_DETAILS';
export const DRINK_RECOMMENDATION = 'DRINK_RECOMMENDATION';
export const FOOD_RECOMMENDATION = 'FOOD_RECOMMENDATION';
export const FOOD_SURPRISE_ME = 'FOOD_SURPRISE_ME';
export const DRINK_SURPRISE_ME = 'DRINK_SURPRISE_ME';
export const INGREDIENTS_FOOD_LIST = 'INGREDIENTS_FOOD_LIST';

export const action = (type, payload) => ({
  type,
  payload,
});

export const fetchFoodsThunk = () => (
  (dispatch) => (
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then(({ meals }) => {
        dispatch(action(FOOD_DATA, meals));
      })
      .catch((error) => error.message)
  ));

export const fetchFoodsCategoryThunk = () => (
  (dispatch) => (
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then(({ meals: strCategory }) => {
        dispatch(action(FOOD_CATEGORY_DATA, strCategory));
      })
      .catch((error) => error.message)
  ));

export const fetchFoodsPerCategoryThunk = (category) => (
  (dispatch) => (
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then(({ meals: strMeal }) => {
        dispatch(action(FOODS_PER_CATEGORY_DATA, strMeal));
      })
      .catch((error) => error.message)
  ));

export const fetchDrinkThunk = () => (
  (dispatch) => (
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then(({ drinks }) => {
        dispatch(action(DRINK_DATA, drinks));
      })
      .catch((error) => error.message)
  )
);

export const fetchDrinksCategoryThunk = () => (
  (dispatch) => (
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then(({ drinks: strCategory }) => {
        dispatch(action(DRINKS_CATEGORY_DATA, strCategory));
      })
      .catch((error) => error.message)
  ));

export const fetchDrinksPerCategoryThunk = (category) => (
  (dispatch) => (
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then(({ drinks: strDrink }) => {
        dispatch(action(DRINKS_PER_CATEGORY_DATA, strDrink));
      })
      .catch((error) => error.message)
  ));

export const fetchRandomFoodsThunk = () => (
  (dispatch) => (
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then(({ meals }) => {
        dispatch(action(FOOD_SURPRISE_ME, meals));
      })
      .catch((error) => error.message)
  ));

export const fetchRandomDrinksThunk = () => (
  (dispatch) => (
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then(({ drinks }) => {
        dispatch(action(DRINK_SURPRISE_ME, drinks));
      })
      .catch((error) => error.message)
  ));

export const fetchIngredientsListThunk = () => (
  (dispatch) => (
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json())
      .then(({ meals }) => {
        dispatch(action(INGREDIENTS_FOOD_LIST, meals));
      })
      .catch((error) => error.message)
  ));

// const URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const fetchName = async () => {
//   const { meals } = await fetch(URL_NAME).then((response) => response.json());
//   dispatch(action(FOOD_DATA, meals));
// };
// fetchName();

// export const fetchFoodsName = (name) => {
//   const URL_NAME = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

//   return fetch(URL_NAME)
//     .then((response) => response.json())
//     .then((data) => data)
//     .catch((error) => error);
// };

// export const fetchFoodsFirstLetter = (firstLetter) => {
//   const URL_FIRST_LETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

//   return fetch(URL_FIRST_LETTER)
//     .then((response) => response.json())
//     .then((data) => data)
//     .catch((error) => error);
// };
