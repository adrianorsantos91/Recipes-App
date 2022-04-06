import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

const URL_FOOD_ID = '/foods/52977';

describe('Verifica se as requisições de comida por ID estão sendo feitas', () => {
  test('Se ao acessar os detalhes da receitas com a URL correta',
    () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      expect(history.location.pathname).toBe(URL_FOOD_ID);
    });

  test('Se após acessar os detalhes da receitas, as informações são renderizadas na tela',
    () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const foodImg = screen.getByRole('img', { name: /corba food/i });
      const foodName = screen.getByRole('heading', { name: /corba/i });
      const categoryFood = screen.getAllByText(/side/i);
      const shareButton = screen.getByRole('img', { name: /share icon/i });
      const favorite = screen.getByRole('img',
        { name: /white heart favorite icon/i });

      expect(foodImg).toBe('corba-food');
      expect(foodName).toBe('corba');
      expect(categoryFood).toBe('side');
      expect(shareButton).toBe('/share icon/');
      expect(favorite).toBe('white heart');
    });

  test('Se o video da receita é renderizado na tela', () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_FOOD_ID);

    const titleVideo = screen.getByRole('heading', { name: /video/i });
    const preview = screen.getByText(/preview-frame/i);

    expect(titleVideo).toBe('/video/');
    expect(titleVideo).toBeInTheDocument();
    expect(preview).toBe('preview');
  });

  test('Se os drinks recomendados estão sendo renderizados na tela', () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_FOOD_ID);

    const titleRecommentation = screen.getByRole('heading', { name: /recomendações/i });

    expect(titleRecommentation).toBe('/recomendações/');
    expect(titleRecommentation).toBeInTheDocument();
  });

  test('Se ao clicar no botão Start Recipe direciona para o url /in-progress', () => {
    const { history } = renderWithRedux(<App />);

    history.push(URL_FOOD_ID);

    const buttonStartRecipe = screen.getByRole('button', { name: /start recipe/i });

    userEvent.click(buttonStartRecipe);

    expect(history.location.pathname).toBe('/foods/52977/in-progress');
  });
});

// test('Testa se a função fetchFoodByIdThunk com a url correta', async () => {
//   global.fetch = jest.fn(() => (
//     Promise.resolve({
//       json: () => Promise.resolve(responseIdFood),
//     })
//   ));

//   const { history } = renderWithRedux(<App />);

//   history.push('/food/52977');

//   fetchFoodByIdThunk('52977');

//   const URL_IDFOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';

//   expect(fetch).toHaveBeenCalledWith(URL_IDFOOD);
// });

// test('Testa se a função fetchDrinkRecommendationThunk', async () => {
//   global.fetch = jest.fn(() => (
//     Promise.resolve({
//       json: () => Promise.resolve(responseIdDrink),
//     })
//   ));

//   // const response = await fetchDrinkRecommendationThunk();

//   // expect(response).toEqual(responseIdDrink);
//   expect(fetch).toHaveBeenCalled();
// });
