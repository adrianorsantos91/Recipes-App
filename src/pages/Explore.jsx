import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

export default function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <Link to="/explore/foods">Explore Foods</Link>
      <Link to="/explore/drinks">Explore Drinks</Link>
      <Footer />
    </div>
  );
}
