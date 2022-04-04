import { FETCH_NATIONALITIES } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_NATIONALITIES:
    return action.payload;
  default:
    return state;
  }
};

export default reducer;
