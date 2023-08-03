import { Route, Routes } from 'react-router-dom';
import AdminAlcoholListPage from '../AlcoholListPage';
import AdminAlcoholDetailPage from '../AlcoholDetailPage';
import AddAlcohol from './AddAlcohol';
import AdminHeader from '../../../components/Header/AdminHeader';
import AdminSearchListPage from '../SearchListPage';
import useAddPage from '../../../hooks/useAddPage';
import MainLayout from '../../../layout/MainLayout';

const AdminMainPage = () => {
  const { isOpenAddPage, openAddPage, closeAddPage } = useAddPage();

  return (
    <>
      <AdminHeader handleClickNewAlcohol={openAddPage} />
      <MainLayout>
        <Routes>
          <Route path="" element={<AdminAlcoholListPage />} />
          <Route path="login" element={<AdminAlcoholListPage />} />
          <Route path="alcs/:no" element={<AdminAlcoholDetailPage />} />
          <Route path="search" element={<AdminSearchListPage />} />
        </Routes>
      </MainLayout>
      {isOpenAddPage && <AddAlcohol onClose={closeAddPage} />}
    </>
  );
};

export default AdminMainPage;
