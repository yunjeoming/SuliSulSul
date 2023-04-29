import React, { useCallback, useState } from 'react';
import Header from '../../components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Home from '../../components/Home';

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
      <div className={`${category || search ? 'overflow-hidden' : ''}`}>
        {pathname === '/' ? <Home initSidebar={initSidebar} /> : <Outlet />}
      </div>
    </>
  );
};

export default MainPage;
