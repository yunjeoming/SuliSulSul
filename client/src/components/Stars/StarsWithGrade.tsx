import React, { FC } from 'react';

type Props = {
  grade: number;
  showLabel?: boolean;
  styles?: string;
  text?: string;
};

const StarsWithGrade: FC<Props> = ({ grade, showLabel, styles, text }) => {
  return (
    <div className={`${styles} flex items-center`}>
      <div className="relative mr-1">
        <span className={`absolute top-0 left-0 text-yellow-300 overflow-hidden`} style={{ width: `${grade * 20}%` }}>
          ★★★★★
        </span>
        <span className="text-gray-300">★★★★★</span>
      </div>
      {showLabel && <strong className='flex-grow'>{grade}</strong>}
      {text && <span className='text-xs text-stone-400 ml-1'>{text}</span>}
    </div>
  );
};

StarsWithGrade.defaultProps = {
  grade: 0,
  showLabel: true,
  styles: '',
  text: '',
};

export default StarsWithGrade;
