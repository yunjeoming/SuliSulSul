import { FC } from 'react';
import StarsWithGrade from '../Stars/StarsWithGrade';

type Props = {
  avgGrade: number;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
};

const ReviewGrade: FC<Props> = ({ avgGrade, star1, star2, star3, star4, star5 }) => {
  return (
    <div className="flex items-center justify-evenly  border-b py-4">
      <StarsWithGrade grade={avgGrade} styles="text-2xl flex-col-reverse" />
      <div className="text-sm">
        <StarsWithGrade grade={5} text={`(${star5})`} />
        <StarsWithGrade grade={4} text={`(${star4})`} />
        <StarsWithGrade grade={3} text={`(${star3})`} />
        <StarsWithGrade grade={2} text={`(${star2})`} />
        <StarsWithGrade grade={1} text={`(${star1})`} />
      </div>
    </div>
  );
};

export default ReviewGrade;
