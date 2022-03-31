import { FOOD_RECOMMENDATION } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FOOD_RECOMMENDATION:
    return action.payload;
  default:
    return state;
  }
};

export default reducer;
