import { useParams } from 'react-router-dom';
import SubHeader from '../../../components/Header/SubHeader';
import AlcoholEditForm from '../../../components/Alcohol/AlcoholEditForm';
import useAlcoholAndReviews from '../../../hooks/useAlcoholAndReviews';

const AdminAlcoholDetailPage = () => {
  const { no } = useParams();
  const { alcohol, invalidateQuery } = useAlcoholAndReviews(no);

  return alcohol ? (
    <>
      <SubHeader headerName={alcohol.alcNm} />
      <div>
        <AlcoholEditForm alcohol={alcohol} invalidateFn={invalidateQuery} />
      </div>
    </>
  ) : null;
};

export default AdminAlcoholDetailPage;
