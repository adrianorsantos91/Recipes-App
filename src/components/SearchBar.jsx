import React, { useState } from 'react';

const SearchBar = () => {
  const [radioValue, setRadioValue] = useState('');

  const changeRadioValue = ({ target: { id } }) => {
    setRadioValue(id);
    console.log(radioValue);
  };

  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
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
      >
        Search

      </button>
    </form>
  );
};

export default SearchBar;
