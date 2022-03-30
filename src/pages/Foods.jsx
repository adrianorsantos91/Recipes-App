import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Header, Footer } from '../components';
import { action, FOOD_DATA } from '../redux/actions';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import '../App.css';
import './Foods.css';

export default function Foods() {
  const dispatch = useDispatch();
  const recipes = useSelector(({ foodData }) => foodData);

  useEffect(() => {
    const URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const fetchName = async () => {
      const { meals } = await fetch(URL_NAME).then((response) => response.json());
      dispatch(action(FOOD_DATA, meals));
    };
    fetchName();
  }, [dispatch]);

  return (
    <div>
      <Header title="Foods" hasSearch />
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
