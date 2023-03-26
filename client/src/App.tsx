import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminMainPage from './pages/Admin/MainPage';
import AdminAlcoholDetailPage from './pages/Admin/AlcoholDetailPage';
import AdminAlcoholListPage from './pages/Admin/AlcoholListPage';
import AlcoholDetailPage from './pages/AlcoholDetailPage';
import AlcoholListPage from './pages/AlcoholListPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className='h-screen bg-white flex justify-center items-stretch'>
      <div className="bg-neutral-400 w-96">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/alcs" element={<AlcoholListPage />} />
            <Route path="/alcs/:id" element={<AlcoholDetailPage />} />
            <Route path="/admin" element={<AdminMainPage />} />
            <Route path="/admin/alcs" element={<AdminAlcoholListPage />} />
            <Route path="/admin/alcs/:id" element={<AdminAlcoholDetailPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
