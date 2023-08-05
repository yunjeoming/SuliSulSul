import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddAlcohol from './AddAlcohol';
import AdminHeader from '../../../components/Header/AdminHeader';
import useAddPage from '../../../hooks/useAddPage';
import MainLayout from '../../../layout/MainLayout';
import AdminLoginPage from '../AdminLoginPage';
import useAuth from '../../../hooks/useAuth';

const AdminAlcoholListPage = lazy(() => import('../AlcoholListPage'));
const AdminAlcoholDetailPage = lazy(() => import('../AlcoholDetailPage'));
const AdminSearchListPage = lazy(() => import('../SearchListPage'));

const AdminMainPage = () => {
  const { isOpenAddPage, openAddPage, closeAddPage, targetRef } = useAddPage();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <>
      <AdminHeader handleClickNewAlcohol={openAddPage} />
      <MainLayout>
        {isOpenAddPage && <AddAlcohol ref={targetRef} onClose={closeAddPage} />}
        <Suspense>
          <Routes>
            <Route path="" element={<AdminAlcoholListPage />} />
            <Route path="alcs/:no" element={<AdminAlcoholDetailPage />} />
            <Route path="search" element={<AdminSearchListPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </>
  ) : (
    <AdminLoginPage />
  );
};

export default AdminMainPage;
