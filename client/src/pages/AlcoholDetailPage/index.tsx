import { useParams } from 'react-router-dom';
import AddReview from './AddReview';
import StarsWithGrade from '../../components/Stars/StarsWithGrade';
import SimpleReviewList from '../../components/Review/SimpleReviewList';
import AlcoholDetailContent from '../../components/Alcohol/AlcoholDetailContent';
import SubHeaderLayout from '../../layout/SubHeaderLayout';
import useAlcoholAndReviews from '../../hooks/useAlcoholAndReviews';
import useAddPage from '../../hooks/useAddPage';
import ReviewUtil from '../../utils/Review';

const AlcoholDetailPage = () => {
  const { no } = useParams<{ no: string }>();
  const { alcohol, reviews, invalidateQuery } = useAlcoholAndReviews(no);
  const { isOpenAddPage, openAddPage, closeAddPage, addRef } = useAddPage();
  const { totalReviews } = ReviewUtil.getGradesFromAlcohol(alcohol);

  if (!alcohol) {
    return null;
  }

  return (
    <>
      {isOpenAddPage && (
        <AddReview ref={addRef} alcohol={alcohol} onClose={closeAddPage} invalidateFn={invalidateQuery} />
      )}
      <SubHeaderLayout headerName={alcohol.alcNm}>
        <StarsWithGrade grade={alcohol.avgGrade || 0} showLabel={false} />
        <span className="text-stone-400 text-xs pr-2">(리뷰 {totalReviews || 0})</span>
      </SubHeaderLayout>
      <div>
        <AlcoholDetailContent alcohol={alcohol} />
        <SimpleReviewList alcohol={alcohol} reviews={reviews} addReview={openAddPage} />
      </div>
    </>
  );
};

export default AlcoholDetailPage;
