import {
  fetchFoodsFirstLetter,
  fetchFoodsIngredients,
  fetchFoodsName,
} from './fetchFoodAPI';

import {
  fetchDrinksFirstLetter,
  fetchDrinksIngredients,
  fetchDrinksName,
} from './fetchDrinkAPI';

import {
  foodRecipeInProgress,
  drinkRecipeInProgress,
} from './recipesInProgress';

export const minPasswordLength = 6;
export const FIRST_TWELVE_RECIPES = 12;
export const FIRST_FIVE_CATEGORIES = 5;

export const requestFoodObject = {
  'ingredient-search': (searchInput) => fetchFoodsIngredients(searchInput),
  'name-search': (searchInput) => fetchFoodsName(searchInput),
  'first-letter-search': (searchInput) => fetchFoodsFirstLetter(searchInput),
  '': () => global.alert('Select any option'),
};

export const requestDrinkObject = {
  'ingredient-search': (searchInput) => fetchDrinksIngredients(searchInput),
  'name-search': (searchInput) => fetchDrinksName(searchInput),
  'first-letter-search': (searchInput) => fetchDrinksFirstLetter(searchInput),
  '': () => global.alert('Select any option'),
};

export const recipesInProgress = {
  foods: (id, name, inProgress, setInProgress) => (
    foodRecipeInProgress(id, name, inProgress, setInProgress)
  ),
  drinks: (id, name, inProgress, setInProgress) => (
    drinkRecipeInProgress(id, name, inProgress, setInProgress)
  ),
};

export const requestFoodAPI = (setRecipe, idRecipe) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
    .then((response) => response.json())
    .then(({ meals }) => {
      const [meal] = meals;

      const ingredientKeys = Object.keys(meal)
        .filter((key) => key.includes('strIngredient'));

      const ingredientsList = Object.entries(meal)
        .filter((arrayFiltered) => (
          ingredientKeys
            .some((ingredient) => ingredient === arrayFiltered[0] && arrayFiltered[1])
        )).map((element) => element[1]);

      const objectRecipe = {
        title: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        instructions: meal.strInstructions,
        ingredients: ingredientsList,
        id: meal.idMeal,
        nationality: meal.strArea || '',
        tags: meal.strTags || [],
      };

      setRecipe(objectRecipe);
    })
    .catch((error) => error.message)
);

export const requestDrinkAPI = (setRecipe, idRecipe) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
    .then((response) => response.json())
    .then(({ drinks }) => {
      const [drink] = drinks;
      const ingredientKeys = Object.keys(drink)
        .filter((key) => key.includes('strIngredient'));

      const ingredientsList = Object.entries(drink)
        .filter((arrayFiltered) => (
          ingredientKeys
            .some((ingredient) => ingredient === arrayFiltered[0] && arrayFiltered[1])
        )).map((element) => element[1]);

      const objectRecipe = {
        title: drink.strDrink,
        image: drink.strDrinkThumb,
        category: drink.strCategory,
        instructions: drink.strInstructions,
        ingredients: ingredientsList,
        id: drink.idDrink,
        alcoholicOrNot: drink.strAlcoholic,
        tags: drink.strTags || [],
        nationality: drink.strArea || '',
      };

      setRecipe(objectRecipe);
    })
    .catch((error) => error.message)
);

export const copyLinkRecipe = (setIsCopied, recipe = null) => {
  if (recipe) {
    const isDrinks = recipe.image.includes('thecocktaildb');
    const originURL = (window.location.origin);
    const endpoint = `${isDrinks ? `/drinks/${recipe.id}` : `/foods/${recipe.id}`}`;
    const recipeURL = originURL + endpoint;
    navigator.clipboard.writeText(recipeURL);
  } else {
    const [recipeURL] = (window.location.href).split('/in-progress');
    navigator.clipboard.writeText(recipeURL);
  }

  setIsCopied(true);
};

const checkIfRecipeInProgressExists = (
  setInProgress, recipeInProgress, idRecipe, recipeType,
) => {
  if (recipeType === 'foods') {
    if (recipeInProgress) {
      setInProgress(recipeInProgress.meals[idRecipe]);
    }
  } else if (recipeInProgress) {
    setInProgress(recipeInProgress.cocktails[idRecipe]);
  }
};

export const getRecipesLocalStorage = (
  recipeType, setRecipe, idRecipe, setInProgress,
) => {
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  checkIfRecipeInProgressExists(
    setInProgress, recipeInProgress, idRecipe, recipeType,
  );
  return recipeType === 'foods'
    ? requestFoodAPI(setRecipe, idRecipe)
    : requestDrinkAPI(setRecipe, idRecipe);
};
