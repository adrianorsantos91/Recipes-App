import React, { useEffect } from 'react';
/* import { Card } from 'react-bootstrap'; */
import { useDispatch, useSelector } from 'react-redux';
import { fetchNationalitiesThunk } from '../redux/actions';
import { Footer, Header } from '../components';
import '../styles/Foods.css';

export default function ExploreFoodsNationalities() {
  const dispatch = useDispatch();
  const nationalitiesList = useSelector(({ nationalities }) => nationalities);

  useEffect(() => {
    dispatch(fetchNationalitiesThunk());
  }, [dispatch]);

  return (
    <div>
      <Header title="Explore Nationalities" hasSearch />
      <div className="flex">
        <select data-testid="explore-by-nationality-dropdown">
          {nationalitiesList.map((nationality) => (
            <option
              key={ nationality.strArea }
              value={ nationality.strArea }
              data-testid={ `${nationality.strArea}-option` }
            >
              {nationality.strArea}
            </option>))}
        </select>

        {/* <Card style={ { width: '18rem' } }>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              S
            </Card.Text>

          </Card.Body>
        </Card> */}
      </div>
      <Footer />
    </div>
  );
}
