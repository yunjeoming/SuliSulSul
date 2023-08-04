import { FC, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { SidebarType } from '../../types/common';
import HomePage from './HomePage';
import SkeletonMain from '../../components/Skeleton/SkeletonMain';

type Props = {
  isOpenSidebar: SidebarType;
  initSidebar: () => void;
};

const MainPage: FC<Props> = ({ initSidebar, isOpenSidebar }) => {
  const { pathname } = useLocation();

  return (
    <MainLayout styles={`${isOpenSidebar.category || isOpenSidebar.search ? 'overflow-hidden' : ''}`}>
      {pathname === '/' ? (
        <Suspense fallback={<SkeletonMain />}>
          <HomePage initSidebar={initSidebar} />
        </Suspense>
      ) : (
        <Suspense>
          <Outlet />
        </Suspense>
      )}
    </MainLayout>
  );
};

export default MainPage;
