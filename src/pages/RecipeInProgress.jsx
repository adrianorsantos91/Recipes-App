import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  copyLinkRecipe,
  getRecipesLocalStorage,
  recipesInProgress,

} from '../helpers';
import whiteHeartIcon from '../images/newWhiteHeartIcon.svg';
import blackHeartIcon from '../images/redHeartIcon.svg';
import shareIcon from '../images/newShareIcon.svg';
import saveFavoriteRecipe from '../helpers/favoriteRecipe';
import '../styles/RecipeInProgress.css';

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
    <div className="container-grid-in-progress">
      <img
        data-testid="recipe-photo"
        src={ recipe.image }
        alt="recipe"
        className="picture-in-progress"
      />
      <p
        data-testid="recipe-title"
        className="food-or-drink-title-in-progress"
      >
        {recipe.title}
      </p>
      <p
        data-testid="recipe-category"
        className="category-title-in-progress"
      >
        {recipe.category}
      </p>
      <button
        type="button"
        onClick={ () => copyLinkRecipe(setIsCopied) }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="button share icon"
          className="share-btn-in-progress"
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
          className="favorite-btn-in-progress"
        />

      </button>
      {
        isCopied && <span className="link-copied-in-progress">Link copied!</span>
      }
      <h3 className="ingredients-title-in-progress">Ingredientes</h3>
      <div className="container-ingredients-in-progress">
        <ul className="list-checkbox-in-progress">
          {
            recipe.ingredients
            && recipe.ingredients.map((ingredient, index) => (
              <label
                data-testid={ `${index}-ingredient-step` }
                key={ ingredient }
                htmlFor={ ingredient }
                style={ { display: 'block' } }
                className="label-checkbox-in-progress"
              >
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ recipe.id }
                  onChange={ saveLocalStorageOnClick }
                  checked={ inProgress.includes(ingredient) }
                  className="checkbox-in-progress"
                />
                <div className="ingredient-in-progress">
                  {ingredient}
                </div>
              </label>
            ))
          }
        </ul>
      </div>
      <h3 className="instructions-title-in-progress">Instruções</h3>
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
