import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
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
});
