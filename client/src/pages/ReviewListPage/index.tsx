import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlcoholListItem from '../../components/Alcohol/AlcoholListItem';
import StarsWithGrade from '../../components/Stars/StarsWithGrade';
import ReviewList from '../../components/Review/ReviewList';
import AddReview from '../AlcoholDetailPage/AddReview';
import useAlcoholAndReviews from '../../hooks/useAlcoholAndReviews';

const ReviewListPage = () => {
  const { no } = useParams();
  const [isOpenNewReview, setIsOpenNewReview] = useState(false);
  const { alcohol, reviews } = useAlcoholAndReviews(no);

  const handleAddReview = useCallback(() => {
    setIsOpenNewReview(true);
  }, [setIsOpenNewReview]);

  const onClose = useCallback(() => {
    setIsOpenNewReview(false);
  }, []);

  return alcohol ? (
    <div>
      <div className="px-2 border-b">
        <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
      </div>
      <div className="flex items-center justify-evenly  border-b py-4">
        <StarsWithGrade grade={alcohol.avgGrade || 0} styles="text-2xl flex-col-reverse" />
        <div className="text-sm">
          <StarsWithGrade grade={5} text={`(${0})`} />
          <StarsWithGrade grade={4} text={`(${0})`} />
          <StarsWithGrade grade={3} text={`(${0})`} />
          <StarsWithGrade grade={2} text={`(${0})`} />
          <StarsWithGrade grade={1} text={`(${0})`} />
        </div>
      </div>
      <div className="border-b py-4 text-center">
        <span className="cursor-pointer hover:text-stone-600" onClick={handleAddReview}>
          리뷰 등록하기
        </span>
      </div>
      <ReviewList reviews={reviews} />
      {isOpenNewReview && <AddReview alcohol={alcohol} onClose={onClose} />}
    </div>
  ) : null;
};

export default ReviewListPage;
