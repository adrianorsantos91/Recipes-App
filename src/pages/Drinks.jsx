import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES, FIRST_FIVE_CATEGORIES } from '../helpers';
import './Foods.css';
import '../App.css';
import { fetchDrinkThunk, fetchDrinksCategoryThunk } from '../redux/actions';

export default function Drinks() {
  const allDrinks = useSelector(({ drinkData }) => drinkData);
  const categories = useSelector(({ categoryDrinkData }) => categoryDrinkData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinkThunk());
    dispatch(fetchDrinksCategoryThunk());
  }, []);

  return (
    <div>
      <Header title="Drinks" hasSearch />

      {categories.filter((_, index) => index < FIRST_FIVE_CATEGORIES)
        .map((category) => (
          <div className="flex" key={ category.strCategory }>
            <Button
              data-testid={ `${category.strCategory}-category-filter` }
              variant="outline-dark"
            >
              {category.strCategory}

            </Button>
          </div>
        ))}

      {
        allDrinks
        && allDrinks.filter((_, index) => index < FIRST_TWELVE_RECIPES)
          .map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
              className="container"
            >
              <Card style={ { width: '18rem' } }>
                <Card.Img
                  data-testid={ `${index}-card-img` }
                  variant="top"
                  src={ drink.strDrinkThumb }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {drink.strDrink}

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
