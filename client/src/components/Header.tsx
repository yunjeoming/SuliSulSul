import React, { FC } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from './IconButton';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { Styles } from '../constants/Styles';

type Props = {
  isOpenSidebar: { category: boolean; search: boolean };
  setIsOpenSidebar: React.Dispatch<
    React.SetStateAction<{
      category: boolean;
      search: boolean;
    }>
  >;
};

const Header: FC<Props> = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const navigate = useNavigate();

  const clickCategoryBtn = () => {
    setIsOpenSidebar((prev) => ({
      category: !prev.category,
      search: false,
    }));
  };
  const clickSearchBtn = () => {
    setIsOpenSidebar((prev) => ({
      category: false,
      search: !prev.search,
    }));
  };
  const closeCategorySidebar = () => {
    setIsOpenSidebar((prev) => ({
      ...prev,
      category: false,
    }));
  };
  const closeSearchSidebar = () => {
    setIsOpenSidebar((prev) => ({
      ...prev,
      search: false,
    }));
  };
  const clickTitle = () => {
    navigate(`/`);
  };

  return (
    <>
      <header
        className={`sticky top-0 ${Styles.MAIN_BACKGROUND_COLOR} flex justify-between items-center text-2xl ${Styles.HEADER_HEIGHT} border-b ${Styles.HEADER_MARGIN_BOTTOM} z-10 px-3`}
      >
        <IconButton onClick={clickCategoryBtn}>
          <FaBars />
        </IconButton>
        <h2 className="cursor-pointer" onClick={clickTitle}>
          술이술술
        </h2>
        <IconButton onClick={clickSearchBtn}>
          <GoSearch />
        </IconButton>
      </header>
      {isOpenSidebar.category && <Sidebar type="category" onClose={closeCategorySidebar} />}
      {isOpenSidebar.search && <Sidebar type="search" onClose={closeSearchSidebar} />}
    </>
  );
};

export default Header;
