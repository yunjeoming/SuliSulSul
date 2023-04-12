import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from './IconButton';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { Styles } from '../constants/Styles';

const Header = () => {
  const navigate = useNavigate();
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
  const closeCategorySidebar = () => {
    setIsOpen((prev) => ({
      ...prev,
      category: false,
    }));
  };
  const closeSearchSidebar = () => {
    setIsOpen((prev) => ({
      ...prev,
      search: false,
    }));
  };
  const clickTitle = () => {
    navigate(`/`);
  }

  return (
    <>
      <header className={`sticky top-0 ${Styles.MAIN_BACKGROUND_COLOR} flex justify-between items-center h-16 text-2xl border-b`}>
        <IconButton onClick={clickCategoryBtn}>
          <FaBars />
        </IconButton>
        <h2 className="cursor-pointer" onClick={clickTitle}>술이술술</h2>
        <IconButton onClick={clickSearchBtn}>
          <GoSearch />
        </IconButton>
      </header>
      {isOpen.category && <Sidebar type="category" onClose={closeCategorySidebar} />}
      {isOpen.search && <Sidebar type="search" onClose={closeSearchSidebar} />}
    </>
  );
};

export default Header;
