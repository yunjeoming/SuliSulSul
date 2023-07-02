import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminAlcoholListPage from '../AlcoholListPage';
import AdminAlcoholDetailPage from '../AlcoholDetailPage';
import AddAlcohol from './AddAlcohol';
import AdminHeader from '../../../components/Header/AdminHeader';
import AdminSearchListPage from '../SearchListPage';

const AdminMainPage = () => {
  const [isOpenNewAlcohol, setIsOpenNewAlcohol] = useState(false);

  const handleClickNewAlcohol = useCallback(() => {
    setIsOpenNewAlcohol(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpenNewAlcohol(false);
  }, []);

  return (
    <>
      <AdminHeader handleClickNewAlcohol={handleClickNewAlcohol} />
      <Routes>
        <Route path="" element={<AdminAlcoholListPage />} />
        <Route path="login" element={<AdminAlcoholListPage />} />
        <Route path="alcs/:no" element={<AdminAlcoholDetailPage />} />
        <Route path="search" element={<AdminSearchListPage />} />
      </Routes>
      {isOpenNewAlcohol && <AddAlcohol onClose={onClose} />}
    </>
  );
};

export default AdminMainPage;
