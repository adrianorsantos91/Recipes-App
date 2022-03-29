import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Verifica se o menu inferior esta direcionando para as urls corretas', () => {
  test('Se ao clicar no botão /drinks-bottom-btn/ direciona para a url /drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const buttonDrink = screen.getByRole('button', { name: /icon drink/i });

    userEvent.click(buttonDrink);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Se ao clicar no botão /explore-bottom-btn/ direciona para a url /explore', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const buttonExplore = screen.getByRole('button', { name: /icon explore/i });

    userEvent.click(buttonExplore);

    expect(history.location.pathname).toBe('/explore');
  });

  test('Se ao clicar no botão /foods-bottom-btn/ permanece na url /foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const buttonFoods = screen.getByRole('button', { name: /icon meal/i });

    userEvent.click(buttonFoods);

    expect(history.location.pathname).toBe('/foods');
  });

  test('Se ao clicar no botão foods na tela explore volta para /foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const buttonExplore = screen.getByRole('button', { name: /icon explore/i });

    userEvent.click(buttonExplore);

    const buttonFoods = screen.getByRole('button', { name: /icon meal/i });

    userEvent.click(buttonFoods);

    expect(history.location.pathname).toBe('/foods');
  });

  test('Se ao clicar no botão foods na tela drinks volta para /foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const buttonDrink = screen.getByRole('button', { name: /icon drink/i });

    userEvent.click(buttonDrink);

    const buttonFoods = screen.getByRole('button', { name: /icon meal/i });

    userEvent.click(buttonFoods);

    expect(history.location.pathname).toBe('/foods');
  });
});
