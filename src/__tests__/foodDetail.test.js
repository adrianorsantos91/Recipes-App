// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRedux from '../helpers/renderWithRedux';
// import responseUniqueDrink from '../mocks/responseUniqueDrink';
import responseIdFood from '../mocks/responseIdFood';
// import App from '../App';

describe('Verifica se as requisições de comida por ID estão sendo feitas', () => {
  test('Testa se a função fetchFoodById', async () => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(responseIdFood),
      })
    ));

    const response = await fetchFoodById('52977');

    expect(response).toEqual(responseIdFood);
    expect(fetch).toHaveBeenCalled();
  });
});
