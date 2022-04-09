import React from 'react';
import { Link } from 'react-router-dom/';
import drink from '../images/local_bar.svg';
import explore from '../images/explore.svg';
import meal from '../images/restaurant.svg';
import '../styles/Footer.css';

const Footer = () => (
  <footer data-testid="footer" className="link">
    <Link to="/drinks">
      <img
        src={ drink }
        className="drinks"
        alt="drinks"
        width="30"
        height="30"
        data-testid="drinks-top-btn"
      />
    </Link>
    <Link to="/explore" className="link">
      <img
        src={ explore }
        className="explore"
        alt="Icon Explore"
        width="30"
        height="30"
        data-testid="explore-bottom-btn"
      />
    </Link>
    <Link to="/foods" className="link">
      <img
        src={ meal }
        className="explore"
        alt="Icon Meal"
        width="30"
        height="30"
        data-testid="food-bottom-btn"
      />
    </Link>
  </footer>
);

export default Footer;
