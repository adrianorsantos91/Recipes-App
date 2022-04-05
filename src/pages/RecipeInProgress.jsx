import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  copyLinkRecipe,
  getRecipesLocalStorage,
  recipesInProgress,

} from '../helpers';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
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
    getRecipesLocalStorage(recipeType, setRecipe, idRecipe, setInProgress);

    verifyCheckbox();
  }, [idRecipe, recipeType]);

  useEffect(() => {
    verifyCheckbox();
  }, [recipe, inProgress]);

  const saveLocalStorageOnClick = ({ target: { id, name } }) => {
    recipesInProgress[recipeType](id, name, inProgress, setInProgress);
  };

  const favoriteRecipe = (currentRecipe) => {
    saveFavoriteRecipe(currentRecipe, recipeType, isFavorite, setIsFavorite);
  };

  const finishRecipe = (currentRecipe) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const dateNow = Date.now();
    const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const doneDate = new Date(dateNow).toLocaleString('pt-br', dateOptions);
    const tags = currentRecipe.tags.length ? currentRecipe.tags.split(',') : [];
    const { nationality } = currentRecipe;

    const recipeObject = {
      ...currentRecipe,
      doneDate,
      tags,
      nationality,
    };

    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipeObject]));
  };

  return (
    <div>
      <h1>Recipe in Progress...</h1>
      <img data-testid="recipe-photo" src={ recipe.image } alt="recipe" width="100px" />
      <p data-testid="recipe-title">{recipe.title}</p>
      <button
        type="button"
        onClick={ () => copyLinkRecipe(setIsCopied) }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="button share icon"
        />

      </button>
      <button
        type="button"
        onClick={ () => favoriteRecipe(recipe) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt={ isFavorite ? 'black heart favorite icon' : 'white heart favorite icon' }
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
            >
              <input
                type="checkbox"
                name={ ingredient }
                id={ recipe.id }
                onChange={ saveLocalStorageOnClick }
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
          onClick={ () => finishRecipe(recipe) }
        >
          Finish Recipe

        </button>
      </Link>
    </div>
  );
};

export default RecipeInProgress;
