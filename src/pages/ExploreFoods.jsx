import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';
import { fetchRandomFoodsThunk } from '../redux/actions';

export default function ExploreFoods() {
  const dispatch = useDispatch();
  const randomFood = useSelector(({ randomFoodAPIData }) => randomFoodAPIData);
  const [surpriseMe, setSurpriseMe] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(fetchRandomFoodsThunk());
  }, []);

  useEffect(() => {
    setSurpriseMe(randomFood);
  }, [randomFood]);

  useEffect(() => {
    if (surpriseMe.length) {
      setId(surpriseMe[0].idMeal);
    }
  }, [surpriseMe]);

  console.log(surpriseMe);
  console.log(id);

  /* const id = surpriseMe[0].idMeal;
  console.log(id); */
  // const { idMeal } = surpriseMe;
  // console.log(surpriseMe[0].idMeal);
  /* console.log(surpriseMe[meals][idMeal]); */

  return (
    <div>
      <Header title="Explore Foods" />
      <Link to="/explore/foods/ingredients">
        <Button
          variant="outline-dark"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <Button
          variant="outline-dark"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </Button>
      </Link>
      {/* <Link to="/foods/53021"> */}
      <Link to={ `/foods/${id}` }>
        <Button
          variant="outline-dark"
          data-testid="explore-surprise"
          /* onClick={ () => setSurpriseMe(randomFood) } */
        >
          Surprise me!
        </Button>
      </Link>
      <Footer />
    </div>
  );
}
