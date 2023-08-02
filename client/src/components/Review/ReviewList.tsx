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
        <li key={r.reviewNo + r.regDt} className="p-4 border-b">
          <ReviewItem review={r} />
        </li>
      ))}
    </ul>
  ) : (
    <FirstReviewRequest />
  );
};

export default ReviewList;
