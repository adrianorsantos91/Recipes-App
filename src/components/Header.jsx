import React from 'react';
import { BsFillPersonFill, BsSearch } from 'react-icons/bs';

const Header = () => (
  <div>
    <BsFillPersonFill data-testid="profile-top-btn" />
    <h1 data-testid="page-title">Foods</h1>
    <BsSearch data-testid="search-top-btn" />
  </div>
);

export default Header;
