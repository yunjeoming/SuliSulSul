import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryClient';
import CategoryAPI from '../api/category';
import { Category } from '../types/alcohol';

const useCategory = () => {
  const { data: category } = useQuery<Category[]>({
    queryKey: [queryKeys.CATEGORY],
    queryFn: CategoryAPI.getCategories,
    select: (data) => [{ cateNo: 999, cateNm: 'all' }, ...data],
  });

  return category;
};

export default useCategory;
