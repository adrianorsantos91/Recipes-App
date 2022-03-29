import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Header, Footer } from '../components';
import './Foods.css';
import '../App.css';

export default function Drinks() {
  const [data, setData] = useState([]);

  const exhibitionNumber = 12;

  useEffect(() => {
    const URL_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const fetchName = async () => {
      const { drinks } = await fetch(URL_NAME).then((response) => response.json());
      setData(drinks);
    };
    fetchName();
  }, []);
  console.log(data);

  return (
    <div>
      <div>
        <Header title="Drinks" hasSearch />
        {data.filter((_item, index) => index < exhibitionNumber).map((drink) => (
          <div key={ drink.idDrink } className="container">
            <Card style={ { width: '18rem' } }>
              <Card.Img variant="top" src={ drink.strDrinkThumb } />
              <Card.Body>
                <Card.Title>{drink.strDrink}</Card.Title>
                <Button variant="primary">See more</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
