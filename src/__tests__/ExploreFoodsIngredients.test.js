import React from 'react';
import { screen } from '@testing-library/react';
import ExploreIngredients from '../pages/ExploreIngredients';
import renderWithRedux from '../helpers/renderWithRedux';
// import userEvent from '@testing-library/user-event';

describe('Testes da página `ExploreIngredients` - foods', () => {
  test('Verificando se os elementos da página são renderizados.', async () => {
    renderWithRedux(<ExploreIngredients />);
    const card = await screen.findByTestId('0-ingredient-card');
    const cardImage = screen.getByTestId('0-card-img');
    const cardName = screen.getByTestId('0-card-name');

    expect(card).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });
});

/*   "variant": "top",
  "src": "https://www.themealdb.com/images/ingredients/Chicken-Small.png",
  "data-testid": "0-card-img" */
