import React from 'react';
import { Link } from 'react-router-dom/';
import drink from '../images/local_bar.svg';
import explore from '../images/explore.svg';
import meal from '../images/restaurant.svg';
import '../styles/Footer.css';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/drinks">
      <img
        src={ drink }
        className="drinks"
        alt="drinks"
        width="50"
        height="50"
        data-testid="drinks-top-btn"
      />
    </Link>
    <Link to="/explore">
      <img
        src={ explore }
        className="explore"
        alt="Icon Explore"
        width="50"
        height="50"
        data-testid="explore-bottom-btn"
      />
    </Link>
    <Link to="/foods">
      <img
        src={ meal }
        className="explore"
        alt="Icon Meal"
        width="50"
        height="50"
        data-testid="food-bottom-btn"
      />
    </Link>
  </footer>
);

export default Footer;
