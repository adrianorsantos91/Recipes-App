import {
  fetchFoodsIngredients,
  fetchFoodsFirstLetter,
  fetchFoodsName,
} from '../helpers/fetchFoodAPI';
import responseFoodFirstLetter from '../mocks/responseFoodFirstLetter';

describe('Testa casos de sucesso', () => {
  test('Testa a função "fetchFoodsFirstLetter"', async () => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(responseFoodFirstLetter),
      })
    ));

    const response = await fetchFoodsFirstLetter('c');

    expect(response).toEqual(responseFoodFirstLetter);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Testa casos de erro', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.reject(new Error('error')),
      })
    ));
  });

  test('Testa se a função "fetchFoodsIngredients" dispara erro', async () => {
    const response = await fetchFoodsIngredients('lemon');

    expect(response).toEqual('error');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa se a função "fetchFoodsName" dispara erro', async () => {
    const response = await fetchFoodsName('gg');

    expect(response).toEqual('error');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa se a função "fetchFoodsFirstLetter" dispara erro', async () => {
    const response = await fetchFoodsFirstLetter('ch');

    expect(response).toEqual('error');
    expect(fetch).toHaveBeenCalled();
  });
});
