import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFoods from '../pages/ExploreFoods';
import renderWithRedux from '../helpers/renderWithRedux';
import responseDrinksFirstLetter from '../mocks/responseDrinkFirstLetter';
import ExploreDrinks from '../pages/ExploreDrinks';

describe('Testa casos de sucesso', () => {
  test('Verificando se existe os elementos da Explore Foods.', () => {
    renderWithRedux(<ExploreFoods />);
    const byIngredientsBtn = screen.getByTestId('explore-by-ingredient');
    const surpriseMeBtn = screen.getByTestId('explore-surprise');

    expect(byIngredientsBtn).toBeInTheDocument();
    expect(surpriseMeBtn).toBeInTheDocument();
  });

  test('Testa a função "randomFoodsAPI"', async () => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(responseDrinksFirstLetter),
      })
    ));

    renderWithRedux(<ExploreDrinks />);
    expect(fetch).toHaveBeenCalled();
  });

  test(
    'Verificando se o botão surprise Me redireciona para a pagina correta', async () => {
      global.fetch = jest.fn(() => (
        Promise.resolve({
          json: () => Promise.resolve(),
        })
      ));

      const { history } = renderWithRedux(<ExploreDrinks />);
      const surpriseMeBtn = screen.getByTestId('explore-surprise');
      userEvent.click(surpriseMeBtn);

      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/');
    },
  );
});
