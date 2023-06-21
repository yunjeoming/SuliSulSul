import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../queryClient';
import AlcoholEdit from '../../../components/AlcoholEdit';
import MainLayout from '../../../layout/MainLayout';
import SubHeader from '../../../components/SubHeader';
import API from '../../../api';

const AdminAlcoholDetailPage = () => {
  const { no } = useParams();

  const { data: { alcohol } = { alcohol: null } } = useQuery({
    queryKey: [queryKeys.ALCOHOL, no],
    queryFn: () => API.getAlcoholByNo(no || ''),
    select: (data) => ({
      alcohol: data.alcData,
    }),
  });

  return alcohol ? (
    <MainLayout>
      <SubHeader headerName={alcohol.alcNm} />
      <div>
        <AlcoholEdit alcohol={alcohol} />
      </div>
    </MainLayout>
  ) : null;
};

export default AdminAlcoholDetailPage;
