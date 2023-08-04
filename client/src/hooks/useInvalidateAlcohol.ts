import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { queryKeys } from '../queryClient';
import { Alcohol } from '../types/alcohol';
import AlcoholAPI from '../api/alcohol';

const useInvalidateAlcohol = (otherKeys?: QueryKey) => {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => {
    const defaultKey = [queryKeys.ALCOHOL];
    return otherKeys ? [...defaultKey, ...otherKeys] : defaultKey;
  }, [otherKeys]);

  useQuery<Alcohol[]>({
    queryKey,
    queryFn: () => AlcoholAPI.getAlcohols(),
  });

  const invalidateAlcohol = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  return { invalidateAlcohol };
};

export default useInvalidateAlcohol;
