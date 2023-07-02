import AlcoholList from '../../../components/Alcohol/AlcoholList';
import { Alcohol } from '../../../types/alcohol';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../queryClient';
import API from '../../../api';

const AdminAlcoholListPage = () => {
  const { data: alcohols = [] } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL],
    queryFn: API.getAlcohols,
  });

  return <AlcoholList alcohols={alcohols} styles="py-2" isAdmin />;
};

export default AdminAlcoholListPage;
