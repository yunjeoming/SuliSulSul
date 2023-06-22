import React, { FC } from 'react';
import ReviewItem from './ReviewItem';
import { Review } from '../../types/alcohol';

type Props = {
  reviews: Review[];
};

const ReviewList: FC<Props> = ({ reviews }) => {
  return (
    <ul>
      {reviews.map((r) => (
        <li key={r.reviewNo + r.grade + r.userNm} className="p-4 border-b">
          <ReviewItem review={r} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
