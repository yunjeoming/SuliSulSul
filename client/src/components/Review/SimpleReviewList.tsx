import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Alcohol, Review } from '../../types/alcohol';
import StarsWithGrade from '../Stars/StarsWithGrade';
import ReviewUtil from '../../utils/Review';
import FirstReviewRequest from './FirstReviewRequest';

type Props = {
  alcohol: Alcohol;
  reviews: Review[] | undefined;
  addReview: () => void;
};

const SimpleReviewList: FC<Props> = ({ alcohol, reviews, addReview }) => {
  return (
    <section>
      <div className="flex justify-between items-center py-2 mb-2 border-t border-b">
        <div className="flex items-center">
          <span className="text-lg">리뷰</span>
          <Link
            to={`/reviews/${alcohol.alcNo}`}
            className="text-sm text-stone-400 hover:text-stone-600 cursor-pointer ml-2"
          >
            전체보기
          </Link>
        </div>
        <button className="text-sm text-stone-400 hover:text-stone-600" onClick={addReview}>
          등록하기
        </button>
      </div>
      {reviews?.length ? (
        <ul>
          {ReviewUtil.sortDescReviews(reviews)
            .slice(0, 5)
            .map((r) => (
              <li key={r.reviewNo.toString() + r.grade.toString()} className="border-b last:border-none p-2">
                <div className="flex items-center justify-between mb-2">
                  <StarsWithGrade grade={r.grade || 0} />
                  <span className="text-xs text-stone-500">{r.userNm || 'Anonymous'}</span>
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">{r.title}</div>
              </li>
            ))}
        </ul>
      ) : (
        <FirstReviewRequest />
      )}
    </section>
  );
};

export default SimpleReviewList;
