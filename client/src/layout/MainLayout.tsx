import { FC, ReactNode } from 'react';
import { Styles } from '../constants/Styles';

type Props = {
  styles?: string;
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ styles = '', children }) => {
  return (
    <div className={`flex flex-col ${Styles.MAIN_AREA_HEIGHT} ${styles ?? ''} overflow-auto [&>*:last-child]:p-4`}>
      {children}
    </div>
  );
};

export default MainLayout;
