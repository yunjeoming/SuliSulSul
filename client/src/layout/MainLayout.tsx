import { FC, ReactNode } from 'react';

type Props = {
  styles?: string;
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ styles = '', children }) => {
  return (
    <div className={`flex flex-col flex-grow ${styles ?? ''} [&>*:last-child]:p-4`}>
      {children}
    </div>
  );
};

export default MainLayout;
