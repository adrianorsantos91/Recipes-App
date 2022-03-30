import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';
// import responseIngredientAPI from '../mocks/responseIngredientSearch';

describe('Testes do componente "SearchBar"', () => {
  test('Verifica se ao fazer Login é redirecionado para "/foods"', () => {
    const { history } = renderWithRedux(<App />);

    // https://github.com/nickcolley/jest-axe/issues/147
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);

    const USER_EMAIL = 'email.teste@teste.com';
    const USER_PASSWORD = '1234567';

    const loginInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const buttonLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(loginInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);
    userEvent.click(buttonLogin);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });

  test('Testa se ao clicar no botão abre e fecha o menu de pesquisa', () => {
    renderWithRedux(<App />);

    const USER_EMAIL = 'email.teste@teste.com';
    const USER_PASSWORD = '1234567';
    const testIdToggleMenu = 'exec-search-btn';

    const loginInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const buttonLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(loginInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);
    userEvent.click(buttonLogin);

    const buttonSearch = screen.getByRole('img', { name: /search/i });
    const inputSearch = screen.queryByRole('textbox');

    expect(buttonSearch).toBeInTheDocument();
    expect(inputSearch).not.toBeInTheDocument();

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByText(/ingredient/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/first letter/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(testIdToggleMenu)).not.toBeInTheDocument();

    userEvent.click(buttonSearch);

    expect(screen.queryByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByText(/ingredient/i)).toBeInTheDocument();
    expect(screen.queryByText(/name/i)).toBeInTheDocument();
    expect(screen.queryByText(/first letter/i)).toBeInTheDocument();
    expect(screen.queryByTestId(testIdToggleMenu)).toBeInTheDocument();

    userEvent.click(screen.getByRole('img', { name: /search/i }));

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByText(/ingredient/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/first letter/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(testIdToggleMenu)).not.toBeInTheDocument();
  });

  // window.alert = jest.fn();

  // test('Verifica se ao pesquisar pelo ingrediente, faz uma requisição à API', () => {
  //   window.alert.mockClear();
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(responseIngredientAPI),
  //   });

  //   const { history } = renderWithRedux(<App />);
  //   history.push('/foods');

  //   const toggleSearch = screen.getByRole('img', { name: /search/i });
  //   userEvent.click(toggleSearch);

  //   const inputSearch = screen.queryByTestId('search-input');
  //   const ingredientRadio = screen.queryByText(/ingredient/i);
  //   const buttonSearch = screen.queryByTestId('exec-search-btn');

  //   userEvent.type(inputSearch, 'chicken');
  //   userEvent.click(ingredientRadio);
  //   userEvent.click(buttonSearch);

  //   // expect(fetch).toHaveBeenCalled();
  //   expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  // });
});
