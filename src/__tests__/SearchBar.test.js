import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';
import responseIngredientAPI from '../mocks/responseIngredientSearch';
import responseDrinkSearch from '../mocks/responseDrinkSearch';

const searchInput = 'search-input';
const execSearchButton = 'exec-search-btn';

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
    const testIdToggleMenu = execSearchButton;

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

  test(
    'Testa se pesquisar por "Arrabiata" é redirecionado para a página de detalhe',
    async () => {
      window.alert = jest.fn();
      window.alert.mockClear();

      const { history } = renderWithRedux(<App />);
      history.push('/foods');

      const toggleSearch = screen.getByRole('img', { name: /search/i });
      userEvent.click(toggleSearch);

      const inputSearch = screen.queryByTestId(searchInput);
      const nameRadio = screen.queryByText(/name/i);
      const buttonSearch = screen.queryByTestId(execSearchButton);

      userEvent.type(inputSearch, 'Arrabiata');
      userEvent.click(nameRadio);
      userEvent.click(buttonSearch);

      const titleFoodDetail = await screen
        .findByRole('heading', { name: /food detail/i });

      expect(titleFoodDetail).toBeInTheDocument();
    },
  );

  // test(
  //   'Testa se pesquisar por "Arrabiata" é redirecionado para a página de detalhe',
  //   async () => {
  //     window.alert = jest.fn();
  //     const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  //     Object.defineProperty(window, 'window', {
  //       value: {
  //         alert: jest.fn(),
  //       },
  //     });
  //     const alert = jest.spyOn(global, 'alert').mockImplementation();

  //     const { history } = renderWithRedux(<App />);
  //     history.push('/foods');

  //     const toggleSearch = screen.getByRole('img', { name: /search/i });
  //     userEvent.click(toggleSearch);

  //     const inputSearch = screen.queryByTestId('search-input');
  //     const ingredientRadio = screen.queryByText(/first/i);
  //     const buttonSearch = screen.queryByTestId(execSearchButton);

  //     userEvent.type(inputSearch, 'ab');
  //     userEvent.click(ingredientRadio);
  //     userEvent.click(buttonSearch);

  //     screen.logTestingPlaygroundURL();
  //     console.log(queryByRole('alert'));
  //     await waitForElement(() => {
  //       Object.defineProperty(window, 'alert', alert);
  //       expect(alert).toHaveBeenCalled();
  //       expect(alertMock).toHaveBeenCalled();
  //     });
  //   },
  // );

  test(
    'Verifica se ao pesquisar a receita pelo ingrediente, faz uma requisição à API',
    () => {
      window.alert = jest.fn();
      window.alert.mockClear();
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseIngredientAPI),
      });

      const { history } = renderWithRedux(<App />);
      history.push('/foods');

      const toggleSearch = screen.getByRole('img', { name: /search/i });
      userEvent.click(toggleSearch);

      const inputSearch = screen.queryByTestId(searchInput);
      const ingredientRadio = screen.queryByText(/ingredient/i);
      const buttonSearch = screen.queryByTestId(execSearchButton);

      userEvent.type(inputSearch, 'chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(buttonSearch);

      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    },
  );

  test(
    'Verifica se ao pesquisar a bebida pelo nome, faz uma requisição à API',
    () => {
      window.alert = jest.fn();
      window.alert.mockClear();
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseDrinkSearch),
      });

      const { history } = renderWithRedux(<App />);
      history.push('/drinks');

      const toggleSearch = screen.getByRole('img', { name: /search/i });
      userEvent.click(toggleSearch);

      const inputSearch = screen.queryByTestId(searchInput);
      const nameRadio = screen.queryByText(/name/i);
      const buttonSearch = screen.queryByTestId(execSearchButton);

      userEvent.type(inputSearch, 'aquamarine');
      userEvent.click(nameRadio);
      userEvent.click(buttonSearch);

      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine');
    },
  );
});
