import { FC, ReactNode } from 'react';
import { StyleConstants } from '../constants/style';

type Props = {
  children: ReactNode;
  isAdmin?: boolean;
};

const HeaderLayout: FC<Props> = ({ children, isAdmin = false }) => {
  const fontSize = isAdmin ? 'text-md' : 'text-2xl';
  return (
    <header
      className={`sticky top-0 left-0 ${StyleConstants.MAIN_BACKGROUND_COLOR} flex-shrink-0 flex justify-between items-center ${fontSize} ${StyleConstants.HEADER_HEIGHT} border-b ${StyleConstants.HEADER_MARGIN_BOTTOM} z-10 px-3`}
    >
      {children}
    </header>
  );
};

export default HeaderLayout;
