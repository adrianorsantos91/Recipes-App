import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { requestDrinkAPI, requestFoodAPI } from '../helpers';

const RecipeInProgress = () => {
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [, recipeType, idRecipe] = pathname.split('/');

  useEffect(() => {
    if (recipeType === 'foods') {
      requestFoodAPI(setRecipe, idRecipe);
    } else {
      requestDrinkAPI(setRecipe, idRecipe);
    }
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
