import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

export default function ExploreFoods() {
  return (
    <div>
      <Header title="Explore Foods" />
      <Link to="/explore/foods/ingredients">By Ingredient</Link>
      <Link to="/explore/foods/nationalities">By Nationality</Link>
      <Link to="/explore/foods/surprise-me">Surprise me!</Link>
      <Footer />
    </div>
  );
}
