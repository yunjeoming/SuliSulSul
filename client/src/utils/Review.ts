import { Alcohol, Review } from '../types/alcohol';

const ReviewUtil = {
  sortDescReviews: (originReviews: Review[]) => {
    return [...originReviews].sort((a, b) => new Date(b.regDt).getTime() - new Date(a.regDt).getTime());
  },
  getGradesFromAlcohol: (alcohol?: Alcohol) => {
    const grades = {
      totalReviews: 0,
      star1: 0,
      star2: 0,
      star3: 0,
      star4: 0,
      star5: 0,
    };

    if (!alcohol) return grades;

    const { grade1, grade15, grade2, grade25, grade3, grade35, grade4, grade45, grade5 } = alcohol;
    grades.star1 = grade1 + grade15;
    grades.star2 = grade2 + grade25;
    grades.star3 = grade3 + grade35;
    grades.star4 = grade4 + grade45;
    grades.star5 = grade5;
    grades.totalReviews = grades.star1 + grades.star2 + grades.star3 + grades.star4 + grades.star5;

    return grades;
  },
  getReviewDate: (date: string) => {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear().toString().slice(-2);
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const day = originalDate.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  },
};

export default ReviewUtil;
