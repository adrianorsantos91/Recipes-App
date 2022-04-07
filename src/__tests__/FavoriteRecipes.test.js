import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

describe('Testes da página `DoneRecipes`', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  test('Verifica se a página de receitas favoritas é renderizada', async () => {
    const mockClipboard = { writeText: jest.fn() };
    global.navigator.clipboard = mockClipboard;

    const HORIZONTAL_IMAGE = '0-horizontal-image';
    const favoritesRecipes = [
      {
        id: '52977',
        type: 'food',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        id: '53060',
        type: 'food',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));

    const { history } = renderWithRedux(<App />);
    history.push('/favorite-recipes');

    const allImages = await screen.findAllByTestId(/horizontal-image/);
    expect(allImages.length).toBe(2);

    const buttonFilterDrink = screen.getByRole('button', { name: /drinks/i });
    const buttonFilterFoods = screen.getByRole('button', { name: /foods/i });
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonShare = screen.getAllByRole('img', { name: /button share/i });

    userEvent.click(buttonShare[0]);
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/foods/52977');

    userEvent.click(buttonFilterDrink);
    expect(screen.queryByTestId(HORIZONTAL_IMAGE)).toBeNull();

    userEvent.click(buttonFilterFoods);
    expect(screen.getByTestId(HORIZONTAL_IMAGE)).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(screen.getByTestId(HORIZONTAL_IMAGE)).toBeInTheDocument();

    const unfavoriteRecipe = screen.getByTestId('0-button-remove-favorite');
    userEvent.click(unfavoriteRecipe);

    const newRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(newRecipes.length).not.toEqual(2);
    expect(newRecipes.length).toEqual(1);
  });

  test('Verifica se adiciona novas receitas favoritas', async () => {
    const favoritesRecipes = [
      {
        id: '52977',
        type: 'food',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        id: '53060',
        type: 'food',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      },
    ];
    const THREE = 3;
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));

    const { history } = renderWithRedux(<App />);
    history.push('/drinks/15997');

    const buttonFavorite = await screen
      .findByRole('img', { name: /white heart favorite icon/i });

    userEvent.click(buttonFavorite);
    const newRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(newRecipes.length).toEqual(THREE);
  });

  test('Verifica se adiciona novas receitas favoritas', async () => {
    localStorage.clear();
    const { history } = renderWithRedux(<App />);
    history.push('/drinks/15997');

    const buttonFavorite = await screen
      .findByRole('img', { name: /white heart favorite icon/i });

    userEvent.click(buttonFavorite);
    const newRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(newRecipes.length).toEqual(1);
  });
});
