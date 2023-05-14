import React, { FC } from 'react';
import { Styles } from '../constants/Styles';

type Props = {
  children: React.ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return <div className={`flex flex-col ${Styles.MAIN_AREA_HEIGHT} [&>*:last-child]:p-4`}>{children}</div>;
};

export default MainLayout;
