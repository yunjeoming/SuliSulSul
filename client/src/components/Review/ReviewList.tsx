import { FC } from 'react';
import ReviewItem from './ReviewItem';
import { Review } from '../../types/alcohol';
import ReviewUtil from '../../utils/Review';
import FirstReviewRequest from './FirstReviewRequest';

type Props = {
  reviews: Review[];
};

const ReviewList: FC<Props> = ({ reviews }) => {
  return reviews.length ? (
    <ul>
      {ReviewUtil.sortDescReviews(reviews).map((r) => (
        <ReviewItem key={r.reviewNo + r.regDt} review={r} />
      ))}
    </ul>
  ) : (
    <FirstReviewRequest />
  );
};

export default ReviewList;
