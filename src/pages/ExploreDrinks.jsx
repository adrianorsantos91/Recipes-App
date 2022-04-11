import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';
import { fetchRandomDrinksThunk } from '../redux/actions';
import '../App.css';
import '../styles/Explore.css';

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
    <div className="background">
      <Header title="Explore Drinks" />
      <div className="container-explore">
        <Link to="/explore/drinks/ingredients">
          <button
            type="button"
            variant="outline-dark"
            data-testid="explore-by-ingredient"
            className="button"
          >
            By Ingredient
          </button>
        </Link>
        <Link to={ `/drinks/${id}` }>
          <button
            type="button"
            variant="outline-dark"
            data-testid="explore-surprise"
            className="button"
          >
            Surprise me!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
