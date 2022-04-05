import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

describe('Testes da página `DoneRecipes`', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  test('Verifica se a página de receitas finalizadas é renderizada', async () => {
    const mockClipboard = { writeText: jest.fn(), readText: jest.fn() };
    global.navigator.clipboard = mockClipboard;

    const { history } = renderWithRedux(<App />);
    history.push('/foods/52977/in-progress');

    const finishRecipe = screen.getByRole('button', { name: /finish recipe/i });
    const labels = await screen.findAllByTestId(/ingredient-step/i);
    const HORIZONTAL_IMAGE = '0-horizontal-image';

    labels.forEach((label) => {
      label.firstChild.click();
    });

    userEvent.click(finishRecipe);

    const imageRecipe = await screen.findByTestId(HORIZONTAL_IMAGE);
    const titleRecipe = screen.getByTestId('0-horizontal-top-text');
    const recipeType = screen.getByTestId('0-Soup-horizontal-tag');
    const buttonShare = screen.getByRole('img', { name: /button share/i });
    const buttonFilterDrink = screen.getByRole('button', { name: /drinks/i });
    const buttonFilterFoods = screen.getByRole('button', { name: /foods/i });
    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(imageRecipe).toBeInTheDocument();
    expect(titleRecipe).toBeInTheDocument();
    expect(recipeType).toBeInTheDocument();
    expect(buttonShare).toBeInTheDocument();

    userEvent.click(buttonShare);
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/foods/52977');

    userEvent.click(buttonFilterDrink);
    expect(screen.queryByTestId(HORIZONTAL_IMAGE)).toBeNull();

    userEvent.click(buttonFilterFoods);
    expect(screen.getByTestId(HORIZONTAL_IMAGE)).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(screen.getByTestId(HORIZONTAL_IMAGE)).toBeInTheDocument();
  });
});
