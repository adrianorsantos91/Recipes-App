import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

export default function ExploreDrinks() {
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
      <Link to="/explore/drinks/surprise-me">
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
