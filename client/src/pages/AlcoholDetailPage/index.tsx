import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddReview from './AddReview';
import StarsWithGrade from '../../components/Stars/StarsWithGrade';
import SimpleReviewList from '../../components/Review/SimpleReviewList';
import AlcoholDetailContent from '../../components/Alcohol/AlcoholDetailContent';
import MainLayout from '../../layout/MainLayout';
import SubHeader from '../../components/Header/SubHeader';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryClient';
import API from '../../api';

const AlcoholDetailPage = () => {
  const { no } = useParams<{ no: string }>();
  const [isOpenNewReview, setIsOpenNewReview] = useState(false);

  const { data: { alcohol, reviews } = { alcohol: null, reviews: [] } } = useQuery({
    queryKey: [queryKeys.ALCOHOL, no],
    queryFn: () => API.getAlcoholByNo(no ?? ''),
    select: (data) => ({
      alcohol: data.alcData,
      reviews: data.reviewData,
    }),
  });

  const onClose = useCallback(() => {
    setIsOpenNewReview(false);
  }, []);

  return alcohol ? (
    <>
      <MainLayout>
        <SubHeader headerName={alcohol.alcNm}>
          <StarsWithGrade grade={alcohol.avgGrade || 0} showLabel={false} />
          <span className="text-stone-400 text-xs pr-2">(리뷰 {reviews?.length || 0})</span>
        </SubHeader>
        <div>
          <AlcoholDetailContent alcohol={alcohol} />
          <SimpleReviewList alcohol={alcohol} reviews={reviews} setIsOpenNewReview={setIsOpenNewReview} />
        </div>
      </MainLayout>
      {isOpenNewReview && <AddReview alcohol={alcohol} onClose={onClose} />}
    </>
  ) : null;
};

export default AlcoholDetailPage;
