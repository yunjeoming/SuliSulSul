import { Review } from '../types/alcohol';

const ReviewUtil = {
  sortDescReviews: (originReviews: Review[]) => {
    return [...originReviews].sort((a, b) => new Date(b.regDt).getTime() - new Date(a.regDt).getTime());
  },
  getCountOfGradeByReviews: (targetGrade: number, reviews: Review[]) => {
    return reviews.filter((review) => Math.round(review.grade) === targetGrade).length;
  },
};

export default ReviewUtil;
