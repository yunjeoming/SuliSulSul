import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryClient';
import AlcoholAPI from '../api/alcohol';

const useAlcoholAndReviews = (no: string | undefined) => {
  const { data: { alcohol, reviews } = { alcohol: null, reviews: [] } } = useQuery({
    queryKey: [queryKeys.ALCOHOL, no],
    queryFn: () => AlcoholAPI.getAlcoholByNo(no ?? ''),
    select: (data) => ({
      alcohol: data.alcData,
      reviews: data.reviewData,
    }),
  });

  return { alcohol, reviews };
};

export default useAlcoholAndReviews;
