import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import { fetchIngredientsFoodListThunk } from '../redux/actions';
import '../styles/Foods.css';

export default function ExploreIngredients() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsFoodListThunk());
  }, []);

  const ingredientsList = useSelector(
    ({ ingredientsFoodList }) => ingredientsFoodList,
  );
  console.log(ingredientsList);

  return (
    <div>
      <Header title="Explore Ingredients" />
      {ingredientsList
        .filter((_, index) => index < FIRST_TWELVE_RECIPES)
        .map((ingredient, index) => (
          <div key={ ingredient.strIngredient } className="container">
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
          </div>
        ))}
      <Footer />
    </div>
  );
}
