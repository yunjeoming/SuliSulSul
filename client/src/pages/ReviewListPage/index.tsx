import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockAlcoholsType, MockReviewType } from '../../types/mockAlcohols';
import AlcoholListItem from '../../components/AlcoholListItem';
import StarsWithGrade from '../../components/StarsWithGrade';
import ReviewList from './ReviewList';

const ReviewListPage = () => {
  const { id } = useParams();

  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);
  const [reviews, setReviews] = useState<MockReviewType[]>([]);

  const getAlcohol = useCallback(() => {
    axios
      .get(`/alcohols.json`)
      .then((res) => {
        const targetAlcohol = res.data.alcohols.find((a: MockAlcoholsType) => a.no === Number(id)) as MockAlcoholsType;
        setAlcohol(targetAlcohol);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const getReviews = useCallback(() => {
    axios
      .get(`/reviews.json`)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((err) => console.error(err));

    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    getAlcohol();
    getReviews();
    // eslint-disable-next-line
  }, [id]);

  return alcohol ? (
    <div>
      <div className="px-2 border-b">
        <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
      </div>
      <div className="flex items-center justify-evenly  border-b py-4">
        <StarsWithGrade grade={alcohol.grade || 0} styles="text-2xl flex-col-reverse" />
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
