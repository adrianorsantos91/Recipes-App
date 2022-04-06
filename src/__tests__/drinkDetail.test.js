import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

const URL_DRINK_ID = '/drinks/178319';

describe('Verifica se as requisições de comida por ID estão sendo feitas', () => {
  test('Se ao acessar os detalhes da receitas com a URL correta',
    () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_DRINK_ID);

      expect(history.location.pathname).toBe(URL_DRINK_ID);
    });

  test('Se após acessar os detalhes do drink, as informações são renderizadas na tela',
    () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_DRINK_ID);

      const drinkImg = screen.getByRole('img', { name: /aquamarine drink/i });
      const drinkName = screen.getByRole('heading', { name: /aquamarine/i });
      const categoryDrink = screen.getByText(/Alcoholic/i);
      const shareButton = screen.getByRole('img', { name: /share icon/i });
      const favorite = screen.getByRole('img', { name: /white heart favorite icon/i });

      expect(drinkImg).toBe('corba-food');
      expect(drinkName).toBe('corba');
      expect(categoryDrink).toBe('side');
      expect(shareButton).toBe('/share icon/');
      expect(favorite).toBe('white heart');
    });

  test('Se o video da receita é renderizado na tela', () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_FOOD_ID);

    const titleVideo = screen.getByRole('heading', { name: /video/i });

    expect(titleVideo).toBe('/video/');
    expect(titleVideo).toBeInTheDocument();
  });

  test('Se os drinks recomendados estão sendo renderizados na tela', () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_FOOD_ID);

    const titleRecommentation = screen.getByRole('heading', { name: /recomendações/i });

    expect(titleRecommentation).toBe('/recomendações/');
    expect(titleRecommentation).toBeInTheDocument();
  });

  test('Se ao clicar no botão Start Recipe direciona para o url /in-progress', () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_DRINK_ID);

    const buttonStartRecipe = screen.getByRole('button', { name: /start recipe/i });

    userEvent.click(buttonStartRecipe);

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
});
