import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../queryClient';
import MainLayout from '../../../layout/MainLayout';
import SubHeader from '../../../components/SubHeader';
import API from '../../../api';
import AlcoholEditForm from '../../../components/Alcohol/AlcoholEditForm';

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
        <AlcoholEditForm alcohol={alcohol} />
      </div>
    </MainLayout>
  ) : null;
};

export default AdminAlcoholDetailPage;
