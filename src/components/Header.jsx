import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import imageProfile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title, hasSearch }) => {
  const [isSearching, setIsSearching] = useState(false);

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
          title
        }
      </h1>
      {
        hasSearch && (
          <button type="button" onClick={ () => setIsSearching(!isSearching) }>
            <img
              src={ searchIcon }
              alt="search"
              width="50"
              height="50"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {
        isSearching && <SearchBar />
      }
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearch: PropTypes.bool,
};

Header.defaultProps = { hasSearch: undefined };

export default Header;
