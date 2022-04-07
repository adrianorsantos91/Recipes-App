import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ExploreIngredients from '../pages/ExploreIngredients';
import renderWithRedux from '../helpers/renderWithRedux';

describe('Testes da página `ExploreIngredients` - drinks', () => {
  test('Verificando se os elementos da página são renderizados.', async () => {
    renderWithRedux(<ExploreIngredients />);
    const card = await screen.findByTestId('0-ingredient-card');
    const cardImage = screen.getByTestId('0-card-img');
    const cardName = screen.getByTestId('0-card-name');

    expect(card).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });

  test('Testa a função "filterByCategory"', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/explore/drinks/ingredients');
    const card = await screen.findByTestId('0-ingredient');

    userEvent.click(card);

    const text = await screen.findByRole('img', {
      name: /search/i,
    });
    expect(text).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
