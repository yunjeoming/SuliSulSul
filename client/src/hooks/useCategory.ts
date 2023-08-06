import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryClient';
import CategoryAPI from '../api/category';
import { Category } from '../types/alcohol';
import { useCallback } from 'react';

const useCategory = () => {
  const { data: category } = useQuery<Category[]>({
    queryKey: [queryKeys.CATEGORY],
    queryFn: CategoryAPI.getCategories,
    select: (data) => [{ cateNo: 999, cateNm: '전체' }, ...data],
  });

  const getCategoryByName = useCallback(
    (cateNm: string | undefined) => {
      return category?.find((c) => c.cateNm === cateNm);
    },
    [category],
  );

  return { category, getCategoryByName };
};

export default useCategory;
