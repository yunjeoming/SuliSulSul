import { useParams } from 'react-router-dom';
import SubHeaderLayout from '../../../layout/SubHeaderLayout';
import AlcoholEditForm from '../../../components/Alcohol/AlcoholEditForm';
import useAlcoholAndReviews from '../../../hooks/useAlcoholAndReviews';

const AdminAlcoholDetailPage = () => {
  const { no } = useParams();
  const { alcohol, invalidateQuery } = useAlcoholAndReviews(no);

  return alcohol ? (
    <>
      <SubHeaderLayout headerName={alcohol.alcNm} />
      <div>
        <AlcoholEditForm alcohol={alcohol} invalidateFn={invalidateQuery} />
      </div>
    </>
  ) : null;
};

export default AdminAlcoholDetailPage;
