import React, { FC } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from '../IconButton';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import HeaderLayout from '../../layout/HeaderLayout';

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
      <HeaderLayout>
        <IconButton onClick={clickCategoryBtn}>
          <FaBars />
        </IconButton>
        <h2 className="cursor-pointer" onClick={clickTitle}>
          술이술술
        </h2>
        <IconButton onClick={clickSearchBtn}>
          <GoSearch />
        </IconButton>
      </HeaderLayout>
      {isOpenSidebar.category && <Sidebar type="category" onClose={closeCategorySidebar} />}
      {isOpenSidebar.search && <Sidebar type="search" onClose={closeSearchSidebar} />}
    </>
  );
};

export default Header;
