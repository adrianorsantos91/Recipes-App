import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { action, FOOD_DATA_DETAILS } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import favorite from '../images/whiteHeartIcon.svg';

const FoodDetail = () => {
  const details = useSelector(({ foodDataDetails }) => foodDataDetails);
  const dispatch = useDispatch();
  const history = useHistory();
  const idFood = history.location.pathname.split('/')[2];
  // const id = 52771;
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`)
      .then((response) => response.json())
      .then(({ meals }) => {
        console.log('meals', meals);
        dispatch(action(FOOD_DATA_DETAILS, meals));
        return meals;
      })
      .catch((error) => error);
  }, [idFood, dispatch]);

  console.log('details:', details);
  // APi Drinks: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319",
  const NUM3 = 3;
  const NUM4 = 4;
  const NUM5 = 5;
  const NUM6 = 6;
  const NUM7 = 7;

  return (
    details.map(({ strMealThumb, strCategory, strIngredient1, strIngredient2,
      strIngredient3, strIngredient4, strIngredient5, strIngredient6,
      strIngredient7, strIngredient8, strMeal, strYoutube, strInstructions,
    }) => (
      <div key={ strMeal }>
        <h1>Food Detail</h1>
        <img src={ strMealThumb } alt="" data-testid="recipe-photo" />
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <p data-testid="recipe-category">{ strCategory }</p>
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
          <li data-testid={ `${1}-ingredient-name-and-measure` }>{ strIngredient2 }</li>
          <li data-testid={ `${2}-ingredient-name-and-measure` }>{ strIngredient3 }</li>
          <li
            data-testid={ `${NUM3}-ingredient-name-and-measure` }
          >
            { strIngredient4 }
          </li>
          <li
            data-testid={ `${NUM4}-ingredient-name-and-measure` }
          >
            { strIngredient5 }
          </li>
          <li
            data-testid={ `${NUM5}-ingredient-name-and-measure` }
          >
            { strIngredient6 }
          </li>
          <li
            data-testid={ `${NUM6}-i ngredient-name-and-measure` }
          >
            { strIngredient7 }
          </li>
          <li
            data-testid={ `${NUM7}-ingredient-name-and-measure` }
          >
            { strIngredient8 }
          </li>
        </ul>
        <h3>Intruções</h3>
        <p id="ingredients" data-testid="instructions">{ strInstructions }</p>
        <h3>Video</h3>
        <embed
          width="320"
          height="240"
          controls
          src={ strYoutube }
          type="video/webm"
          data-testid="video"
        />
        <h3>Recomendações</h3>
        <div data-testid={ `${0}-recomendation-card` } />
        <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
      </div>
    ))
  );
};

export default FoodDetail;
