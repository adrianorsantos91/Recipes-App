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

  useEffect(() => {
    dispatch(fetchRandomFoodsThunk());
  }, [dispatch]);

  useEffect(() => {
    setSurpriseMe(randomFood);
  }, [randomFood]);
  console.log(surpriseMe);

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
      <Link to="/explore/foods/surprise-me">
        <Button
          variant="outline-dark"
          data-testid="explore-surprise"
        >
          Surprise me!
        </Button>
      </Link>
      <Footer />
    </div>
  );
}
