import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../pages/NotFound';
import Header from '../components/Header';

describe('Testes realizados na página de notFound', () => {
  beforeAll(() => {
    // JSDom does not implement this and an error was being
    // thrown from jest-axe because of it.
    window.getComputedStyle = () => {};
  });

  test('Verificando se existe os elementos da Header.', () => {
    renderWithRouter(<Header title="name" hasSearch />);
    const title = screen.getByTestId('page-title');
    const profileTopIcon = screen.getByTestId('profile-top-btn');
    const searchTopIcon = screen.getByTestId('search-top-btn');
    expect(title).toBeInTheDocument();
    expect(profileTopIcon).toBeInTheDocument();
    expect(searchTopIcon).toBeInTheDocument();
  });

  it('Existe o testo informativo de Not Found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText('Not Found');
    expect(notFound).toBeInTheDocument();
  });
});
