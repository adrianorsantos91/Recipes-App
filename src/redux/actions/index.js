export const DRINK_DATA = 'DRINK_DATA';
export const FOOD_DATA = 'FOOD_DATA';
export const FOOD_DATA_DETAILS = 'FOOD_DATA_DETAILS';
export const DRINK_DATA_DETAILS = 'DRINK_DATA_DETAILS';

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
