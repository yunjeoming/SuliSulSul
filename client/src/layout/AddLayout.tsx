import { ReactNode, forwardRef } from 'react';
import { StyleConstants } from '../constants/style';
import IconButton from '../components/IconButton';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  headerText: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
};

const AddLayout = forwardRef<HTMLDivElement, Props>(({ headerText, children, onClose, onSave }, ref) => {
  return (
    <div
      className={`flex flex-col absolute top-0 left-0 w-full h-screen ${StyleConstants.MAIN_BACKGROUND_COLOR} z-20 [&>div]:mb-2`}
      ref={ref}
    >
      <header className={`${StyleConstants.HEADER_HEIGHT} flex justify-between items-center text-lg px-4 border-b`}>
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
});

export default AddLayout;
