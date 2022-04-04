import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import { fetchIngredientsDrinkListThunk } from '../redux/actions';
import '../styles/Foods.css';

export default function ExploreDrinksIngredients() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsDrinkListThunk());
  }, []);

  const ingredientsList = useSelector(
    ({ ingredientsDrinkList }) => ingredientsDrinkList,
  );

  return (
    <div>
      <Header title="Explore Ingredients" />
      {ingredientsList
        .filter((_, index) => index < FIRST_TWELVE_RECIPES)
        .map((ingredient, index) => (
          <div key={ ingredient.strIngredient1 } className="container">
            <Card
              style={ { width: '18rem' } }
              data-testid={ `${index}-ingredient-card` }
            >
              <Card.Img
                variant="top"
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                data-testid={ `${index}-card-img` }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${index}-card-name` }
                >
                  { ingredient.strIngredient1 }
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      <Footer />
    </div>
  );
}
