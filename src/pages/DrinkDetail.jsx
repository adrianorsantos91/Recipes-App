import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { action, DRINK_DATA_DETAILS, FOOD_RECOMMENDATION } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import favorite from '../images/whiteHeartIcon.svg';
import '../styles/DrinkDetails.css';

const DrinkDetail = () => {
  const [isFinished, setFinished] = useState(false);
  const [isContinued, setContinued] = useState(false);

  const details = useSelector(({ drinkDataDetails }) => drinkDataDetails);
  const foodsList = useSelector(({ foodsRecommendation }) => foodsRecommendation);

  const dispatch = useDispatch();
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then((response) => response.json())
      .then(({ drinks }) => {
        dispatch(action(DRINK_DATA_DETAILS, drinks));
      })
      .catch((error) => error);
  }, [idDrink, dispatch]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then(({ meals }) => {
        dispatch(action(FOOD_RECOMMENDATION, meals));
      })
      .catch((error) => error);
  }, []);

  useEffect(() => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList) {
      setFinished(true);
    }

    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log('drinks', cocktails);
    if (cocktails[idDrink]) {
      console.log('Estou aqui');
      setContinued(true);
    }
  }, []);

  const NUM3 = 3;
  const NUM4 = 4;
  const MAX_FOODS = 6;
  // const isContinued = false;

  return (
    details.map(({ strDrinkThumb, strAlcoholic, strIngredient1, strIngredient2,
      strIngredient3, strIngredient4, strIngredient5, strGlass,
      strDrink, strInstructions, strMeasure1, strMeasure2, strMeasure3,
      strMeasure4, strMeasure5,
    }) => (
      <div key={ strGlass }>
        <h1>Food Detail</h1>
        <div className="drink-thumb">
          <img src={ strDrinkThumb } alt="" data-testid="recipe-photo" />
        </div>
        <h2 data-testid="recipe-title">{ strDrink }</h2>
        <p data-testid="recipe-category">{ strAlcoholic }</p>
        <button type="button">
          <img src={ shareIcon } alt="" data-testid="share-btn" />
        </button>
        <button type="button">
          <img src={ favorite } alt="" data-testid="favorite-btn" />
        </button>
        <h3>Ingredients</h3>
        <ul
          id="ingredients"
        >
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
        <h3>Intruções</h3>
        <p id="ingredients" data-testid="instructions">{ strInstructions }</p>
        <h3>Recomendações</h3>
        <div className="scrolling-wrapper-flexbox">
          { foodsList.filter((_, index) => index < MAX_FOODS)
            .map(({ strMealThumb, strCategory, strMeal }, index) => (
              <div
                key={ strMeal }
                className="card"
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ strMealThumb } alt={ `food ${strMeal}` } />
                <p>{ strCategory }</p>
                <h3 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h3>
              </div>
            ))}
        </div>
        <section className="section-button-start">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe"
            hidden={ isFinished }
            onClick={ () => history.push(`/drinks/${idDrink}/in-progress`) }
          >
            { !isContinued ? 'Start Recipe' : 'Continue Recipe' }
          </button>
        </section>
      </div>
    ))
  );
};

export default DrinkDetail;
