import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Styles } from './constants/Styles';
import { getClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header/Header';
import useSidebar from './hooks/useSidebar';
import MainPage from './pages/MainPage';

const AlcoholListPage = lazy(() => import('./pages/AlcoholListPage'));
const AlcoholDetailPage = lazy(() => import('./pages/AlcoholDetailPage'));
const SearchListPage = lazy(() => import('./pages/SearchListPage'));
const ReviewListPage = lazy(() => import('./pages/ReviewListPage'));
const AdminMainPage = lazy(() => import('./pages/Admin/MainPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const SkeletonAlcoholDetail = lazy(() => import('./components/Skeleton/SkeletonAlcoholDetail'));
const SkeletonAlcoholList = lazy(() => import('./components/Skeleton/SkeletonAlcoholList'));
const SkeletonReviewList = lazy(() => import('./components/Skeleton/SkeletonReviewList'));

function App() {
  const { pathname } = useLocation();
  const queryClient = getClient();
  const { isOpenSidebar, clickTargetBtn, closeTargetSidebar, initSidebar } = useSidebar();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-gray-200 flex justify-center items-stretch">
        <div className={`flex flex-col relative ${Styles.MAIN_BACKGROUND_COLOR} w-[26rem] overflow-auto`}>
          {!pathname.startsWith('/admin') ? (
            <Header
              isOpenSidebar={isOpenSidebar}
              clickTargetBtn={clickTargetBtn}
              closeTargetSidebar={closeTargetSidebar}
            />
          ) : null}
          <Routes>
            <Route path="/" element={<MainPage initSidebar={initSidebar} isOpenSidebar={isOpenSidebar} />}>
              <Route
                path="c/:no"
                element={
                  <Suspense fallback={<SkeletonAlcoholList />}>
                    <AlcoholListPage />
                  </Suspense>
                }
              />
              <Route
                path="alcs/:no"
                element={
                  <Suspense fallback={<SkeletonAlcoholDetail />}>
                    <AlcoholDetailPage />
                  </Suspense>
                }
              />
              <Route
                path="search"
                element={
                  <Suspense fallback={<SkeletonAlcoholList />}>
                    <SearchListPage />
                  </Suspense>
                }
              />
              <Route
                path="reviews/:no"
                element={
                  <Suspense fallback={<SkeletonReviewList />}>
                    <ReviewListPage />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<></>}>
                  <AdminMainPage />
                </Suspense>
              }
            />
            <Route
              path="/*"
              element={
                <Suspense>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
