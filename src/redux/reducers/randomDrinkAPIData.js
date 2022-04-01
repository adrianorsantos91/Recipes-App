import { DRINK_SURPRISE_ME } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DRINK_SURPRISE_ME:
    return action.payload;
  default:
    return [...state];
  }
};

export default reducer;
