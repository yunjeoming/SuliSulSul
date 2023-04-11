import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from './IconButton';
import CategorySidebar from './CategorySidebar';

const Header = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const clickCategoryBtn = () => {
    setIsOpenCategory((prev) => !prev);
  };

  return (
    <>
      <header className="flex justify-between items-center h-16 text-2xl">
        <IconButton onClick={clickCategoryBtn}>
          <FaBars />
        </IconButton>
        <h2>술이술술</h2>
        <IconButton>
          <GoSearch />
        </IconButton>
      </header>
      {isOpenCategory && <CategorySidebar />}
    </>
  );
};

export default Header;
