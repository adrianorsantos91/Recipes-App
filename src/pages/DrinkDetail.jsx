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
        className="container-grid-drink"
      >
        <div>
          <img
            src={ strDrinkThumb }
            alt={ `${strDrink} drink` }
            data-testid="recipe-photo"
            className="picture-drink"
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
          className="category-title-drink"
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
            className="share-btn-drink"
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
            className="favorite-btn-drink"
          />
        </button>
        {
          isCopied && <span className="link-copied-drink">Link copied!</span>
        }
        <h3 className="ingredients-title-drink">Ingredients</h3>
        <div className="container-ingredients-drink ">
          <ul className="ingredients-list-drink">
            <li data-testid={ `${0}-ingredient-name-and-measure` }>{ strIngredient1 }</li>
            <li data-testid={ `${0}-ingredient-name-and-measure` }>{ strMeasure1 }</li>
            <li data-testid={ `${1}-ingredient-name-and-measure` }>{ strIngredient2 }</li>
            <li data-testid={ `${1}-ingredient-name-and-measure` }>{ strMeasure2 }</li>
            <li data-testid={ `${2}-ingredient-name-and-measure` }>{ strIngredient3 }</li>
            <li data-testid={ `${2}-ingredient-name-and-measure` }>{ strMeasure3 }</li>
            <li data-testid={ `${NUM3}-ingredient-name-and-measure` }>
              { strIngredient4 }
            </li>
            <li data-testid={ `${NUM3}-ingredient-name-and-measure` }>
              { strMeasure4 }
            </li>
            <li data-testid={ `${NUM4}-ingredient-name-and-measure` }>
              { strIngredient5 }
            </li>
            <li data-testid={ `${NUM4}-ingredient-name-and-measure` }>
              { strMeasure5 }
            </li>
          </ul>
        </div>
        <h3 className="instructions-title-drink">Intruções</h3>
        <div className="container-instructions-drink">
          <p
            className="instructions-drink"
            data-testid="instructions"
          >
            { strInstructions }
          </p>
        </div>
        <h3 className="recommendation-title-drink">Recomendações</h3>
        <div className="items-wrapper-drink">
          <div className="items-drink">
            { foodsList.filter((_, index) => index < MAX_FOODS)
              .map(({ idMeal, strMealThumb, strCategory, strMeal }, index) => (
                <div
                  key={ strMeal }
                  className="card-item-drink"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <Link to={ `/foods/${idMeal}` }>
                    <img
                      className="grid-item-drink"
                      src={ strMealThumb }
                      alt={ `food ${strMeal}` }
                    />
                    <p className="food-type">{ strCategory }</p>
                    <h3
                      className="food-title"
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
          className="btn-start-recipe-drink"
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
