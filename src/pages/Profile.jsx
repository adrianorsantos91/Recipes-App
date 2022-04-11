import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';
import '../App.css';
import '../styles/Profile.css';

const Profile = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = (JSON.parse(localStorage.getItem('user'))) || { email: '' };
    setEmail(userEmail.email);
  }, []);

  return (
    <div className="background">
      <Header title="Profile" />
      <div className="container-profile">
        <h2 className="email" data-testid="profile-email">
          {email}
        </h2>
        <Link to="/done-recipes">
          <button type="button" data-testid="profile-done-btn" className="button">
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button type="button" data-testid="profile-favorite-btn" className="button">
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
            className="button"
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
