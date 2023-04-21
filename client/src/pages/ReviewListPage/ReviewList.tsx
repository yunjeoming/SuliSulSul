import React, { FC } from 'react';
import { MockReviewType } from '../../types/mockAlcohols';
import ReviewItem from './ReviewItem';

type Props = {
  reviews: MockReviewType[];
};

const ReviewList: FC<Props> = ({ reviews }) => {
  return (
    <ul>
      {reviews.map((r) => (
        <li key={r.no + r.grade + r.userName} className="p-4 border-b">
          <ReviewItem review={r} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
