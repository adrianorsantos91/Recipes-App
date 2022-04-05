import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import {
  action,
  fetchIngredientsFoodListThunk,
  FOOD_DATA,
  INGREDIENTS_FILTER,
} from '../redux/actions';
import '../styles/Foods.css';
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
    <div>
      <Header title="Explore Ingredients" />
      {ingredientsList
        .filter((_, index) => index < FIRST_TWELVE_RECIPES)
        .map((ingredient, index) => (
          <button
            type="button"
            key={ ingredient.strIngredient }
            className="container"
            onClick={ () => filterByCategory(ingredient.strIngredient) }
          >
            <Card
              style={ { width: '18rem' } }
              data-testid={ `${index}-ingredient-card` }
            >
              <Card.Img
                variant="top"
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                data-testid={ `${index}-card-img` }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${index}-card-name` }
                >
                  { ingredient.strIngredient }
                </Card.Title>
              </Card.Body>
            </Card>
          </button>
        ))}
      <Footer />
    </div>
  );
}
