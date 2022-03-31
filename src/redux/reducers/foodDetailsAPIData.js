import { FOOD_DATA_DETAILS } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FOOD_DATA_DETAILS:
    return action.payload;
  default:
    return state;
  }
};

export default reducer;
