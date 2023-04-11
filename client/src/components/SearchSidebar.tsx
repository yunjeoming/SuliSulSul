import React from 'react';

type Props = {
  onClose: () => void;
};

const SearchSidebar = ({ onClose }: Props) => {
  return (
    <div className="absolute flex flex-col justify-between w-full h-60 bg-slate-300 p-4">
      <input className="rounded-lg py-2 px-4" placeholder="검색어를 입력해주세요." />
      <div className="flex justify-end">
        <button className="w-fit" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SearchSidebar;
