import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MockAlcoholsType, MockReviewType } from '../../types/mockAlcohols';
import Main from '../../components/Main';
import Thumbnail from '../../components/Thumbnail';

const AlcoholDetailPage = () => {
  const { id } = useParams();
  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);
  const [reviews, setReviews] = useState<MockReviewType[] | null>([]);
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

  useEffect(() => {
    getAlcohol();
    getReviews();
  // eslint-disable-next-line  
  }, [id]);

  return alcohol ? (
    <Main
      headerName={alcohol.name}
      headerChildComponent={
        <>
          <span className="pr-1">⭐️ {alcohol.grade || '0.0'}</span>
          <span className="text-stone-400 text-xs pr-2">(리뷰 {reviews?.length || 0})</span>
        </>
      }
      bodyComponent={
        <>
          <section className="mb-4">
            <Thumbnail imgSrc="" isCenter />
            <p className="py-4">
              {alcohol.description}
              테스트용 이거 너무 맛있어요. 엄청 강추합니다. 그러나 도수가 너무 높아요 그러니 한번에 많이 마시면 바로 훅
              갈 수 있답니다~~~~! 테스트용 이거 너무 맛있어요. 엄청 강추합니다. 그러나 도수가 너무 높아요 그러니 한번에
              많이 마시면 바로 훅 갈 수 있답니다~~~~! 테스트용 이거 너무 맛있어요. 엄청 강추합니다. 그러나 도수가 너무
              높아요 그러니 한번에 많이 마시면 바로 훅 갈 수 있답니다~~~~!
            </p>
          </section>
          <section className="border-t">
            {reviews ? (
              <ul>
                {reviews.map((r) => (
                  <li key={r.no + r.grade + r.userName} className="flex items-center border-b last:border-none p-2">
                    <span className="grow overflow-hidden text-ellipsis whitespace-nowrap">{r.title}</span>
                    <span className="grow-0 shrink-0 w-2/12">⭐️ {r.grade}</span>
                    <span className="grow-0 shrink-0 w-3/12 overflow-hidden text-ellipsis whitespace-nowrap">
                      {r.userName}
                    </span>
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
  ) : null;
};

export default AlcoholDetailPage;
