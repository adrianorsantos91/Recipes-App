import { DRINK_DATA } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DRINK_DATA:
    return action.payload;
  default:
    return state;
  }
};

export default reducer;
