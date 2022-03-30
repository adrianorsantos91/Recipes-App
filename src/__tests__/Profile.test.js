import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { Profile } from '../pages';

describe('Testes realizados na página do perfil', () => {
  test('Verificando se existe os elementos da página do perfil.', () => {
    renderWithRouter(<Profile />);

    const title = screen.getByTestId('page-title');
    const profileTopIcon = screen.getByTestId('profile-top-btn');
    const email = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(title).toBeInTheDocument();
    expect(profileTopIcon).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Verificando se os botões no perfil redirecionam para as páginas corretas', () => {
    const { history } = renderWithRouter(<Profile />);
    const profileLink = screen.getByRole('img', { name: 'perfil' });
    expect(profileLink).toBeInTheDocument();
    userEvent.click(profileLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Verificando se o botão Done Recipes redireciona para a página correta', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test(`Verificando se o botão Favorite Recipes
   redireciona para a página correta`, () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test(`Verificando se o botão Logout
   redireciona para a página correta`, () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
