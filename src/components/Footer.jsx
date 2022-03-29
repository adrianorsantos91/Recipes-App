import React from 'react';
import { useHistory } from 'react-router-dom/';
import drink from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drink } alt="Icon Drink" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img src={ explore } alt="Icon Explore" data-testid="explore-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img src={ meal } alt="Icon Meal" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
};

export default Footer;
