import React from 'react';
// import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

const Footer = () => {
  const { history } = useDispatch();
  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      >
        <img src="../images/drinkIcon.svg" alt="Icon Drink" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
      >
        <img src="../images/exploreIcon.svg" alt="Icon Explore" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
      >
        <img src="../images/mealIcon.svg" alt="Icon Meal" />
      </button>
    </footer>
  );
};

export default connect()(Footer);

// Footer.propTypes = {
//   // dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape(PropTypes.object).isRequired,
// };
