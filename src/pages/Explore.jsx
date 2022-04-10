import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';
import '../App.css';
import '../styles/Explore.css';

export default function Explore() {
  return (
    <div className="background">
      <Header title="Explore" hasSearch />
      <div className="container-explore">
        <Link to="/explore/foods">
          <button
            type="button"
            variant="outline-dark"
            data-testid="explore-foods"
            className="button"
          >
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks">
          <button
            type="button"
            variant="outline-dark"
            data-testid="explore-drinks"
            className="button"
          >
            Explore Drinks
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
