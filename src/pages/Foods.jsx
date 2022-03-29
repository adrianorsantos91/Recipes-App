import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Header, Footer } from '../components';
import './Foods.css';
import { action, FOOD_DATA } from '../redux/actions';
import '../App.css';

export default function Foods() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const exhibitionNumber = 12;

  useEffect(() => {
    const URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const fetchName = async () => {
      const { meals } = await fetch(URL_NAME).then((response) => response.json());
      setData(meals);
      dispatch(action(FOOD_DATA, meals));
    };
    fetchName();
  }, []);

  return (
    <div>
      <Header title="Foods" hasSearch />
      {data.filter((_item, index) => index < exhibitionNumber).map((recipe) => (
        <div key={ recipe.idMeal } className="container">
          <Card style={ { width: '18rem' } }>
            <Card.Img variant="top" src={ recipe.strMealThumb } />
            <Card.Body>
              <Card.Title>{recipe.strMeal}</Card.Title>
              <Button variant="primary">See more</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
      <Footer />
    </div>
  );
}
