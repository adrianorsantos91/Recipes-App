// App.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';

test('Verificando se existe os elementos da Header.', () => {
  renderWithRouter(<Header />);
  const title = screen.getByTestId('page-title');
  const profileTopIcon = screen.getByTestId('profile-top-btn');
  const searchTopIcon = screen.getByTestId('search-top-btn');
  expect(title).toBeInTheDocument();
  expect(profileTopIcon).toBeInTheDocument();
  expect(searchTopIcon).toBeInTheDocument();
});

test('Verificando se o botão do perfil redireciona para a pagina correta', () => {
  renderWithRouter(<Header />);
  const profileLink = screen.getByRole('img', { name: 'perfil' });
  const searchLink = screen.getByRole('img', { name: 'perfil' });

  userEvent.click(profileLink);
  userEvent.click(searchLink);

  expect(profileLink).toBeInTheDocument();
  expect(searchLink).toBeInTheDocument();
});
