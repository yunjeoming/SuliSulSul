import { useParams } from 'react-router-dom';
import AddReview from './AddReview';
import StarsWithGrade from '../../components/Stars/StarsWithGrade';
import SimpleReviewList from '../../components/Review/SimpleReviewList';
import AlcoholDetailContent from '../../components/Alcohol/AlcoholDetailContent';
import SubHeader from '../../components/Header/SubHeader';
import useAlcoholAndReviews from '../../hooks/useAlcoholAndReviews';
import useAddPage from '../../hooks/useAddPage';

const AlcoholDetailPage = () => {
  const { no } = useParams<{ no: string }>();
  const { alcohol, reviews, invalidateQuery } = useAlcoholAndReviews(no);
  const { isOpenAddPage, openAddPage, closeAddPage } = useAddPage();

  return alcohol ? (
    <>
      {isOpenAddPage && <AddReview alcohol={alcohol} onClose={closeAddPage} invalidateFn={invalidateQuery} />}
      <SubHeader headerName={alcohol.alcNm}>
        <StarsWithGrade grade={alcohol.avgGrade || 0} showLabel={false} />
        <span className="text-stone-400 text-xs pr-2">(리뷰 {reviews?.length || 0})</span>
      </SubHeader>
      <div>
        <AlcoholDetailContent alcohol={alcohol} />
        <SimpleReviewList alcohol={alcohol} reviews={reviews} addReview={openAddPage} />
      </div>
    </>
  ) : null;
};

export default AlcoholDetailPage;
