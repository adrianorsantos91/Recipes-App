import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';
import responseIngredientAPI from '../mocks/responseIngredientSearch';
import responseDrinkSearch from '../mocks/responseDrinkSearch';
import responseUniqueDrink from '../mocks/responseUniqueDrink';
import responseFoodFirstLetter from '../mocks/responseFoodFirstLetter';
import responseDrinkIngredient from '../mocks/responseDrinkIngredient';

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

      const FOUR_TIMES = 4;

      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(FOUR_TIMES);
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
      const FOUR_TIMES = 4;

      const toggleSearch = screen.getByRole('img', { name: /search/i });
      userEvent.click(toggleSearch);

      const inputSearch = screen.queryByTestId(searchInput);
      const nameRadio = screen.queryByText(/name/i);
      const buttonSearch = screen.queryByTestId(execSearchButton);

      userEvent.type(inputSearch, 'aquamarine');
      userEvent.click(nameRadio);
      userEvent.click(buttonSearch);

      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(FOUR_TIMES);
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine');
    },
  );

  test(
    'Verifica se ao retornar um único ingrediente, é redirecionado para tela de detalhes',
    async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseUniqueDrink),
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

      const buttonFavorite = await screen
        .findByRole('img', { name: /white heart favorite icon/i });

      expect(buttonFavorite).toBeInTheDocument();
      expect(history.location.pathname).toBe('/drinks/178319');
    },
  );

  test('Verifica procura pela primeira letra', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseFoodFirstLetter),
    });

    const { history } = renderWithRedux(<App />);
    history.push('/foods');

    const toggleSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(toggleSearch);

    const inputSearch = screen.queryByTestId(searchInput);
    const nameRadio = screen.queryByText(/first letter/i);
    const buttonSearch = screen.queryByTestId(execSearchButton);

    userEvent.type(inputSearch, 'c');
    userEvent.click(nameRadio);
    userEvent.click(buttonSearch);

    const foodName = await screen.findByText(/Chocolate Gateau/i);

    expect(foodName).toBeInTheDocument();
  });

  test('Verifica pelo ingrediente da bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseDrinkIngredient),
    });

    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const toggleSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(toggleSearch);

    const inputSearch = screen.queryByTestId(searchInput);
    const nameRadio = screen.queryByText(/ingredient/i);
    const buttonSearch = screen.queryByTestId(execSearchButton);

    userEvent.type(inputSearch, 'gin');
    userEvent.click(nameRadio);
    userEvent.click(buttonSearch);

    const drink = await screen.findByText(/3-Mile Long Island Iced Tea/i);

    expect(drink).toBeInTheDocument();
  });
});
