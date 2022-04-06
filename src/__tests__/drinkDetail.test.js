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

  test('Se ao acessar os detalhes da receitas com a URL correta',
    () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_DRINK_ID);

      expect(history.location.pathname).toBe(URL_DRINK_ID);
    });

  test('Se após acessar os detalhes da receitas, as informações são renderizadas na tela',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_DRINK_ID);

      const drinkImg = await screen.findByRole('img', { name: /aquamarine drink/i });
      const drinkName = screen.getByRole('heading', { name: /aquamarine/i });
      const categoryDrink = screen.getByText(/Alcoholic/i);
      const shareButton = screen.getByRole('img', { name: /share icon/i });
      const favorite = screen.getByRole('img', { name: /white heart favorite icon/i });

      expect(drinkImg).toBeInTheDocument();
      expect(drinkName).toBeInTheDocument();
      expect(categoryDrink).toBeInTheDocument();
      expect(shareButton).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
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
});
