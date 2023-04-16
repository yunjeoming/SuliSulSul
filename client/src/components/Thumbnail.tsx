import React from 'react';
import { RxImage } from 'react-icons/rx';

type Props = {
  imgSrc: string | undefined;
  size?: string;
  styles?: string;
  isCenter?: boolean;
};

const Thumbnail = ({ imgSrc, size = '10rem', styles, isCenter = false }: Props) => {
  // 추후 실제 이미지 넣을 경우 img style 작업 필수
  return (
    <div className={`${isCenter && `flex items-center justify-center bg-gray-100`}`}>
      {imgSrc ? (
        <img alt="alcoholImage" src={imgSrc} className={`${styles}`} />
      ) : (
        <RxImage size={size} className={`${styles}`} />
      )}
    </div>
  );
};

export default Thumbnail;
