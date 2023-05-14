import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MockAlcoholsType, MockReviewType } from '../types/mockAlcohols';

type Props = {
  alcohol: MockAlcoholsType;
  reviews: MockReviewType[];
  setIsOpenNewReview: React.Dispatch<React.SetStateAction<boolean>>;
};

const Reviews: FC<Props> = ({ alcohol, reviews, setIsOpenNewReview }) => {
  const handleAddReview = useCallback(() => {
    setIsOpenNewReview(true);
  }, [setIsOpenNewReview]);

  return (
    <section className="">
      <div className="flex justify-between items-center py-2 mb-2 border-t border-b">
        <Link to={`/reviews/${alcohol.no}`} className="text-lg cursor-pointer">
          리뷰
        </Link>
        <button className="text-sm text-stone-400 hover:text-stone-600" onClick={handleAddReview}>
          등록하기
        </button>
      </div>
      {reviews ? (
        <ul>
          {reviews.map((r) => (
            <li key={r.no + r.grade + r.userName} className="border-b last:border-none p-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="relative mr-1">
                    <span
                      className={`absolute top-0 left-0 text-yellow-300 overflow-hidden`}
                      style={{ width: `${r.grade * 20}%` }}
                    >
                      ★★★★★
                    </span>
                    <span className="text-gray-300">★★★★★</span>
                  </div>
                  <strong>{r.grade}</strong>
                </div>
                <span className="text-sm text-stone-600">{r.userName}</span>
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

export default Reviews;
