import React, { FC, SyntheticEvent, useRef } from 'react';
import IconButton from './IconButton';
import { GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClose?: () => void;
};

const SearchSidebar: FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    navigate(`/search`, {
      state: {
        searchWord: inputRef.current?.value,
      },
    });
    onClose && onClose();
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input className="w-full rounded-lg py-2 pl-4 pr-10" placeholder="검색어를 입력해주세요." ref={inputRef} />
      <IconButton onClick={handleSubmit} styles="absolute top-0 right-0 p-3">
        <GoSearch />
      </IconButton>
    </form>
  );
};

export default SearchSidebar;
