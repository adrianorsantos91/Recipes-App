import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = (props) => {
  const [isSearching, setIsSearching] = useState(false);
  return (
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
      <button type="button" onClick={ () => setIsSearching(!isSearching) }>
        <img
          src="searchIcon.svg"
          alt="search"
          width="10"
          height="10"
          data-testid="search-top-btn"
        />
      </button>
      {
        isSearching && <SearchBar { ...props } />
      }
    </div>
  );
};

export default Header;
