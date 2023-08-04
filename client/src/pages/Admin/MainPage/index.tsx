import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddAlcohol from './AddAlcohol';
import AdminHeader from '../../../components/Header/AdminHeader';
import useAddPage from '../../../hooks/useAddPage';
import MainLayout from '../../../layout/MainLayout';

const AdminAlcoholListPage = lazy(() => import('../AlcoholListPage'));
const AdminAlcoholDetailPage = lazy(() => import('../AlcoholDetailPage'));
const AdminSearchListPage = lazy(() => import('../SearchListPage'));

const AdminMainPage = () => {
  const { isOpenAddPage, openAddPage, closeAddPage, targetRef } = useAddPage();

  return (
    <>
      <AdminHeader handleClickNewAlcohol={openAddPage} />
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="" element={<AdminAlcoholListPage />} />
            <Route path="login" element={<AdminAlcoholListPage />} />
            <Route path="alcs/:no" element={<AdminAlcoholDetailPage />} />
            <Route path="search" element={<AdminSearchListPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
      {isOpenAddPage && <AddAlcohol ref={targetRef} onClose={closeAddPage} />}
    </>
  );
};

export default AdminMainPage;
