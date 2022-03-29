import React, { useState } from 'react';
import { requestObject } from '../helpers';

const SearchBar = () => {
  const [radioValue, setRadioValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const changeRadioValue = ({ target: { id } }) => {
    setRadioValue(id);
  };

  const updateSearchInput = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const requestAPI = () => {
    requestObject[radioValue](searchInput);
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
