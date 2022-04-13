/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodByIdThunk, fetchDrinkRecommendationThunk } from '../redux/actions';
import { copyLinkRecipe } from '../helpers';
import newShareIcon from '../images/newShareIcon.svg';
import redHeartIcon from '../images/redHeartIcon.svg';
import newWhiteHeartIcon from '../images/newWhiteHeartIcon.svg';
import '../styles/FoodDetails.css';
import '../App.css';

const FoodDetail = () => {
  const [isFinished, setFinished] = useState(false);
  const [isContinued, setContinued] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const details = useSelector(({ foodDataDetails }) => foodDataDetails);
  const drinksList = useSelector(({ drinksRecommendation }) => drinksRecommendation);
  const dispatch = useDispatch(); const history = useHistory();
  const idFood = history.location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(fetchFoodByIdThunk(idFood));
    dispatch(fetchDrinkRecommendationThunk());
  }, []);

  useEffect(() => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList) setFinished(true);
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favorite.some(({ id }) => id === idFood));
  }, []);

  useEffect(() => () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (progressRecipes.meals) {
      const { meals } = progressRecipes;
      if (meals[idFood]) {
        setContinued(true);
      } else {
        setContinued(false);
      }
    }
  });

  useEffect(() => {
    const favoriteListOld = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteListOld.some(({ id }) => id === idFood));
  }, [idFood]);

  const saveFavoriteInLocalStorageOnClick = () => {
    const favoriteListOld = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const { idMeal: id, strMealThumb, strCategory, strArea, strMeal } = details[0];
    const newFavoriteList = { id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb };
    if (favoriteListOld.length) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteListOld, newFavoriteList]));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([newFavoriteList]));
    }
    setIsFavorite(!isFavorite);
  };

  const NUM3 = 3; const NUM4 = 4; const NUM5 = 5; const NUM6 = 6; const NUM7 = 7;
  const MAX_DRINKS = 6;

  return (
    details.map(({ strMealThumb, strCategory, strMeal, strYoutube, strInstructions,
      strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6,
      strMeasure7, strMeasure8, strIngredient1, strIngredient2, strIngredient3,
      strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8,
    }) => (
      <div
        key={ strMeal }
        className="container-grid-food-detail"
      >
        <div>
          <img
            src={ strMealThumb }
            alt={ `${strMeal} food` }
            data-testid="recipe-photo"
            className="picture-food"
          />
        </div>
        <h2
          data-testid="recipe-title"
          className="food-title-food-detail"
        >
          { strMeal }
        </h2>
        <p
          data-testid="recipe-category"
          className="category-title-food-detail"
        >
          { strCategory }
        </p>
        <button
          type="button"
          onClick={ () => copyLinkRecipe(setIsCopied) }
        >
          <img
            src={ newShareIcon }
            alt="share icon"
            data-testid="share-btn"
            className="share-btn-food-detail"
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
            className="favorite-btn"
          />
        </button>
        { isCopied && <span className="link-copied">Link copiado!</span> }
        <section>
          <h3 className="ingredients-title">Ingredientes</h3>
          <div className="container-ingredients ">
            <ul className="ingredients-list">
              <li data-testid={ `${0}-ingredient-name-and-measure` }>
                { strIngredient1 }
              </li>
              <li data-testid={ `${0}-ingredient-name-and-measure` }>
                { strMeasure1 }
              </li>
              <li data-testid={ `${1}-ingredient-name-and-measure` }>
                { strIngredient2 }
              </li>
              <li data-testid={ `${1}-ingredient-name-and-measure` }>
                { strMeasure2 }
              </li>
              <li data-testid={ `${2}-ingredient-name-and-measure` }>
                { strIngredient3 }
              </li>
              <li data-testid={ `${2}-ingredient-name-and-measure` }>
                { strMeasure3 }
              </li>
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
              { strIngredient6
                && <li data-testid={ `${NUM5}-ingredient-name-and-measure` }>
                  { strIngredient6 }
                </li>}
              { strMeasure6
                && <li data-testid={ `${NUM5}-ingredient-name-and-measure` }>
                  { strMeasure6 }
                </li>}
              { strIngredient7
                && <li data-testid={ `${NUM6}-ingredient-name-and-measure` }>
                  { strIngredient7 }
                </li>}
              { strMeasure7
                && <li data-testid={ `${NUM6}-ingredient-name-and-measure` }>
                  { strMeasure7 }
                </li>}
              {strIngredient8
                && <li data-testid={ `${NUM7}-ingredient-name-and-measure` }>
                  { strIngredient8 }
                </li>}
              { strMeasure8
                && <li data-testid={ `${NUM7}-ingredient-name-and-measure` }>
                  { strMeasure8 }
                </li>}
            </ul>
          </div>
        </section>
        <h3 className="instructions-title">Instruções</h3>
        <div className="container-instructions">
          <p className="instructions" data-testid="instructions">
            { strInstructions }
          </p>
        </div>
        <h3 className="video-title">Video</h3>
        <div className="container-video">
          <iframe
            id="preview-frame"
            src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` } // Necessário combinado o link com embed e o código da URL fornecida.
            name="preview-frame"
            frameBorder="0"
            noresize="noresize"
            title="preview-frame"
            data-testid="video"
            className="frame-video"
          />
        </div>
        <h3 className="recommendation-title">Recomendações</h3>
        <div className="items-wrapper">
          <div className="items">
            { drinksList.filter((_, index) => index < MAX_DRINKS)
              .map(({ idDrink, strDrinkThumb, strAlcoholic, strDrink }, index) => (
                <Link key={ strDrink } to={ `/drinks/${idDrink}` }>
                  <div
                    className="card-item-food-detail"
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      className="grid-item-food-detail"
                      src={ strDrinkThumb }
                      alt={ `drink ${strDrink}` }
                    />
                    <p className="drink-type">{ strAlcoholic }</p>
                    <h3
                      id="drink-title"
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { strDrink }
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          hidden={ isFinished }
          onClick={ () => history.push(`/foods/${idFood}/in-progress`) }
        >
          { !isContinued ? 'Start Recipe' : 'Continue Recipe' }
        </button>
      </div>
    ))
  );
};

export default FoodDetail;
