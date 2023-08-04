import { useLocation } from 'react-router-dom';
import AlcoholList from '../../components/Alcohol/AlcoholList';
import { Alcohol } from '../../types/alcohol';
import { useInfiniteQuery } from '@tanstack/react-query';
import AlcoholAPI from '../../api/alcohol';
import { queryKeys } from '../../queryClient';
import SearchTitle from '../../components/SearchTitle';

const SearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isSuccess,
    fetchNextPage,
  } = useInfiniteQuery<Alcohol[]>({
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
        infiniteScrollOptions={{ isLoading, isFetchingNextPage, hasNextPage, isSuccess, fetchNextPage }}
      />
    </>
  );
};

export default SearchListPage;
