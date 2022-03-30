import {
  fetchDrinksIngredients,
  fetchDrinksFirstLetter,
  fetchDrinksName,
} from '../helpers/fetchDrinkAPI';
import responseDrinkSearch from '../mocks/responseDrinkSearch';
import responseDrinkFirstLetter from '../mocks/responseDrinkFirstLetter';
import { fetchDrinkThunk } from '../redux/actions';

describe('Testa casos de sucesso', () => {
  test('Testa a função "fetchDrinksIngredients"', async () => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(responseDrinkSearch),
      })
    ));

    const response = await fetchDrinksIngredients('lemon');

    expect(response).toEqual(responseDrinkSearch);
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa a função "fetchDrinksFirstLetter"', async () => {
    fetch.mockClear();

    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(responseDrinkFirstLetter),
      })
    ));

    const response = await fetchDrinksFirstLetter('b');

    expect(response).toEqual(responseDrinkFirstLetter);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Testa casos de erro', () => {
  beforeEach(() => {
    fetch.mockClear();
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.reject(new Error('error')),
      })
    ));
  });

  test('Testa se a função "fetchDrinksIngredients" dispara erro', async () => {
    const response = await fetchDrinksIngredients('chicken');

    expect(response).toEqual('error');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa se a função "fetchDrinksName" dispara erro', async () => {
    const response = await fetchDrinksName('chicken');

    expect(response).toEqual('error');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa se a função "fetchDrinksFirstLetter" dispara erro', async () => {
    const response = await fetchDrinksFirstLetter('ch');

    expect(response).toEqual('error');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa se a função "fetchDrinkThunk" dispara erro', async () => {
    const response = await fetchDrinkThunk()();

    expect(response).toEqual('error');
    expect(fetch).toHaveBeenCalled();
  });
});
