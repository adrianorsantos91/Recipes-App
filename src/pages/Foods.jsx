import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Header, Footer } from '../components';
<<<<<<< HEAD
import { action, FOOD_DATA } from '../redux/actions';
import { FIRST_TWELVE_RECIPES, FIRST_FIVE_CATEGORIES } from '../helpers';
=======
import { fetchFoodsThunk } from '../redux/actions';
import { FIRST_TWELVE_RECIPES } from '../helpers';
>>>>>>> e1f37a65d87e43692db089b578d9c9c67293a338
import '../App.css';
import './Foods.css';

export default function Foods() {
  const dispatch = useDispatch();
  const recipes = useSelector(({ foodData }) => foodData);

  useEffect(() => {
    dispatch(fetchFoodsThunk());
  }, []);

  const categories = recipes.map((category) => category.strCategory);

  const filteredCategories = categories.filter(
    (el, pos) => categories.indexOf(el) === pos,
  );

  return (
    <div>
      <Header title="Foods" hasSearch />

      {filteredCategories.filter((_, index) => index < FIRST_FIVE_CATEGORIES)
        .map((category) => (
          <div className="flex" key={ category }>
            <Button variant="outline-dark">{category}</Button>
          </div>
        ))}
      {
        recipes.filter((_, index) => index < FIRST_TWELVE_RECIPES)
          .map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idMeal }
              className="container"
            >
              <Card style={ { width: '18rem' } }>
                <Card.Img
                  data-testid={ `${index}-card-img` }
                  variant="top"
                  src={ recipe.strMealThumb }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strMeal}

                  </Card.Title>
                  <Button variant="primary">See more</Button>
                </Card.Body>
              </Card>
            </div>
          ))
      }
      <Footer />
    </div>
  );
}
