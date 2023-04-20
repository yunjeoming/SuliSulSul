import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { MockAlcoholsType, MockReviewType } from '../../types/mockAlcohols';
import Main from '../../components/Main';
import Thumbnail from '../../components/Thumbnail';
import AddReview from './AddReview';

const AlcoholDetailPage = () => {
  const { id } = useParams();
  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);
  const [reviews, setReviews] = useState<MockReviewType[] | null>([]);
  const [isOpenNewReview, setIsOpenNewReview] = useState(false);

  const getAlcohol = useCallback(() => {
    axios
      .get(`/alcohols.json`)
      .then((res) => {
        const targetAlcohol = res.data.alcohols.find((a: MockAlcoholsType) => a.no === Number(id)) as MockAlcoholsType;
        setAlcohol(targetAlcohol);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const getReviews = useCallback(() => {
    // 추후 id 얻게되면 요청 url에 id 넣어서 해당 data 가져오기
    axios
      .get(`/reviews.json`)
      .then((res) => {
        const targetReviews = res.data.reviews as MockReviewType[];
        const sortedReviews = targetReviews.sort((a, b) => +b.createdDate - +a.createdDate);
        setReviews(sortedReviews);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [id]);

  const handleAddReview = () => {
    setIsOpenNewReview(true);
  };

  useEffect(() => {
    getAlcohol();
    getReviews();
    // eslint-disable-next-line
  }, [id]);

  return alcohol ? (
    <>
      <Main
        headerName={alcohol.name}
        headerChildComponent={
          <>
            <div className="relative mr-1">
              <span
                className={`absolute top-0 left-0 text-yellow-300 overflow-hidden`}
                style={{ width: `${(alcohol.grade || 0) * 20}%` }}
              >
                ★★★★★
              </span>
              <span className="text-gray-300">★★★★★</span>
            </div>
            <span className="text-stone-400 text-xs pr-2">(리뷰 {reviews?.length || 0})</span>
          </>
        }
        bodyComponent={
          <>
            <section className="mb-4">
              <Thumbnail imgSrc="" isCenter />
              <p className="py-4">
                {alcohol.description}
                테스트용 이거 너무 맛있어요.
              </p>
            </section>
            <section className="">
              <div className="flex justify-between items-center py-2 mb-2 border-t border-b">
                <Link to={`/reviews/${alcohol.no}`} className='text-lg cursor-pointer'>리뷰</Link>
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
          </>
        }
      />
      {isOpenNewReview && (
        <AddReview alcohol={alcohol} onClose={() => setIsOpenNewReview(false)} getReviews={getReviews} />
      )}
    </>
  ) : null;
};

export default AlcoholDetailPage;
