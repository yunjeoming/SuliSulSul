import React from 'react';
import { Styles } from '../constants/Styles';

const MainStyle = ({ children }: { children: JSX.Element[] }) => {
  return <div className={`flex flex-col ${Styles.MAIN_AREA_HEIGHT}`}>{children}</div>;
};

export default MainStyle;
