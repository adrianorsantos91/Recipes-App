import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RecipeInProgress = () => {
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [,, idRecipe] = pathname.split('/');

  const requestAPI = () => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
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
      };

      setRecipe(objectRecipe);
    })
    .catch((error) => error.message);

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      <h1>Recipe in Progress...</h1>
      <img data-testid="recipe-photo" src={ recipe.image } alt="recipe" width="100px" />
      <p data-testid="recipe-title">{recipe.title}</p>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <ul>
        {
          recipe.ingredients
          && recipe.ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-step` }
              key={ ingredient }
            >
              {ingredient}

            </li>
          ))
        }
      </ul>
      <p data-testid="recipe-category">{recipe.category}</p>
      <p data-testid="instructions">{recipe.instructions}</p>
      <button data-testid="finish-recipe-btn" type="button">Finish Recipe</button>
    </div>
  );
};

export default RecipeInProgress;
