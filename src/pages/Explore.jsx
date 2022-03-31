import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

export default function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <Link to="/explore/foods">
        <Button
          variant="outline-dark"
          data-testid="explore-foods"
        >
          Explore Foods
        </Button>
      </Link>
      <Link to="/explore/drinks">
        <Button
          variant="outline-dark"
          data-testid="explore-drinks"
        >
          Explore Drinks
        </Button>
      </Link>
      <Footer />
    </div>
  );
}
