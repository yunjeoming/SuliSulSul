import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlcoholListItem from '../../components/AlcoholListItem';
import StarsWithGrade from '../../components/StarsWithGrade';
import ReviewList from './ReviewList';
import { Alcohol, Review } from '../../types/alcohol';

const ReviewListPage = () => {
  const { no } = useParams();
  const [alcohol, setAlcohol] = useState<Alcohol | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

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

  useEffect(() => {
    getAlcohol();
    // eslint-disable-next-line
  }, [no]);

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
      <ReviewList reviews={reviews} />
    </div>
  ) : null;
};

export default ReviewListPage;
