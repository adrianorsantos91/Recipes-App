import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';
import { fetchRandomFoodsThunk } from '../redux/actions';
import '../App.css';
import '../styles/ExploreFoods.css';

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

  return (
    <div className="background">
      <Header title="Explore Foods" />
      <div className="container-explore-foods">
        <Link to="/explore/foods/ingredients">
          <button
            type="button"
            variant="outline-dark"
            data-testid="explore-by-ingredient"
            className="button"
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            variant="outline-dark"
            data-testid="explore-by-nationality"
            className="button"
          >
            By Nationality
          </button>
        </Link>
        <Link to={ `/foods/${id}` }>
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
