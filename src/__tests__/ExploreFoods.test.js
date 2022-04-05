import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFoods from '../pages/ExploreFoods';
import renderWithRedux from '../helpers/renderWithRedux';
// import randomFoodsResponseAPI from '../mocks/randomFoodsAPI';

/* const ID_FOOD = 52973; */
/* const { idMeal } = randomFoodsResponseAPI.meals;
console.log(idMeal); */

test('Verificando se existe os elementos da Explore Foods.', () => {
  renderWithRedux(<ExploreFoods />);
  const byIngredientsBtn = screen.getByTestId('explore-by-ingredient');
  const byNationalityBtn = screen.getByTestId('explore-by-nationality');
  const surpriseMeBtn = screen.getByTestId('explore-surprise');

  expect(byIngredientsBtn).toBeInTheDocument();
  expect(byNationalityBtn).toBeInTheDocument();
  expect(surpriseMeBtn).toBeInTheDocument();
});

describe('Testa casos de sucesso', () => {
  test('Testa a função "randomFoodsAPI"', async () => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(randomFoodsAPI),
      })
    ));
    expect(fetch).toHaveBeenCalled();
  });

  test('Verificando se o botão surprise Me redireciona para a pagina correta', () => {
    const { history } = renderWithRedux(<ExploreFoods />);
    const surpriseMeBtn = screen.getByTestId('explore-surprise');
    userEvent.click(surpriseMeBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods/52973');
  });
});
