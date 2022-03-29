import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

export default function ExploreDrinks() {
  return (
    <div>
      <Header title="Explore Drinks" />
      <Link to="/explore/drinks/ingredients">By Ingredient</Link>
      {/* <Link to="/explore/drinks/nationalities">By Nationality</Link>
      <Link to="/explore/drinks/surprise-me">Surprise me!</Link> */}
      <Footer />
    </div>
  );
}
