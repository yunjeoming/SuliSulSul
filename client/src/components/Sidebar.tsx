import React from 'react';
import CategorySidebar from './CategorySidebar';
import SearchSidebar from './SearchSidebar';
import { Styles } from '../constants/Styles';

type Props = {
  type: 'category' | 'search';
  onClose?: () => void;
};

const Sidebar = ({ type, onClose }: Props) => {
  // 검색 sidebar 짧게 할 땐 h-60
  // const height = type === 'category' ? Styles.MAIN_AREA_HEIGHT : 'h-60';
  return (
    <div className={`absolute flex flex-col justify-between w-full ${Styles.MAIN_BACKGROUND_COLOR} p-4 ${Styles.MAIN_AREA_HEIGHT} z-10`}>
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
