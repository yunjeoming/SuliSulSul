import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockAlcoholsType, MockReviewType } from '../../types/mockAlcohols';
import IconButton from '../../components/IconButton';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import AlcoholListItem from '../../components/AlcoholListItem';
import StarsWithGrade from '../../components/StarsWithGrade';

const ReviewListPage = () => {
  const { id } = useParams();

  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);
  const [reviews, setReviews] = useState<MockReviewType[]>([]);
  const [isOpenPasswordInput, setIsOpenPasswordInput] = useState(false);

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

  const handleClickEditReview = useCallback(() => {
    setIsOpenPasswordInput((prev) => !prev);
  }, []);

  return alcohol ? (
    <div>
      <div className="px-2 border-b">
        <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
      </div>
      <div className="flex items-center justify-evenly  border-b py-4">
        <StarsWithGrade grade={alcohol.grade || 0} styles="text-2xl flex-col-reverse" />
        <div className="text-sm">
          <StarsWithGrade grade={5} text={`(${0})`} />
          <StarsWithGrade grade={4} text={`(${0})`} />
          <StarsWithGrade grade={3} text={`(${0})`} />
          <StarsWithGrade grade={2} text={`(${0})`} />
          <StarsWithGrade grade={1} text={`(${0})`} />
        </div>
      </div>
      {reviews.map((r) => (
        <div key={r.no + r.grade + r.userName} className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <StarsWithGrade grade={r.grade} />
              <span className="text-sm text-stone-600">{r.userName}</span>
            </div>
            <div className="flex text-stone-400">
              <IconButton styles="p-1 hover:text-stone-700" onClick={handleClickEditReview}>
                <AiOutlineEdit />
              </IconButton>
              <IconButton styles="p-1 hover:text-stone-700">
                <AiOutlineCloseSquare />
              </IconButton>
            </div>
          </div>
          <div className="font-bold mb-2">{r.title}</div>
          <div>{r.content}</div>
          {isOpenPasswordInput && (
            <div className="flex items-center p-2">
              <input type="password" className="flex-grow rounded-md p-2 mr-2" />
              <button className="border rounded-md px-4 py-2">확인</button>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : null;
};

export default ReviewListPage;
