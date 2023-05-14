import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MockAlcoholsType, MockReviewType } from '../../types/mockAlcohols';
import AddReview from './AddReview';
import StarsWithGrade from '../../components/StarsWithGrade';
import Reviews from '../../components/Reviews';
import AlcoholDetailContent from '../../components/AlcoholDetailContent';
import MainLayout from '../../layout/MainLayout';
import SubHeader from '../../components/SubHeader';

const AlcoholDetailPage = () => {
  const { id } = useParams();
  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);
  const [reviews, setReviews] = useState<MockReviewType[]>([]);
  const [isOpenNewReview, setIsOpenNewReview] = useState(false);

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
    // 추후 id 얻게되면 요청 url에 id 넣어서 해당 data 가져오기
    axios
      .get(`/reviews.json`)
      .then((res) => {
        const targetReviews = res.data.reviews as MockReviewType[];
        const sortedReviews = targetReviews.sort((a, b) => +b.createdDate - +a.createdDate);
        setReviews(sortedReviews);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [id]);

  const onClose = useCallback(() => {
    setIsOpenNewReview(false);
  }, []);

  useEffect(() => {
    getAlcohol();
    getReviews();
    // eslint-disable-next-line
  }, [id]);

  return alcohol ? (
    <>
      <MainLayout>
        <SubHeader headerName={alcohol.name}>
          <StarsWithGrade grade={alcohol.grade || 0} showLabel={false} />
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
