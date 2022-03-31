import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

describe('Testes da página `RecipeInProgress`', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  test('Verifica se há itens na tela', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks/178319/in-progress');

    const pageTitle = await screen.findByRole(
      'heading', { level: 1, name: /recipe in progress/i },
    );
    // const drinkImage = screen.getByRole('img', { name: /recipe/i });
    // const shareIcon = screen.getByRole('img', { name: /button share icon/i });

    expect(pageTitle).toBeInTheDocument();
  });
});
