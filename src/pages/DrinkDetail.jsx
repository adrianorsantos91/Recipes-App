import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { action, DRINK_DATA_DETAILS } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import favorite from '../images/whiteHeartIcon.svg';

const DrinkDetail = () => {
  const details = useSelector(({ drinkDataDetails }) => drinkDataDetails);
  const dispatch = useDispatch();
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];
  // const id = 178319;
  console.log(idDrink);
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then((response) => response.json())
      .then(({ drinks }) => {
        console.log('drinks', drinks);
        dispatch(action(DRINK_DATA_DETAILS, drinks));
      })
      .catch((error) => error);
  }, [idDrink, dispatch]);

  // APi Drinks: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319", Código null
  // API Foods: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDrink}`

  return (
    details.map(({ strDrinkThumb, strAlcoholic, strIngredient1, strIngredient2,
      strIngredient3, strIngredient4, strIngredient5, strIngredient6,
      strIngredient7, strGlass, strDrink, strInstructions,
    }) => (
      <div key={ strGlass }>
        <h1>Food Detail</h1>
        <img src={ strDrinkThumb } alt="" data-testid="recipe-photo" />
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
          data-testid={ `${0}-ingredient-name-and-measure` }
        >
          <li>{ strIngredient1 }</li>
          <li>{ strIngredient2 }</li>
          <li>{ strIngredient3 }</li>
          <li>{ strIngredient4 }</li>
          <li>{ strIngredient5 }</li>
          <li>{ strIngredient6 }</li>
          <li>{ strIngredient7 }</li>
        </ul>
        <h3>Intruções</h3>
        <p id="ingredients" data-testid="instructions">{ strInstructions }</p>
        <h3>Recomendações</h3>
        <div data-testid={ `${0}-recomendation-card` } />
        <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
      </div>
    ))
  );
};

export default DrinkDetail;
