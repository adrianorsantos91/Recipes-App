import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const renderWithRedux = (
  component,
  { initialState,
    store = createStore(rootReducer, applyMiddleware(thunk),
      initialState),
  } = {},
) => {
  const history = createMemoryHistory();

  return ({
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    store,
    history,
  });
};

export default renderWithRedux;
