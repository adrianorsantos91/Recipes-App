import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestFoodObject } from '../helpers';

const SearchBar = () => {
  const [radioValue, setRadioValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  const changeRadioValue = ({ target: { id } }) => {
    setRadioValue(id);
  };

  const updateSearchInput = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const requestAPI = () => {
    if (history.location.pathname === '/foods') {
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
        });
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
