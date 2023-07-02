import { useParams } from 'react-router-dom';
import MainLayout from '../../../layout/MainLayout';
import SubHeader from '../../../components/Header/SubHeader';
import AlcoholEditForm from '../../../components/Alcohol/AlcoholEditForm';
import useAlcoholAndReviews from '../../../hooks/useAlcoholAndReviews';

const AdminAlcoholDetailPage = () => {
  const { no } = useParams();
  const { alcohol } = useAlcoholAndReviews(no);

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
