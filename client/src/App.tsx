import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminMainPage from './pages/Admin/MainPage';
import AlcoholDetailPage from './pages/AlcoholDetailPage';
import AlcoholListPage from './pages/AlcoholListPage';
import NotFoundPage from './pages/NotFoundPage';
import { Styles } from './constants/Styles';
import SearchListPage from './pages/SearchListPage';
import ReviewListPage from './pages/ReviewListPage';
import MainPage from './pages/MainPage';
import { getClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-gray-200 flex justify-center items-stretch">
        <div className={`relative ${Styles.MAIN_BACKGROUND_COLOR} w-96 overflow-auto`}>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="c/:no" element={<AlcoholListPage />} />
              <Route path="alcs/:no" element={<AlcoholDetailPage />} />
              <Route path="search" element={<SearchListPage />} />
              <Route path="reviews/:no" element={<ReviewListPage />} />
            </Route>
            <Route path="/admin/*" element={<AdminMainPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
