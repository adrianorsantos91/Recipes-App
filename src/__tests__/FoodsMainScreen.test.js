import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';
// import responseDessertCategory from '../mocks/responseDessertCategory';
// import responseCategories from '../mocks/responseCategories';

describe('Testes da página foods', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  test('Testa se o filtro "All" funciona corretamente', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/foods');

    const buttonBreakfast = await screen.findByRole('button', { name: /breakfast/i });
    userEvent.click(buttonBreakfast);

    const corba = screen.queryByText(/corba/i);
    expect(corba).toBeNull();

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  });

  test('Testa se os filtros funcionam como um toggle', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/foods');

    const buttonBreakfast = await screen.findByRole('button', { name: /breakfast/i });
    userEvent.click(buttonBreakfast);
    userEvent.click(buttonBreakfast);

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  });

  test('Testa se o filtro "chicken" funciona', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/foods');

    const buttonChicken = await screen.findByRole('button', { name: /chicken/i });
    userEvent.click(buttonChicken);

    expect(await screen.queryByText(/corba/i)).toBeNull();
  });

  test('Testa se redireciona ao clicar na receita', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/foods');

    const buttonCorba = await screen.findByText(/corba/i);
    userEvent.click(buttonCorba);

    const titleFoodDetail = await screen.findByText(/food detail/i);
    expect(titleFoodDetail).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/foods/52977');
  });

  test('Testa se redireciona ao clicar na receita', async () => {
    const { history } = renderWithRedux(<App />);
    history.push('/foods');

    const buttonToggle = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonToggle);

    const inputSearch = screen.getByRole('textbox');
    const inputRadio = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'a');
    userEvent.click(inputRadio);
    userEvent.click(buttonSearch);

    const titleFood = await screen.findByText(/apple frangipan tart/i);
    expect(titleFood).toBeInTheDocument();
  });
});
