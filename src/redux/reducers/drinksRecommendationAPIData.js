import { DRINK_RECOMMENDATION } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DRINK_RECOMMENDATION:
    return action.payload;
  default:
    return state;
  }
};

export default reducer;
