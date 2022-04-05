import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchNationalitiesThunk } from '../redux/actions';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import '../styles/Foods.css';

export default function ExploreFoodsNationalities() {
  const dispatch = useDispatch();
  const nationalitiesList = useSelector(({ nationalities }) => nationalities);
  const history = useHistory();
  const [currentNationality, setCurrentNationality] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    dispatch(fetchNationalitiesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentNationality === '') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then(({ meals }) => setFoodList(meals))
        .catch((error) => error.message);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentNationality}`)
        .then((response) => response.json())
        .then(({ meals }) => setFoodList(meals))
        .catch((error) => error.message);
    }
  }, [currentNationality]);

  return (
    <div>
      <Header title="Explore Nationalities" hasSearch />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => setCurrentNationality(target.value) }
        className="flex"
      >
        <option
          value=""
          data-testid="All-option"
        >
          All

        </option>
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
                data-testid={ `${index}-card-img` }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${index}-card-name` }
                >
                  {food.strMeal}

                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}

      <Footer />
    </div>
  );
}
