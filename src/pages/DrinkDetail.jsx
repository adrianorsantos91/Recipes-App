/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinkByIdThunk, fetchFoodRecommendationThunk } from '../redux/actions';
import { copyLinkRecipe } from '../helpers';
import newShareIcon from '../images/newShareIcon.svg';
import redHeartIcon from '../images/redHeartIcon.svg';
import newWhiteHeartIcon from '../images/newWhiteHeartIcon.svg';
import '../styles/DrinkDetails.css';

const DrinkDetail = () => {
  const [isFinished, setFinished] = useState(false);
  const [isContinued, setContinued] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const details = useSelector(({ drinkDataDetails }) => drinkDataDetails);
  const foodsList = useSelector(({ foodsRecommendation }) => foodsRecommendation);

  const dispatch = useDispatch();
  const history = useHistory();
  const ID_DRINK = history.location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(fetchDrinkByIdThunk(ID_DRINK));
    dispatch(fetchFoodRecommendationThunk());
  }, []);

  useEffect(() => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList) {
      setFinished(true);
    }

    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favorite.some(({ id }) => id === ID_DRINK));
  }, []);

  useEffect(() => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (progressRecipes.cocktails) {
      const { cocktails } = progressRecipes;
      if (cocktails[ID_DRINK]) {
        setContinued(true);
      } else {
        setContinued(false);
      }
    }
  });

  useEffect(() => {
    const favoriteListOld = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteListOld.some(({ id }) => id === ID_DRINK));
  }, [ID_DRINK]);

  const saveFavoriteInLocalStorageOnClick = () => {
    const favoriteListOld = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const { idDrink: id, strDrinkThumb, strAlcoholic, strDrink } = details[0];

    const newFavoriteList = {
      id,
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb };

    if (favoriteListOld.length) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteListOld, newFavoriteList]));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([newFavoriteList]));
    }

    setIsFavorite(!isFavorite);
  };

  const NUM3 = 3;
  const NUM4 = 4;
  const MAX_FOODS = 6;

  return (
    details.map(({ strDrinkThumb, strAlcoholic, strIngredient1, strIngredient2,
      strIngredient3, strIngredient4, strIngredient5, strGlass,
      strDrink, strInstructions, strMeasure1, strMeasure2, strMeasure3,
      strMeasure4, strMeasure5,
    }) => (
      <div
        key={ strGlass }
        className="drink-container-grid"
      >
        <div>
          <img
            src={ strDrinkThumb }
            alt={ `${strDrink} drink` }
            data-testid="recipe-photo"
            className="drink-picture"
          />
        </div>
        <h2
          data-testid="recipe-title"
          className="drink-title"
        >
          { strDrink }
        </h2>
        <p
          data-testid="recipe-category"
          className="drink-category-title"
        >
          { strAlcoholic }
        </p>
        <button
          type="button"
          onClick={ () => copyLinkRecipe(setIsCopied) }
        >
          <img
            src={ newShareIcon }
            alt="share icon"
            data-testid="share-btn"
            className="drink-share-btn"
          />
        </button>
        <button
          type="button"
          onClick={ () => saveFavoriteInLocalStorageOnClick() }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? redHeartIcon : newWhiteHeartIcon }
            alt={ isFavorite ? 'black heart favorite icon' : 'white heart favorite icon' }
            className="drink-favorite-btn"
          />
        </button>
        {
          isCopied && <span className="drink-link-copied">Link copiado!</span>
        }
        <h3 className="drink-ingredients-title">Ingredientes</h3>
        <div className="drink-container-ingredients">
          <ul className="drink-ingredients-list">
            { strIngredient1
              && <li data-testid={ `${0}-ingredient-name-and-measure` }>
                { strIngredient1 }
              </li>}
            { strMeasure1
              && <li data-testid={ `${0}-ingredient-name-and-measure` }>
                { strMeasure1 }
              </li>}
            { strIngredient2
              && <li data-testid={ `${1}-ingredient-name-and-measure` }>
                { strIngredient2 }
              </li>}
            { strMeasure2
              && <li data-testid={ `${1}-ingredient-name-and-measure` }>
                { strMeasure2 }
              </li>}
            { strIngredient3
              && <li data-testid={ `${2}-ingredient-name-and-measure` }>
                { strIngredient3 }
              </li>}
            { strIngredient4
              && <li data-testid={ `${2}-ingredient-name-and-measure` }>
                { strMeasure3 }
              </li>}
            { strIngredient4
              && <li data-testid={ `${NUM3}-ingredient-name-and-measure` }>
                { strIngredient4 }
              </li>}
            { strMeasure4
              && <li data-testid={ `${NUM3}-ingredient-name-and-measure` }>
                { strMeasure4 }
              </li> }
            { strMeasure5
              && <li data-testid={ `${NUM4}-ingredient-name-and-measure` }>
                { strIngredient5 }
              </li>}
            { strMeasure5
              && <li data-testid={ `${NUM4}-ingredient-name-and-measure` }>
                { strMeasure5 }
              </li>}
          </ul>
        </div>
        <h3 className="drink-instructions-title">Instruções</h3>
        <div className="drink-container-instructions">
          <p
            className="drink-instructions"
            data-testid="instructions"
          >
            { strInstructions }
          </p>
        </div>
        <h3 className="drink-recommendation-title">Recomendações</h3>
        <div className="drink-items-wrapper">
          <div className="drink-items">
            { foodsList.filter((_, index) => index < MAX_FOODS)
              .map(({ idMeal, strMealThumb, strCategory, strMeal }, index) => (
                <div
                  key={ strMeal }
                  className="drink-card-item"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <Link to={ `/foods/${idMeal}` }>
                    <img
                      className="drink-grid-item"
                      src={ strMealThumb }
                      alt={ `food ${strMeal}` }
                    />
                    <p className="food-type">{ strCategory }</p>
                    <h3
                      id="food-title"
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { strMeal }
                    </h3>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="drink-btn-start-recipe"
          hidden={ isFinished }
          onClick={ () => history.push(`/drinks/${ID_DRINK}/in-progress`) }
        >
          { !isContinued ? 'Start Recipe' : 'Continue Recipe' }
        </button>
      </div>
    ))
  );
};

export default DrinkDetail;
