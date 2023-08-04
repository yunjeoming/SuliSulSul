import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryClient';
import AlcoholAPI from '../api/alcohol';
import { useCallback, useMemo } from 'react';

const useAlcoholAndReviews = (
  no: string | undefined,
  options?: {
    otherKeys?: QueryKey;
  },
) => {
  const queryKey = useMemo(() => {
    let defaultKey = [queryKeys.ALCOHOL] as QueryKey;
    if (no) {
      defaultKey = [...defaultKey, no];
    }
    if (options?.otherKeys) {
      defaultKey = [...defaultKey, ...options?.otherKeys];
    }
    return defaultKey;
  }, [no, options?.otherKeys]);
  const queryClient = useQueryClient();

  const { data: { alcohol, reviews } = { alcohol: null, reviews: [] } } = useQuery({
    queryKey,
    queryFn: () => AlcoholAPI.getAlcoholByNo(no ?? ''),
    select: (data) => ({
      alcohol: data.alcData,
      reviews: data.reviewData,
    }),
  });

  const invalidateQuery = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient]);

  return { alcohol, reviews, invalidateQuery };
};

export default useAlcoholAndReviews;
