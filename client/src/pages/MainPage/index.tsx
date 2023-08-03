import React, { useCallback, useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import MainLayout from '../../layout/MainLayout';

const MainPage = () => {
  const { pathname } = useLocation();
  const [isOpenSidebar, setIsOpenSidebar] = useState({
    category: false,
    search: false,
  });

  const { category, search } = isOpenSidebar;

  const initSidebar = useCallback(() => {
    setIsOpenSidebar({
      category: false,
      search: false,
    });
  }, []);

  return (
    <>
      <Header isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      <MainLayout styles={`${category || search ? 'overflow-hidden' : ''}`}>
        {pathname === '/' ? <HomePage initSidebar={initSidebar} /> : <Outlet />}
      </MainLayout>
    </>
  );
};

export default MainPage;
