import { FC } from 'react';
import CategorySidebar from './CategorySidebar';
import SearchSidebar from './SearchSidebar';
import { Styles } from '../../constants/Styles';

type Props = {
  type: 'category' | 'search';
  onClose?: () => void;
};

const Sidebar: FC<Props> = ({ type, onClose }) => {
  return (
    <div
      className={`absolute top-16 left-0 flex flex-col justify-between w-full ${Styles.MAIN_BACKGROUND_COLOR} p-4 h-[calc(100vh-4rem)] z-10`}
    >
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
