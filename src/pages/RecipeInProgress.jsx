import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { requestDrinkAPI, requestFoodAPI } from '../helpers';
import {
  drinkRecipeInProgress,
  foodRecipeInProgress,
} from '../helpers/recipesInProgress';

const RecipeInProgress = () => {
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [, recipeType, idRecipe] = pathname.split('/');
  const [inProgress, setInProgress] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (recipeType === 'foods') {
      requestFoodAPI(setRecipe, idRecipe);
      const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (recipeInProgress) {
        setInProgress(recipeInProgress.meals[idRecipe]);
      }
    } else {
      requestDrinkAPI(setRecipe, idRecipe);
      const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (recipeInProgress) {
        setInProgress(recipeInProgress.cocktails[idRecipe]);
      }
    }
  }, []);

  const saveLocalStorageOnClick = ({ target: { id, name } }) => {
    if (recipeType === 'foods') {
      foodRecipeInProgress(id, name, inProgress, setInProgress);
    } else {
      drinkRecipeInProgress(id, name, inProgress, setInProgress);
    }
  };

  const copyLinkRecipe = () => {
    const [recipeURL] = (window.location.href).split('/in-progress');
    navigator.clipboard.writeText(recipeURL);
    setIsCopied(true);
  };

  return (
    <div>
      <h1>Recipe in Progress...</h1>
      <img data-testid="recipe-photo" src={ recipe.image } alt="recipe" width="100px" />
      <p data-testid="recipe-title">{recipe.title}</p>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyLinkRecipe }
      >
        Share

      </button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      {
        isCopied && <span>Link copied!</span>
      }
      <ul>
        {
          recipe.ingredients
          && recipe.ingredients.map((ingredient, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ ingredient }
              htmlFor={ ingredient }
              style={ { display: 'block' } }
            >
              <input
                type="checkbox"
                name={ ingredient }
                id={ recipe.id }
                onClick={ saveLocalStorageOnClick }
                checked={ inProgress.includes(ingredient) }
              />
              {ingredient}

            </label>
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
