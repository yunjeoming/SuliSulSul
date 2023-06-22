import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryClient';
import API from '../api';
import { Category } from '../types/alcohol';

const useCategory = () => {
  const { data: category } = useQuery<Category[]>({
    queryKey: [queryKeys.CATEGORY],
    queryFn: API.getCategories,
    select: (data) => [{ cateNo: 999, cateNm: 'all' }, ...data],
  });

  return category;
};

export default useCategory;
