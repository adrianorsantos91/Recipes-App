import { DONE_RECIPES } from '../actions';

const INITIAL_STATE = [];

const doneRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DONE_RECIPES:
    return [...state, action.payload];

  default:
    return [...state];
  }
};

export default doneRecipesReducer;
