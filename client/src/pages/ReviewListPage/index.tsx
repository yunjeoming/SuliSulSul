import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockAlcoholsType, MockReviewType } from '../../types/mockAlcohols';
import IconButton from '../../components/IconButton';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import AlcoholListItem from '../../components/AlcoholListItem';

const ReviewListPage = () => {
  const { id } = useParams();

  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);
  const [reviews, setReviews] = useState<MockReviewType[]>([]);

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
    axios
      .get(`/reviews.json`)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    getAlcohol();
    getReviews();

    // eslint-disable-next-line
  }, [id]);
  return alcohol ? (
    <div>
      <div className="px-2 border-b mb-2">
        <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
      </div>
      {reviews.map((r) => (
        <div key={r.no + r.grade + r.userName} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              <span className="text-sm text-stone-600">{r.userName}</span>
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
            </div>
            <div className="flex">
              <IconButton styles="p-1">
                <AiOutlineCloseSquare />
              </IconButton>
              <IconButton styles="p-1">
                <AiOutlineEdit />
              </IconButton>
            </div>
          </div>
          <div className="font-bold text-lg">{r.title}</div>
          <div>{r.content}</div>
        </div>
      ))}
    </div>
  ) : null;
};

export default ReviewListPage;
