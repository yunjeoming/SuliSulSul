import { Review } from '../types/alcohol';

const ReviewUtil = {
  sortDescReviews: (originReviews: Review[]) => {
    return [...originReviews].sort((a, b) => new Date(b.regDt).getTime() - new Date(a.regDt).getTime());
  },
};

export default ReviewUtil;
