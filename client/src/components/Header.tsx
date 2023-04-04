import React from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from './IconButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 text-2xl">
      <IconButton>
        <FaBars />
      </IconButton>
      <h2>술이술술</h2>
      <IconButton>
        <GoSearch />
      </IconButton>
    </header>
  );
};

export default Header;
