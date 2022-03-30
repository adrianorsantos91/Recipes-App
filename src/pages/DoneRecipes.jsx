import React from 'react';
import { Header } from '../components';

const DoneRecipes = () => (
  <>
    <Header title="Done Recipes" />
    <button
      type="button"
      data-testid="filter-by-all-btn"
    >
      All
    </button>
    <button
      type="button"
      data-testid="filter-by-food-btn"
    >
      Foods
    </button>
    <button
      type="button"
      data-testid="filter-by-drink-btn"
    >
      Drinks
    </button>
  </>
);

export default DoneRecipes;
