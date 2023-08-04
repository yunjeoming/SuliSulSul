import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Styles } from './constants/Styles';
import { getClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

const MainPage = lazy(() => import('./pages/MainPage'));
const AlcoholListPage = lazy(() => import('./pages/AlcoholListPage'));
const AlcoholDetailPage = lazy(() => import('./pages/AlcoholDetailPage'));
const SearchListPage = lazy(() => import('./pages/SearchListPage'));
const ReviewListPage = lazy(() => import('./pages/ReviewListPage'));
const AdminMainPage = lazy(() => import('./pages/Admin/MainPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-gray-200 flex justify-center items-stretch">
        <div className={`flex flex-col relative ${Styles.MAIN_BACKGROUND_COLOR} w-[26rem] overflow-auto`}>
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
