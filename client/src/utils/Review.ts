import { Review } from '../types/alcohol';

const ReviewUtil = {
  sortReviews: (originReviews: Review[]) => {
    return originReviews.sort((a, b) => +b.modifiedDate - +a.modifiedDate);
  },
};

export default ReviewUtil;
