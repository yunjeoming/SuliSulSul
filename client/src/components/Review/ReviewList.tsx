import { FC } from 'react';
import ReviewItem from './ReviewItem';
import { Review } from '../../types/alcohol';
import FirstReviewRequest from './FirstReviewRequest';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { InfiniteScrollOptionsType } from '../../types/common';
import SkeletonReviewList from '../Skeleton/SkeletonReviewList';

type Props = {
  reviews: Review[][] | undefined;
  infiniteScrollOptions?: InfiniteScrollOptionsType;
};

const ReviewList: FC<Props> = ({ reviews, infiniteScrollOptions }) => {
  const { targetRef } = useIntersectionObserver(infiniteScrollOptions);

  if (infiniteScrollOptions?.isLoading) {
    return <SkeletonReviewList />;
  }

  if (!reviews || !reviews[0].length) {
    return <FirstReviewRequest />;
  }

  return (
    <>
      <ul className="p-4">
        {reviews.flat().map((r) => (
          <ReviewItem key={r.reviewNo + r.regDt} review={r} />
        ))}
      </ul>
      <div ref={targetRef}></div>
    </>
  );
};

export default ReviewList;
