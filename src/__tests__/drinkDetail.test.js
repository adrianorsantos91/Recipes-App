// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRedux from '../helpers/renderWithRedux';
// import responseUniqueDrink from '../mocks/responseUniqueDrink';
import responseIdDrink from '../mocks/responseIdDrink';
// import App from '../App';

describe('Verifica se as requisições de comida e drink por ID estão sendo feitas', () => {
  test('Testa se a função fetchDrinkById', async () => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(responseIdDrink),
      })
    ));

    const response = await fetchDrinkById('');

    expect(response).toEqual(responseIdDrink);
    expect(fetch).toHaveBeenCalled();
  });
});
