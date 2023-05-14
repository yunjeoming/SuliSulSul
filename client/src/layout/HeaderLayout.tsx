import React, { FC } from 'react';
import { Styles } from '../constants/Styles';

type Props = {
  children: React.ReactNode;
  isAdmin?: boolean;
};

const HeaderLayout: FC<Props> = ({ children, isAdmin = false }) => {
  const fontSize = isAdmin ? 'text-md' : 'text-2xl';
  return (
    <header
      className={`sticky top-0 ${Styles.MAIN_BACKGROUND_COLOR} flex justify-between items-center ${fontSize} ${Styles.HEADER_HEIGHT} border-b ${Styles.HEADER_MARGIN_BOTTOM} z-10 px-3`}
    >
      {children}
    </header>
  );
};

export default HeaderLayout;
