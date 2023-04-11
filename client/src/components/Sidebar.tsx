import React from 'react';
import CategorySidebar from './CategorySidebar';
import SearchSidebar from './SearchSidebar';

type Props = {
  type: 'category' | 'search';
  onClose?: () => void;
};
const Sidebar = ({ type, onClose }: Props) => {
  const height = type === 'category' ? 'h-[calc(100vh-4rem)]' : 'h-60';
  return (
    <div className={`absolute flex flex-col justify-between w-full bg-slate-300 p-4 ${height}`}>
      {type === 'category' ? <CategorySidebar /> : <SearchSidebar />}
      <div className="flex justify-end">
        <button className="w-fit" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
