import AlcoholList from '../../../components/Alcohol/AlcoholList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../queryClient';
import AlcoholAPI from '../../../api/alcohol';

const AdminAlcoholListPage = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, isSuccess, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKeys.ALCOHOL, 'admin'],
    queryFn: ({ pageParam = 0 }) => AlcoholAPI.getAlcohols(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length < 10 ? undefined : allPages.length;
    },
  });

  return (
    <AlcoholList
      alcohols={data?.pages}
      styles="py-2"
      isAdmin
      infiniteScrollOptions={{ isLoading, hasNextPage, isFetchingNextPage, isSuccess, fetchNextPage }}
    />
  );
};

export default AdminAlcoholListPage;
