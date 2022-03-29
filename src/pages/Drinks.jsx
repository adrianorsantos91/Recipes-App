import React from 'react';
import { useSelector } from 'react-redux';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPE } from '../helpers';

export default function Drinks() {
  const drinks = useSelector(({ drinkData }) => drinkData);

  return (
    <div>
      <Header title="Drinks" hasSearch />
      {
        drinks.filter((_, index) => index < FIRST_TWELVE_RECIPE).map((drink, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt=""
              width="100px"
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
