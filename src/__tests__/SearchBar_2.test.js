import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';
import responseDrinkFirstLetter from '../mocks/responseDrinkFirstLetter';

afterEach(cleanup);

describe('Testes Drink', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';

  test('Verifica pelo ingrediente da bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseDrinkFirstLetter),
    });

    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const toggleSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(toggleSearch);

    const inputSearch = screen.queryByTestId(searchInput);
    const nameRadio = screen.queryByText(/first letter/i);
    const buttonSearch = screen.queryByTestId(execSearchButton);

    userEvent.type(inputSearch, 'b');
    userEvent.click(nameRadio);
    userEvent.click(buttonSearch);

    const drink = await screen.findByText(/b-53/i);

    expect(drink).toBeInTheDocument();
  });

  test('Testa o alert do "First Letter"', () => {
    window.alert = jest.fn();
    window.alert.mockClear();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: undefined }),
    });

    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const toggleSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(toggleSearch);

    const inputSearch = screen.queryByTestId(searchInput);
    const nameRadio = screen.queryByText(/first letter/i);
    const buttonSearch = screen.queryByTestId(execSearchButton);

    userEvent.type(inputSearch, 'ba');
    userEvent.click(nameRadio);
    userEvent.click(buttonSearch);
  });

  test('Testa o alerta caso de null', () => {
    window.alert = jest.fn();
    window.alert.mockClear();

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const toggleSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(toggleSearch);

    const inputSearch = screen.queryByTestId(searchInput);
    const nameRadio = screen.queryByText(/name/i);
    const buttonSearch = screen.queryByTestId(execSearchButton);

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(nameRadio);
    userEvent.click(buttonSearch);
  });
});

describe('Testes Foods', () => {
  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';

  test('Testa o alerta caso de null', () => {
    window.alert = jest.fn();
    window.alert.mockClear();

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null }),
    });

    const { history } = renderWithRedux(<App />);
    history.push('/foods');

    const toggleSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(toggleSearch);

    const inputSearch = screen.queryByTestId(searchInput);
    const nameRadio = screen.queryByText(/name/i);
    const buttonSearch = screen.queryByTestId(execSearchButton);

    userEvent.type(inputSearch, 'cocktail');
    userEvent.click(nameRadio);
    userEvent.click(buttonSearch);
  });
});
