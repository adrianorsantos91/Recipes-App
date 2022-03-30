import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Header, Footer } from '../components';
import { fetchFoodsThunk, fetchFoodsCategoryThunk } from '../redux/actions';
import { FIRST_TWELVE_RECIPES, FIRST_FIVE_CATEGORIES } from '../helpers';
import '../App.css';
import './Foods.css';

export default function Foods() {
  const dispatch = useDispatch();
  const recipes = useSelector(({ foodData }) => foodData);
  const categories = useSelector(({ categoryFoodData }) => categoryFoodData);

  console.log(categories);

  useEffect(() => {
    dispatch(fetchFoodsThunk());
    dispatch(fetchFoodsCategoryThunk());
  }, []);

  return (
    <div>
      <Header title="Foods" hasSearch />

      {categories.filter((_, index) => index < FIRST_FIVE_CATEGORIES)
        .map((category) => (
          <div className="flex" key={ category.strCategory }>
            <Button variant="outline-dark">{category.strCategory}</Button>
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
