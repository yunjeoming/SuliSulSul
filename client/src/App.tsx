import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminMainPage from './pages/Admin/MainPage';
import AdminAlcoholDetailPage from './pages/Admin/AlcoholDetailPage';
import AdminAlcoholListPage from './pages/Admin/AlcoholListPage';
import AlcoholDetailPage from './pages/AlcoholDetailPage';
import AlcoholListPage from './pages/AlcoholListPage';
import NotFoundPage from './pages/NotFoundPage';
import { Styles } from './constants/Styles';
import SearchListPage from './pages/SearchListPage';
import ReviewListPage from './pages/ReviewListPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-stretch">
      <div className={`relative ${Styles.MAIN_BACKGROUND_COLOR} w-96 overflow-auto`}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/c/:category" element={<AlcoholListPage />} />
            <Route path="/alcs/:id" element={<AlcoholDetailPage />} />
            <Route path="/search" element={<SearchListPage />} />
            <Route path="/reviews/:id" element={<ReviewListPage />} />
          </Route>
          <Route path="/admin" element={<AdminMainPage />}>
            <Route path="/admin/alcs" element={<AdminAlcoholListPage />} />
            <Route path="/admin/alcs/:id" element={<AdminAlcoholDetailPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
