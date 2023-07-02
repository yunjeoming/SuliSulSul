import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Alcohol, Review } from '../../types/alcohol';
import StarsWithGrade from '../Stars/StarsWithGrade';

type Props = {
  alcohol: Alcohol;
  reviews: Review[] | undefined;
  setIsOpenNewReview: React.Dispatch<React.SetStateAction<boolean>>;
};

const SimpleReviewList: FC<Props> = ({ alcohol, reviews, setIsOpenNewReview }) => {
  const handleAddReview = useCallback(() => {
    setIsOpenNewReview(true);
  }, [setIsOpenNewReview]);

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
        <button className="text-sm text-stone-400 hover:text-stone-600" onClick={handleAddReview}>
          등록하기
        </button>
      </div>
      {reviews ? (
        <ul>
          {reviews.map((r) => (
            <li key={r.reviewNo + r.grade + r.userNm} className="border-b last:border-none p-2">
              <div className="flex items-center justify-between mb-2">
                <StarsWithGrade grade={r.grade || 0} />
                <span className="text-sm text-stone-600">{r.userNm}</span>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{r.title}</div>
            </li>
          ))}
        </ul>
      ) : (
        '등록된 리뷰가 없습니다. 리뷰를 남겨주세요'
      )}
    </section>
  );
};

export default SimpleReviewList;
