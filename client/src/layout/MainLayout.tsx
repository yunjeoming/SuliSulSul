import React, { forwardRef } from 'react';
import { Styles } from '../constants/Styles';

type Props = {
  children: React.ReactNode;
};

const MainLayout = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div ref={ref} className={`flex flex-col ${Styles.MAIN_AREA_HEIGHT} overflow-auto [&>*:last-child]:p-4`}>
      {children}
    </div>
  );
});

export default MainLayout;
