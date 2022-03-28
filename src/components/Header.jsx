import React from 'react';
import { Link } from 'react-router-dom';

/* const linkToProfileButton = () => {
  const { history } = this.props;
  history.push('/profile');
}; */

const Header = () => (
  <div>
    <Link to="/profile">
      <img
        src="profileIcon.svg"
        alt="perfil"
        width="10"
        height="10"
        data-testid="profile-top-btn"
      />
    </Link>
    <h1 data-testid="page-title">Foods</h1>
    <img
      src="searchIcon.svg"
      alt="search"
      width="10"
      height="10"
      data-testid="search-top-btn"
    />
  </div>
);

export default Header;
