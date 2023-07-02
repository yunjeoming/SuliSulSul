import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryClient';
import API from '../api';

const useAlcoholAndReviews = (no: string | undefined) => {
  const { data: { alcohol, reviews } = { alcohol: null, reviews: [] } } = useQuery({
    queryKey: [queryKeys.ALCOHOL, no],
    queryFn: () => API.getAlcoholByNo(no ?? ''),
    select: (data) => ({
      alcohol: data.alcData,
      reviews: data.reviewData,
    }),
  });

  return { alcohol, reviews };
};

export default useAlcoholAndReviews;
