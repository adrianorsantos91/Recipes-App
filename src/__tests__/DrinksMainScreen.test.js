import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

describe('Testes da página drinks', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  test('Testa se o filtro "All" funciona corretamente', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const buttonShake = await screen.findByRole('button', { name: /shake/i });
    userEvent.click(buttonShake);

    const ggName = screen.queryByText(/gg/i);
    expect(ggName).toBeNull();

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);

    expect(await screen.findByText(/gg/i)).toBeInTheDocument();
  });

  test('Testa se os filtros funcionam como um toggle', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const buttonShake = await screen.findByRole('button', { name: /shake/i });
    userEvent.click(buttonShake);
    userEvent.click(buttonShake);

    expect(await screen.findByText(/gg/i)).toBeInTheDocument();
  });

  test('Testa se o filtro "shake" funciona', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const buttonShake = await screen.findByRole('button', { name: /shake/i });
    userEvent.click(buttonShake);

    expect(await screen.queryByText(/gg/i)).toBeNull();
  });

  test('Testa se redireciona ao clicar na receita', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const buttonGg = await screen.findByText(/gg/i);
    userEvent.click(buttonGg);

    const titleFoodDetail = await screen.findByText(/detail/i);
    expect(titleFoodDetail).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997');
  });

  test('Testa se redireciona ao clicar na receita', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const buttonToggle = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonToggle);

    const inputSearch = screen.getByRole('textbox');
    const inputRadio = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'a');
    userEvent.click(inputRadio);
    userEvent.click(buttonSearch);

    const titleDrink = await screen.findByText(/a1/i);
    expect(titleDrink).toBeInTheDocument();
  });

  test('Testa', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/drinks');

    const categoryFilter = await screen.findByRole('button', { name: /ordinary drink/i });
    userEvent.click(categoryFilter);

    const titleDrink = await screen.findByText(/3-Mile Long Island Iced Tea/i);
    expect(titleDrink).toBeInTheDocument();
  });
});
