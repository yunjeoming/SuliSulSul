import { useParams } from 'react-router-dom';
import AlcoholListItem from '../../components/Alcohol/AlcoholListItem';
import StarsWithGrade from '../../components/Stars/StarsWithGrade';
import ReviewList from '../../components/Review/ReviewList';
import AddReview from '../AlcoholDetailPage/AddReview';
import useAlcoholAndReviews from '../../hooks/useAlcoholAndReviews';
import ReviewUtil from '../../utils/Review';
import useAddPage from '../../hooks/useAddPage';
import MainLayout from '../../layout/MainLayout';

const ReviewListPage = () => {
  const { no } = useParams();
  const { alcohol, reviews, invalidateQuery } = useAlcoholAndReviews(no);
  const { isOpenAddPage, openAddPage, closeAddPage, ref } = useAddPage();

  return alcohol ? (
    <>
      <MainLayout ref={ref}>
        <div className="px-2 border-b">
          <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
        </div>
        <div className="flex items-center justify-evenly  border-b py-4">
          <StarsWithGrade grade={alcohol.avgGrade || 0} styles="text-2xl flex-col-reverse" />
          <div className="text-sm">
            <StarsWithGrade grade={5} text={`(${ReviewUtil.getCountOfGradeByReviews(5, reviews)})`} />
            <StarsWithGrade grade={4} text={`(${ReviewUtil.getCountOfGradeByReviews(4, reviews)})`} />
            <StarsWithGrade grade={3} text={`(${ReviewUtil.getCountOfGradeByReviews(3, reviews)})`} />
            <StarsWithGrade grade={2} text={`(${ReviewUtil.getCountOfGradeByReviews(2, reviews)})`} />
            <StarsWithGrade grade={1} text={`(${ReviewUtil.getCountOfGradeByReviews(1, reviews)})`} />
          </div>
        </div>
        <div className="border-b py-4 text-center">
          <span className="cursor-pointer hover:text-stone-600" onClick={openAddPage}>
            리뷰 등록하기
          </span>
        </div>
        <ReviewList reviews={reviews} />
      </MainLayout>
      {isOpenAddPage && <AddReview alcohol={alcohol} onClose={closeAddPage} invalidateFn={invalidateQuery} />}
    </>
  ) : null;
};

export default ReviewListPage;
