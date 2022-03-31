import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

export default function ExploreFoods() {
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
          data-testid="explore-by-nationality"
        >
          Surprise me!
        </Button>
      </Link>
      <Footer />
    </div>
  );
}
