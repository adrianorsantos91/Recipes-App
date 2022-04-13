import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import {
  action,
  fetchIngredientsFoodListThunk,
  FOOD_DATA,
  INGREDIENTS_FILTER,
} from '../redux/actions';
import '../styles/Explore Ingredients.css';
import { fetchFoodsIngredients } from '../helpers/fetchFoodAPI';

export default function ExploreIngredients() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchIngredientsFoodListThunk());
  }, []);

  const ingredientsList = useSelector(
    ({ ingredientsFoodList }) => ingredientsFoodList,
  );

  const filterByCategory = async (searchInput) => {
    const { meals } = await fetchFoodsIngredients(searchInput);
    dispatch(action(FOOD_DATA, meals));
    dispatch(action(INGREDIENTS_FILTER, false));
    history.push('/foods');
  };

  return (
    <div className="background">
      <Header title="Explore Ingredients" />
      <div className="flex container-explore-ingredients">
        {ingredientsList
          .filter((_, index) => index < FIRST_TWELVE_RECIPES)
          .map((ingredient, index) => (
            <button
              type="button"
              key={ ingredient.strIngredient }
              className="image-container-explore"
              data-testid={ `${index}-ingredient` }
              onClick={ () => filterByCategory(ingredient.strIngredient) }
            >
              <div
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  variant="top"
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                  data-testid={ `${index}-card-img` }
                  alt="Ingredient"
                  className="card-image-explore"
                />
                <div>
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    { ingredient.strIngredient }
                  </p>
                </div>
              </div>
            </button>
          ))}
      </div>
      <Footer />
    </div>
  );
}
