import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

describe('Testes da página `RecipeInProgress`', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  beforeEach(() => {
    const mockClipboard = { writeText: jest.fn() };
    global.navigator.clipboard = mockClipboard;

    const { history } = renderWithRedux(<App />);
    history.push('/drinks/178319/in-progress');
  });

  test('Verifica se há um título na tela', async () => {
    const pageTitle = await screen.findByRole(
      'heading', { level: 1, name: /recipe in progress/i },
    );

    expect(pageTitle).toBeInTheDocument();
  });

  test('Verifica se há uma imagem na tela', () => {
    const drinkImage = screen.getByRole('img', { name: /recipe/i });

    expect(drinkImage).toBeInTheDocument();
  });

  test('Verifica se há um botão de compartilhar na tela', async () => {
    const shareIcon = screen.getByRole('img', { name: /button share icon/i });

    expect(shareIcon).toBeInTheDocument();
    userEvent.click(shareIcon);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    const messageLinkCopied = await screen.findByText(/link copied/i);
    expect(messageLinkCopied).toBeInTheDocument();
  });

  test('Verifica se há um botão de favoritar na tela', () => {
    const favoriteButton = screen
      .getByRole('img', { name: /white heart favorite icon/i });

    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    expect(screen.queryByRole('img', { name: /white heart favorite icon/i })).toBeNull();
    expect(
      screen.getByRole('img', { name: /black heart favorite icon/i }),
    ).toBeInTheDocument();
  });

  test('Verifica se há um botão para finalizar receita na tela', async () => {
    const finishRecipe = screen.getByRole('button', { name: /finish recipe/i });

    expect(finishRecipe).toBeInTheDocument();

    const labels = await screen.findAllByTestId(/ingredient-step/i);
    labels.forEach((label) => {
      label.firstChild.click();
    });

    userEvent.click(finishRecipe);

    const titleDoneRecipes = await screen.findByText(/done recipes/i);
    expect(titleDoneRecipes).toBeInTheDocument();
  });
});

describe('Testa local storage', () => {
  test('Verifica se remove checkbox da bebida', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks/15997/in-progress');
    localStorage.clear();
    const labels = await screen.findAllByTestId(/ingredient-step/i);
    labels.forEach((label, index) => {
      if (index < 2) {
        label.firstChild.click();
      }
    });

    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(cocktails['15997'].length).toBe(2);

    const checkbox = screen.getByTestId('0-ingredient-step');
    userEvent.click(checkbox.firstChild);

    const newLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(newLocalStorage.cocktails['15997'].length).not.toBe(2);
    expect(newLocalStorage.cocktails['15997'].length).toBe(1);
  });

  test('Verifica se remove checkbox da comida', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/foods/53026/in-progress');
    localStorage.clear();
    const labels = await screen.findAllByTestId(/ingredient-step/i);
    labels.forEach((label, index) => {
      if (index < 2) label.firstChild.click();
    });

    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(meals['53026'].length).toBe(2);

    const checkbox = screen.getByTestId('0-ingredient-step');
    userEvent.click(checkbox.firstChild);

    const newLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(newLocalStorage.meals['53026'].length).not.toBe(2);
    expect(newLocalStorage.meals['53026'].length).toBe(1);
  });

  test('Verifica se ao carregar a página carrega bebida salva', async () => {
    localStorage.clear();
    const favoriteRecipe = [{
      id: '13332',
      type: 'drink',
      nationality: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: 'B-53',
      image: 'https://www.thecocktaildb.com/images/media/drink/rwqxrv1461866023.jpg',
    }];

    const inProgressRecipe = {
      cocktails: {
        13332: [
          'Kahlua',
        ],
      },
      meals: {},
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));

    const { history } = renderWithRedux(<App />);
    history.push('/drinks/13332/in-progress');

    const favoriteButton = await screen
      .findByRole('img', { name: /black heart favorite icon/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  test('Verifica se adiciona mais de uma receita no local storage', async () => {
    localStorage.clear();
    const favoriteRecipe = [
      {
        id: '53013',
        type: 'food',
        nationality: 'American',
        category: 'Beef',
        alcoholicOrNot: '',
        name: 'Big Mac',
        image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));

    const { history } = renderWithRedux(<App />);
    history.push('/foods/52978/in-progress');

    const favoriteButton = await screen
      .findByRole('img', { name: /white heart favorite icon/i });
    userEvent.click(favoriteButton);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes.length).toBe(2);
  });

  test('Verifica se ao carregar a página carrega receita salva', async () => {
    localStorage.clear();
    const favoriteRecipe = [
      {
        id: '53013',
        type: 'food',
        nationality: 'American',
        category: 'Beef',
        alcoholicOrNot: '',
        name: 'Big Mac',
        image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
      },
    ];

    const inProgressRecipe = {
      cocktails: {},
      meals: {
        53013: [
          'Olive Oil',
        ],
      },
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));

    const { history } = renderWithRedux(<App />);
    history.push('/foods/53013/in-progress');

    const favoriteButton = await screen
      .findByRole('img', { name: /black heart favorite icon/i });
    expect(favoriteButton).toBeInTheDocument();
  });
});
