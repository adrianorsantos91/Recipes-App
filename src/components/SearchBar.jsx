import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestDrinkObject, requestFoodObject } from '../helpers';
import { action, FOOD_DATA, DRINK_DATA } from '../redux/actions';

const SearchBar = () => {
  const [radioValue, setRadioValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const changeRadioValue = ({ target: { id } }) => {
    setRadioValue(id);
  };

  const updateSearchInput = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const requestFoodAPI = () => {
    requestFoodObject[radioValue](searchInput)
      .then(({ meals }) => {
        if (meals === undefined) {
          global.alert('Your search must have only 1 (one) character');
          return;
        }

        if (meals === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          return;
        }

        if (meals.length === 1) {
          const [meal] = meals;
          const { idMeal } = meal;
          history.push(`/foods/${idMeal}`);
        }

        if (meals.length > 1) {
          dispatch(action(FOOD_DATA, meals));
        }
      });
  };

  const requestDrinkAPI = () => {
    requestDrinkObject[radioValue](searchInput)
      .then(({ drinks }) => {
        if (drinks === undefined) {
          global.alert('Your search must have only 1 (one) character');
          return;
        }

        if (drinks === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          return;
        }

        if (drinks.length === 1) {
          const [drink] = drinks;
          const { idDrink } = drink;
          history.push(`/drinks/${idDrink}`);
        }

        if (drinks.length > 1) {
          console.log(drinks);
          dispatch(action(DRINK_DATA, drinks));
        }
      });
  };

  const requestAPI = () => {
    if (history.location.pathname === '/foods') {
      requestFoodAPI();
    }

    if (history.location.pathname === '/drinks') {
      requestDrinkAPI();
    }
  };

  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        value={ searchInput }
        onChange={ updateSearchInput }
      />
      <label htmlFor="ingredient-search">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-radio"
          id="ingredient-search"
          onChange={ changeRadioValue }
        />
        Ingredient
      </label>

      <label htmlFor="name-search">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search-radio"
          id="name-search"
          onChange={ changeRadioValue }
        />
        Name
      </label>

      <label htmlFor="first-letter-search">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-radio"
          id="first-letter-search"
          onChange={ changeRadioValue }
        />
        First Letter
      </label>

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ requestAPI }
      >
        Search

      </button>
    </form>
  );
};

export default SearchBar;
