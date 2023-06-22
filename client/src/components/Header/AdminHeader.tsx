import React, { FC, SyntheticEvent, useRef } from 'react';
import HeaderLayout from '../../layout/HeaderLayout';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import IconButton from '../IconButton';
import { GoSearch } from 'react-icons/go';

type Props = {
  handleClickNewAlcohol: () => void;
};

const AdminHeader: FC<Props> = ({ handleClickNewAlcohol }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();

    // 검색 후
    navigate(`/admin/search`, {
      state: {
        searchWord: inputRef.current?.value,
      },
    });

    // inputRef 초기화
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <HeaderLayout isAdmin>
      <Link to="/admin" className="flex justify-center items-center p-2">
        <AiOutlineHome size={28} />
      </Link>
      <form className="relative" onSubmit={handleSubmit}>
        <input className="w-full rounded-lg py-2 pl-4 pr-10" placeholder="검색어를 입력해주세요." ref={inputRef} />
        <IconButton onClick={handleSubmit} styles="absolute top-0 right-0 p-3">
          <GoSearch />
        </IconButton>
      </form>
      <div>
        <button className="p-2" onClick={handleClickNewAlcohol}>
          술 추가
        </button>
      </div>
    </HeaderLayout>
  );
};

export default AdminHeader;
