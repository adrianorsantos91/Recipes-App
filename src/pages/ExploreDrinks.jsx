import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';
import { fetchRandomDrinksThunk } from '../redux/actions';

export default function ExploreDrinks() {
  const dispatch = useDispatch();
  const randomDrink = useSelector(({ randomDrinkAPIData }) => randomDrinkAPIData);
  const [surpriseMe, setSurpriseMe] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(fetchRandomDrinksThunk());
  }, []);

  useEffect(() => {
    setSurpriseMe(randomDrink);
  }, [randomDrink]);

  useEffect(() => {
    if (surpriseMe.length) {
      setId(surpriseMe[0].idDrink);
    }
  }, [surpriseMe]);

  return (
    <div>
      <Header title="Explore Drinks" />
      <Link to="/explore/drinks/ingredients">
        <Button
          variant="outline-dark"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Button>
      </Link>
      <Link to={ `/drinks/${id}` }>
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
