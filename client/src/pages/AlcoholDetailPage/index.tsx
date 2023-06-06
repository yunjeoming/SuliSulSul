import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddReview from './AddReview';
import StarsWithGrade from '../../components/StarsWithGrade';
import Reviews from '../../components/Reviews';
import AlcoholDetailContent from '../../components/AlcoholDetailContent';
import MainLayout from '../../layout/MainLayout';
import SubHeader from '../../components/SubHeader';
import { Alcohol, Review } from '../../types/alcohol';
// import ReviewUtil from '../../utils/Review';

const AlcoholDetailPage = () => {
  const { no } = useParams();
  const [alcohol, setAlcohol] = useState<Alcohol | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpenNewReview, setIsOpenNewReview] = useState(false);

  const getAlcohol = useCallback(() => {
    if (!no) return;
    const form = new FormData();
    form.append('alcNo', no);
    axios
      .post(`/selectAlcDetail`, form)
      .then((res) => {
        if (res.data) {
          setAlcohol(res.data.alcData);

          // const sortedReviews = ReviewUtil.sortReviews(res.data.reviewData)
          setReviews(res.data.reviewData);
        }
      })
      .catch((err) => console.error(err));
  }, [no]);

  const getReviews = useCallback(() => {
    if (!no) return;
    const form = new FormData();
    form.append('alcNo', no);
    axios
      .post(`/selectReviewList`, form)
      .then((res) => {
        // const sortedReviews = ReviewUtil.sortReviews(res.data.reviewData)
        setReviews(res.data.reviewData);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [no]);

  const onClose = useCallback(() => {
    setIsOpenNewReview(false);
  }, []);

  useEffect(() => {
    getAlcohol();
    // eslint-disable-next-line
  }, [no]);

  return alcohol ? (
    <>
      <MainLayout>
        <SubHeader headerName={alcohol.alcNm}>
          <StarsWithGrade grade={alcohol.avgGrade || 0} showLabel={false} />
          <span className="text-stone-400 text-xs pr-2">(리뷰 {reviews?.length || 0})</span>
        </SubHeader>
        <div>
          <AlcoholDetailContent alcohol={alcohol} />
          <Reviews alcohol={alcohol} reviews={reviews} setIsOpenNewReview={setIsOpenNewReview} />
        </div>
      </MainLayout>
      {isOpenNewReview && <AddReview alcohol={alcohol} onClose={onClose} getReviews={getReviews} />}
    </>
  ) : null;
};

export default AlcoholDetailPage;
