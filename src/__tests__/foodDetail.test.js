import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

const URL_FOOD_ID = '/foods/52977';

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
      history.push(URL_FOOD_ID);
      expect(history.location.pathname).toBe(URL_FOOD_ID);
    });

  test('Se após acessar os detalhes da receitas, as informações são renderizadas na tela',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const foodImg = await screen.findByRole('img', { name: /corba food/i });
      const foodName = screen.getByRole('heading', { name: /corba/i });
      const shareButton = screen.getByRole('img', { name: /share icon/i });
      const favorite = screen.getByRole('img',
        { name: /white heart favorite icon/i });

      expect(foodImg).toBeInTheDocument();
      expect(foodName).toBeInTheDocument();
      expect(shareButton).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
    });

  test('Se ao clicar no botão de compartilhar mostra mensagem Link copied na tela',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const shareButton = await screen.findByRole('img', { name: /share icon/i });

      expect(shareButton).toBeInTheDocument();
      userEvent.click(shareButton);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();

      const messageLinkCopied = await screen.findByText(/link copied/i);
      expect(messageLinkCopied).toBeInTheDocument();
    });

  test('Se o video da receita é renderizado na tela', async () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_FOOD_ID);

    const titleVideo = await screen.findByRole('heading', { name: /video/i });

    expect(titleVideo).toBeInTheDocument();
  });

  test('Se os drinks recomendados estão sendo renderizados na tela', async () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_FOOD_ID);

    const titleRecommendation = await screen
      .findByRole('heading', { name: /recomendações/i });

    expect(titleRecommendation).toBeInTheDocument();
  });

  test('Se ao clicar no botão Start Recipe direciona para o url /in-progress',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const buttonStartRecipe = await screen
        .findByRole('button', { name: /start recipe/i });

      userEvent.click(buttonStartRecipe);

      expect(history.location.pathname).toBe('/foods/52977/in-progress');
    });

  test('Se ao entrar na receita finalizada o botão de Start Recipe não esta na tela',
    async () => {
      localStorage.clear();
      const doneRecipes = [
        {
          title: 'Corba',
          image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
          category: 'Side',
          instructions: `Pick through your lentils for any foreign debris,rinse t
          hem 2 or 3 times, drain, and set aside. Fair warning, this will probably
          turn your lentils into a solid block that you’ll have to break up later
          \r\nIn a large pot over medium-high heat, sauté the olive oil and the onion
          with a pinch of salt for about 3 minutes, then add the carrots and cook 
          for another 3 minutes.\r\nAdd the tomato paste and stir it around for around
          1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper
          as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate
          yourself on how amazing your house now smells.\r\nImmediately add the lentils,
          water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has
          come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for
          15-20 minutes or until the lentils have fallen apart and the carrots are
          completely cooked.\r\nAfter the soup has cooked and the lentils are tender,
          blend the soup either in a blender or simply use a hand blender to reach the
          consistency you desire. Taste for seasoning and add more salt if necessary.
          \r\nServe with crushed-up crackers, torn up bread, or something else to add
          some extra thickness.  You could also use a traditional thickener 
          (like cornstarch or flour), but I prefer to add crackers for
          some texture and saltiness.  Makes great leftovers, stays good in the fridge
          for about a week.`,
          ingredients: [
            'Lentils',
            'Onion',
            'Carrots',
            'Tomato Puree',
            'Cumin',
            'Paprika',
            'Mint',
            'Thyme',
            'Black Pepper',
            'Red Pepper Flakes',
            'Vegetable Stock',
            'Water',
            'Sea Salt',
          ],
          id: '52977',
          nationality: 'Turkish',
          tags: [
            'Soup',
          ],
          doneDate: '06/04/2022',
        },
      ];

      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const buttonRecipe = await screen.findByTestId('start-recipe-btn');
      expect(buttonRecipe).toHaveAttribute('hidden');
    });

  test('Se ao entrar na receita indica se ela esta favoritada no localStorage',
    async () => {
      localStorage.clear();
      const favoriteRecipes = {
        id: '52977',
        type: 'food',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      };

      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipes]));

      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const favoriteIcon = await screen.findByRole('img', {
        name: /black heart favorite icon/i });
      expect(favoriteIcon).toBeInTheDocument();
    });
});
