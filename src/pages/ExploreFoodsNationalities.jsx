import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchNationalitiesThunk,
  fetchFoodsPerNationalitiesThunk } from '../redux/actions';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import '../styles/Foods.css';

export default function ExploreFoodsNationalities() {
  const dispatch = useDispatch();
  const nationalitiesList = useSelector(({ nationalities }) => nationalities);
  const history = useHistory();
  const [currentNationality, setCurrentNationality] = useState('American');

  useEffect(() => {
    dispatch(fetchNationalitiesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFoodsPerNationalitiesThunk(currentNationality));
  }, [currentNationality]);

  const foodList = useSelector(({ foodNationalities }) => foodNationalities);
  console.log(foodList);
  return (
    <div>
      <Header title="Explore Nationalities" hasSearch />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => setCurrentNationality(target.value) }
        className="flex"
      >
        {nationalitiesList.map((nationality) => (
          <option
            key={ nationality.strArea }
            value={ nationality.strArea }
            data-testid={ `${nationality.strArea}-option` }
          >
            {nationality.strArea}
          </option>))}
      </select>
      {foodList
      && foodList.filter((_, index) => index < FIRST_TWELVE_RECIPES)
        .map((food, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ food.strMeal }
            className="flex-container"
          >
            <Card style={ { width: '18rem' } }>
              <Card.Img
                variant="top"
                src={ food.strMealThumb }
                onClick={ () => history.push(`../../foods/${food.idMeal}`) }
              />
              <Card.Body>
                <Card.Title>{food.strMeal}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}

      <Footer />
    </div>
  );
}
