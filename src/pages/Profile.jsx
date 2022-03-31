import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';

const Profile = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = (JSON.parse(localStorage.getItem('user'))) || { email: '' };
    setEmail(userEmail.email);
  }, []);

  return (
    <>
      <Header title="Profile" />
      <h2 data-testid="profile-email">
        {email}
      </h2>
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
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      {}
      <Footer />
    </>
  );
};

export default Profile;
