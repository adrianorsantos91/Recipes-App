import React from 'react';
import { Footer, Header } from '../components';

const Profile = () => (
  <>
    <Header title="Profile" />
    <h2 data-testid="profile-email">email@email.com</h2>
    <button type="button" data-testid="profile-done-btn">
      Done Recipes
    </button>
    <button type="button" data-testid="profile-favorite-btn">
      Favorite Recipes
    </button>
    <button type="button" data-testid="profile-logout-btn">
      Logout
    </button>
    <Footer />
  </>
);

export default Profile;
