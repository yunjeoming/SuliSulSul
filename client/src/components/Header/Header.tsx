import { FC } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import IconButton from '../IconButton';
import { useNavigate } from 'react-router-dom';
import HeaderLayout from '../../layout/HeaderLayout';
import { SidebarType } from '../../types/common';

type Props = {
  clickTargetBtn: (target: keyof SidebarType) => void;
};

const Header: FC<Props> = ({ clickTargetBtn }) => {
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
    </>
  );
};

export default Header;
