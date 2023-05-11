import React, { FC } from 'react';
import { Styles } from '../constants/Styles';
import IconButton from '../components/IconButton';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  headerText: string;
  children: JSX.Element[];
  onClose: () => void;
  onSave: () => void;
};

const AddLayout: FC<Props> = ({ headerText, children, onClose, onSave }) => {
  return (
    <div
      className={`flex flex-col absolute top-0 left-0 w-full h-screen ${Styles.MAIN_BACKGROUND_COLOR} z-20 [&>div]:mb-2`}
    >
      <header className={`${Styles.HEADER_HEIGHT} flex justify-between items-center text-lg px-4 border-b`}>
        <IconButton styles="p-0" onClick={onClose}>
          <AiOutlineClose size={'20px'} />
        </IconButton>
        <span>{headerText}</span>
        <button className="text-sm hover:text-blue-700" onClick={onSave}>
          저장
        </button>
      </header>
      {children}
    </div>
  );
};

export default AddLayout;
