import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from './IconButton';
import CategorySidebar from './CategorySidebar';
import SearchSidebar from './SearchSidebar';

const Header = () => {
  const [isOpen, setIsOpen] = useState({
    category: false,
    search: false,
  });
  const clickCategoryBtn = () => {
    setIsOpen((prev) => ({
      category: !prev.category,
      search: false,
    }));
  };
  const clickSearchBtn = () => {
    setIsOpen((prev) => ({
      category: false,
      search: !prev.search,
    }));
  };
  const closeSearchSidebar = () => {
    setIsOpen((prev) => ({
      ...prev,
      search: false,
    }));
  };

  return (
    <>
      <header className="flex justify-between items-center h-16 text-2xl">
        <IconButton onClick={clickCategoryBtn}>
          <FaBars />
        </IconButton>
        <h2>술이술술</h2>
        <IconButton onClick={clickSearchBtn}>
          <GoSearch />
        </IconButton>
      </header>
      {isOpen.category && <CategorySidebar />}
      {isOpen.search && <SearchSidebar onClose={closeSearchSidebar} />}
    </>
  );
};

export default Header;
