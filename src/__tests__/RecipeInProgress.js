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

  test('Verifica se há um botão para finalizar receita na tela', () => {
    const finishRecipe = screen.getByRole('button', { name: /finish recipe/i });

    expect(finishRecipe).toBeInTheDocument();
  });
});
