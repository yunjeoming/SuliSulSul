import React, { FC } from 'react';
import { RxImage } from 'react-icons/rx';

type Props = {
  imgSrc: string | undefined;
  size?: string;
  styles?: string;
  isCenter?: boolean;
  imgStyles?: string;
};

const Thumbnail: FC<Props> = ({ imgSrc, size = '10rem', styles = '', imgStyles = '', isCenter = false }) => {
  // 추후 실제 이미지 넣을 경우 img style 작업 필수
  return (
    <div className={`${isCenter ? `flex items-center justify-center bg-gray-100 ${styles}` : styles}`}>
      {imgSrc ? (
        <img alt="alcoholImage" src={imgSrc} className={`${imgStyles}`} />
      ) : (
        <RxImage size={size} className={`${imgStyles}`} />
      )}
    </div>
  );
};

export default Thumbnail;
