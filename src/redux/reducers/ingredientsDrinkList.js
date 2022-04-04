import { INGREDIENTS_DRINK_LIST } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INGREDIENTS_DRINK_LIST:
    return action.payload;
  default:
    return [...state];
  }
};

export default reducer;
