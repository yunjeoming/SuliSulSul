import React from 'react';
import CategorySidebar from './CategorySidebar';
import SearchSidebar from './SearchSidebar';
import { Styles } from '../constants/Styles';

type Props = {
  type: 'category' | 'search';
  onClose?: () => void;
};

const Sidebar = ({ type, onClose }: Props) => {
  const height = type === 'category' ? Styles.MAIN_AREA_HEIGHT : 'h-60';
  return (
    <div className={`absolute flex flex-col justify-between w-full bg-slate-300 p-4 ${height} z-10`}>
      {type === 'category' ? <CategorySidebar onClose={onClose} /> : <SearchSidebar onClose={onClose} />}
      <div className="flex justify-end">
        <button className="w-fit" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
