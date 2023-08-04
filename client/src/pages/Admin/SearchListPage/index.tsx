import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import AlcoholAPI from '../../../api/alcohol';
import AlcoholList from '../../../components/Alcohol/AlcoholList';
import { queryKeys } from '../../../queryClient';
import SearchTitle from '../../../components/SearchTitle';

const AdminSearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;

  const { data, isLoading, isFetchingNextPage, hasNextPage, isSuccess, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKeys.ALCOHOL, searchWord],
    queryFn: ({ pageParam = 0 }) => AlcoholAPI.getAlcoholsBySearchWord(searchWord, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length < 10 ? undefined : allPages.length;
    },
  });

  return (
    <>
      <SearchTitle searchWord={searchWord} />
      <AlcoholList
        alcohols={data?.pages}
        showingType="listType"
        isAdmin
        infiniteScrollOptions={{ isLoading, isFetchingNextPage, hasNextPage, isSuccess, fetchNextPage }}
      />
    </>
  );
};

export default AdminSearchListPage;
