import { FC } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from '../IconButton';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import HeaderLayout from '../../layout/HeaderLayout';
import { SidebarType } from '../../types/common';

type Props = {
  isOpenSidebar: { category: boolean; search: boolean };
  clickTargetBtn: (target: keyof SidebarType) => void;
  closeTargetSidebar: (target: keyof SidebarType) => void;
};

const Header: FC<Props> = ({ isOpenSidebar, clickTargetBtn, closeTargetSidebar }) => {
  const navigate = useNavigate();
  const clickTitle = () => {
    navigate(`/`);
  };

  return (
    <>
      <HeaderLayout>
        <IconButton onClick={() => clickTargetBtn('category')} label="category">
          <FaBars />
        </IconButton>
        <h2 className="cursor-pointer" onClick={clickTitle}>
          술이술술
        </h2>
        <IconButton onClick={() => clickTargetBtn('search')} label="search">
          <GoSearch />
        </IconButton>
      </HeaderLayout>
      {isOpenSidebar.category && <Sidebar type="category" onClose={() => closeTargetSidebar('category')} />}
      {isOpenSidebar.search && <Sidebar type="search" onClose={() => closeTargetSidebar('search')} />}
    </>
  );
};

export default Header;
