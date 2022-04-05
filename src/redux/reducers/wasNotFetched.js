import { INGREDIENTS_FILTER } from '../actions';

const INITIAL_STATE = true;

const wasNotFetched = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INGREDIENTS_FILTER:
    return action.payload;

  default:
    return state;
  }
};

export default wasNotFetched;
