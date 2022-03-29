import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import imageProfile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();

  return (
    <div>
      <Link to="/profile">
        <img
          src={ imageProfile }
          alt="perfil"
          width="50"
          height="50"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1
        data-testid="page-title"
      >
        {
          history.location.pathname === '/foods' ? 'Foods' : 'Drinks'
        }
      </h1>
      <button type="button" onClick={ () => setIsSearching(!isSearching) }>
        <img
          src={ searchIcon }
          alt="search"
          width="50"
          height="50"
          data-testid="search-top-btn"
        />
      </button>
      {
        isSearching && <SearchBar />
      }
    </div>
  );
};

export default Header;
