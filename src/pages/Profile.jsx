import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

const Profile = () => (
  <>
    <Header title="Profile" />
    <h2 data-testid="profile-email">email@email.com</h2>
    <Link to="/done-recipes">
      <button type="button" data-testid="profile-done-btn">
        Done Recipes
      </button>
    </Link>
    <Link to="/favorite-recipes">
      <button type="button" data-testid="profile-favorite-btn">
        Favorite Recipes
      </button>
    </Link>
    <button type="button" data-testid="profile-logout-btn">
      Logout
    </button>
    <Footer />
  </>
);

export default Profile;
