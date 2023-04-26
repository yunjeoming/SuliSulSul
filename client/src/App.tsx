import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminMainPage from './pages/Admin/MainPage';
import AdminAlcoholDetailPage from './pages/Admin/AlcoholDetailPage';
import AdminAlcoholListPage from './pages/Admin/AlcoholListPage';
import AlcoholDetailPage from './pages/AlcoholDetailPage';
import AlcoholListPage from './pages/AlcoholListPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import { Styles } from './constants/Styles';
import SearchListPage from './pages/SearchListPage';
import ReviewListPage from './pages/ReviewListPage';

function App() {
  const [isOpenSidebar, setIsOpenSidebar] = useState({
    category: false,
    search: false,
  });

  const { category, search } = isOpenSidebar;

  return (
    <BrowserRouter>
      <div className="h-screen bg-gray-200 flex justify-center items-stretch">
        <div className={`relative ${Styles.MAIN_BACKGROUND_COLOR} w-96 overflow-auto`}>
          <Header isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
          <div className={`${category || search ? 'overflow-hidden' : ''}`}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/c/:category" element={<AlcoholListPage />} />
              <Route path="/alcs/:id" element={<AlcoholDetailPage />} />
              <Route path="/search" element={<SearchListPage />} />
              <Route path="/reviews/:id" element={<ReviewListPage />} />
              <Route path="/admin" element={<AdminMainPage />} />
              <Route path="/admin/alcs" element={<AdminAlcoholListPage />} />
              <Route path="/admin/alcs/:id" element={<AdminAlcoholDetailPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
