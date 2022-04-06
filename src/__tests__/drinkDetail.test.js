import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

const URL_DRINK_ID = '/drinks/178319';

describe('Verifica se as requisições de comida por ID estão sendo feitas', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  beforeEach(() => { // https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
    const mockClipboard = { writeText: jest.fn() };
    global.navigator.clipboard = mockClipboard;
  });

  test('Se ao acessar os detalhes da receitas com a URL correta',
    () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_DRINK_ID);

      expect(history.location.pathname).toBe(URL_DRINK_ID);
    });

  test('Se na tela de detalhes tem uma imagem da receita na tela',
    async () => {
      const { history } = renderWithRedux(<App />);
      history.push(URL_DRINK_ID);
      const foodImg = await screen.findByRole('img', { name: /aquamarine drink/i });
      expect(foodImg).toBeInTheDocument();
    });

  test('Se na tela de detalhes tem um titulo com o nome da receita na tela',
    async () => {
      const { history } = renderWithRedux(<App />);
      history.push(URL_DRINK_ID);
      const foodName = await screen.findByRole('heading', { name: /corba/i });
      expect(foodName).toBeInTheDocument();
    });

  test('Se na tela de detalhes tem o botão de compartilhar a receita na tela',
    async () => {
      const { history } = renderWithRedux(<App />);
      history.push(URL_DRINK_ID);
      const shareButton = await screen.findByRole('img', { name: /share icon/i });

      expect(shareButton).toBeInTheDocument();
    });

  test('Se ao clicar no botão de compartilhar mostra mensagem Link copied na tela',
    async () => {
      const { history } = renderWithRedux(<App />);
      history.push(URL_DRINK_ID);
      const shareButton = await screen.findByRole('img', { name: /share icon/i });

      expect(shareButton).toBeInTheDocument();
      userEvent.click(shareButton);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();

      const messageLinkCopied = await screen.findByText(/link copied/i);
      expect(messageLinkCopied).toBeInTheDocument();
    });

  test('Se ao clicar no botão de favoritar altera o icone na tela',
    async () => {
      const { history } = renderWithRedux(<App />);
      history.push(URL_DRINK_ID);

      const favoriteButtonWhite = await screen.findByRole('img',
        { name: /white heart favorite icon/i });

      expect(favoriteButtonWhite).toBeInTheDocument();
      userEvent.click(favoriteButtonWhite);
      expect(screen.queryByRole('img',
        { name: /white heart favorite icon/i })).toBeNull();
      const favoriteButtonBlack = screen.getByRole('img',
        { name: /black heart favorite icon/i });
      expect(favoriteButtonBlack).toBeInTheDocument();
    });

  test('Se os drinks recomendados estão sendo renderizados na tela', async () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_DRINK_ID);

    const titleRecommendation = await screen
      .findByRole('heading', { name: /recomendações/i });

    expect(titleRecommendation).toBeInTheDocument();
  });

  test(
    'Se ao clicar no botão Start Recipe direciona para o url /in-progress', async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_DRINK_ID);

      const buttonStartRecipe = await screen
        .findByRole('button', { name: /start recipe/i });

      userEvent.click(buttonStartRecipe);

      expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    },
  );

  test('aa', async () => {
    localStorage.clear();
    const doneRecipes = [{
      title: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      category: 'Cocktail',
      instructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
      ingredients: [
        'Hpnotiq',
        'Pineapple Juice',
        'Banana Liqueur',
      ],
      id: '178319',
      alcoholicOrNot: 'Alcoholic',
      tags: [],
      nationality: '',
      doneDate: '06/04/2022',
    }];

    const inProgressRecipes = {
      cocktails: {
        178319: [
          'Banana Liqueur',
          'Hpnotiq',
          'Pineapple Juice',
        ],
      },
      meals: {},
    };

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithRedux(<App />);

    history.push(URL_DRINK_ID);

    const buttonStartRecipe = await screen.findByTestId('start-recipe-btn');

    expect(buttonStartRecipe).toHaveAttribute('hidden');
  });
});
