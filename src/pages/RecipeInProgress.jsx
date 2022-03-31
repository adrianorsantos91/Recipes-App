import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  requestDrinkAPI,
  requestFoodAPI,
  copyLinkRecipe,
  checkIfRecipeInProgressExists,
} from '../helpers';
import {
  drinkRecipeInProgress,
  foodRecipeInProgress,
} from '../helpers/recipesInProgress';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import saveFavoriteRecipe from '../helpers/favoriteRecipe';

const RecipeInProgress = () => {
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [, recipeType, idRecipe] = pathname.split('/');
  const [inProgress, setInProgress] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const verifyCheckbox = () => {
    const allCheckbox = document.querySelectorAll('input[type=checkbox]');
    const checkboxChecked = document.querySelectorAll('input:checked');
    setIsDisabled(allCheckbox.length !== checkboxChecked.length);
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteRecipes.some(({ id }) => id === idRecipe));
    if (recipeType === 'foods') {
      requestFoodAPI(setRecipe, idRecipe);
      const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      checkIfRecipeInProgressExists(setInProgress, recipeInProgress, idRecipe);
    } else {
      requestDrinkAPI(setRecipe, idRecipe);
      const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (recipeInProgress) {
        setInProgress(recipeInProgress.cocktails[idRecipe]);
      }
    }
    verifyCheckbox();
  }, [idRecipe, recipeType]);

  useEffect(() => {
    verifyCheckbox();
  }, [recipe, inProgress]);

  const saveLocalStorageOnClick = ({ target: { id, name } }) => {
    if (recipeType === 'foods') {
      foodRecipeInProgress(id, name, inProgress, setInProgress);
    } else {
      drinkRecipeInProgress(id, name, inProgress, setInProgress);
    }
  };

  const favoriteRecipe = (currentRecipe) => {
    saveFavoriteRecipe(currentRecipe, recipeType, isFavorite, setIsFavorite);
  };

  return (
    <div>
      <h1>Recipe in Progress...</h1>
      <img data-testid="recipe-photo" src={ recipe.image } alt="recipe" width="100px" />
      <p data-testid="recipe-title">{recipe.title}</p>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => copyLinkRecipe(setIsCopied) }
      >
        Share

      </button>
      <button
        type="button"
        onClick={ () => favoriteRecipe(recipe) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="white heart favorite icon"
        />

      </button>
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
              onClick={ saveLocalStorageOnClick }
              aria-hidden="true"
            >
              <input
                type="checkbox"
                name={ ingredient }
                id={ recipe.id }
                checked={ inProgress.includes(ingredient) }
              />
              {ingredient}

            </label>
          ))
        }
      </ul>
      <p data-testid="recipe-category">{recipe.category}</p>
      <p data-testid="instructions">{recipe.instructions}</p>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ isDisabled }
        >
          Finish Recipe

        </button>
      </Link>
    </div>
  );
};

export default RecipeInProgress;
