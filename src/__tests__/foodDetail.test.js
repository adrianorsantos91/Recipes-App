import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';

const URL_FOOD_ID = '/foods/52977';

describe('Verifica se as informações da comida estão sendo montadas na tela', () => {
  // https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  test('Se ao acessar a página de detalhes da receita a URL estará correta',
    () => {
      const { history } = renderWithRedux(<App />);
      history.push(URL_FOOD_ID);
      expect(history.location.pathname).toBe(URL_FOOD_ID);
    });

  test('Se após acessar os detalhes da receita, as informações são renderizadas na tela',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const foodImg = await screen.findByRole('img', { name: /corba food/i });
      expect(foodImg.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
      expect(foodImg).toBeInTheDocument();

      const foodName = screen.findByRole('heading',
        { name: /corba/i });
      expect(foodName).toBeInTheDocument();

      const categoryFood = screen.findByText(/side/i);
      expect(categoryFood).toBeInTheDocument();

      const shareButton = screen.findByRole('img', { name: /share icon/i });
      expect(shareButton).toBeInTheDocument();

      const favorite = await screen.findByRole('img',
        { name: /white heart favorite icon/i });
      expect(favorite).toBeInTheDocument();
    });

  test('Se o video da receita é renderizado na tela',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const titleVideo = await screen.findByRole('heading', { name: /video/i });
      const preview = screen.findByText(/preview-frame/i);

      expect(titleVideo).toBeInTheDocument();
      expect(preview).toBeInTheDocument();
    });

  test('Se os drinks recomendados estão sendo renderizados na tela',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const titleRecommentation = await screen.findByRole('heading',
        { name: /recomendações/i });

      expect(titleRecommentation).toBeInTheDocument();
    });

  // teste('Se ao clicar no botão de favorito altera o icone para /black heart/',
  //   () => {

  //   });

  // teste('Se ao clicar no botão de favorito altera o icone para /black heart/',
  //   () => {

  //   });

  test('Se ao clicar no botão Start Recipe direciona para o url /in-progress',
    async () => {
      const { history } = renderWithRedux(<App />);

      history.push(URL_FOOD_ID);

      const buttonStartRecipe = await screen.findByRole('button',
        { name: /start recipe/i });

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
