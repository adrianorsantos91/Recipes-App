import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodByIdThunk, fetchDrinkRecommendationThunk } from '../redux/actions';
import { copyLinkRecipe } from '../helpers';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/FoodDetails.css';

const FoodDetail = () => {
  const [isFinished, setFinished] = useState(false);
  const [isContinued, setContinued] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const details = useSelector(({ foodDataDetails }) => foodDataDetails);
  const drinksList = useSelector(({ drinksRecommendation }) => drinksRecommendation);

  const dispatch = useDispatch();
  const history = useHistory();
  const idFood = history.location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(fetchFoodByIdThunk(idFood));
    dispatch(fetchDrinkRecommendationThunk());
  }, []);

  useEffect(() => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList) {
      setFinished(true);
    }

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

    const newFavoriteList = {
      id,
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

  const NUM3 = 3;
  const NUM4 = 4;
  const NUM5 = 5;
  const NUM6 = 6;
  const NUM7 = 7;
  const MAX_DRINKS = 6;

  return (
    details.map(({ strMealThumb, strCategory, strIngredient1, strIngredient2,
      strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7,
      strIngredient8, strMeal, strYoutube, strInstructions, strMeasure1, strMeasure2,
      strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8,
    }) => (
      <div key={ strMeal }>
        <h1>Food Detail</h1>
        <div className="food-thumb">
          <img
            src={ strMealThumb }
            alt={ `${strMeal} food` }
            data-testid="recipe-photo"
          />
        </div>
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <p data-testid="recipe-category">{ strCategory }</p>
        <button
          type="button"
          onClick={ () => copyLinkRecipe(setIsCopied) }
        >
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          onClick={ () => saveFavoriteInLocalStorageOnClick() }
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
        <section>

          <h3>Ingredients</h3>
          <ul
            id="ingredients"
          >
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
            <li data-testid={ `${NUM5}-ingredient-name-and-measure` }>
              { strIngredient6 }
            </li>
            <li data-testid={ `${NUM5}-ingredient-name-and-measure` }>
              { strMeasure6 }
            </li>
            <li data-testid={ `${NUM6}-ingredient-name-and-measure` }>
              { strIngredient7 }
            </li>
            <li data-testid={ `${NUM6}-ingredient-name-and-measure` }>
              { strMeasure7 }
            </li>
            <li data-testid={ `${NUM7}-ingredient-name-and-measure` }>
              { strIngredient8 }
            </li>
            <li data-testid={ `${NUM7}-ingredient-name-and-measure` }>
              { strMeasure8 }
            </li>
          </ul>
        </section>
        <section>
          <h3>Intruções</h3>
          <p id="ingredients" data-testid="instructions">{ strInstructions }</p>
          <h3>Video</h3>
          <div>
            <iframe
              id="preview-frame"
              src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` } // Necessário combinado o link com embed e o código da URL fornecida.
              name="preview-frame"
              frameBorder="0"
              noresize="noresize"
              title="preview-frame"
              data-testid="video"
            />
          </div>
        </section>
        <section>
          <h3>Recomendações</h3>
          <div className="scrolling-wrapper-flexbox">
            { drinksList.filter((_, index) => index < MAX_DRINKS)
              .map(({ strDrinkThumb, strAlcoholic, strDrink }, index) => (
                <div
                  key={ strDrink }
                  className="card"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ strDrinkThumb } alt={ `drink ${strDrink}` } />
                  <p>{ strAlcoholic }</p>
                  <h3 data-testid={ `${index}-recomendation-title` }>{ strDrink }</h3>
                </div>
              ))}
          </div>
        </section>
        <section className="section-button-start">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe"
            hidden={ isFinished }
            onClick={ () => history.push(`/foods/${idFood}/in-progress`) }
          >
            { !isContinued ? 'Start Recipe' : 'Continue Recipe' }
          </button>
        </section>
      </div>
    ))
  );
};

export default FoodDetail;
