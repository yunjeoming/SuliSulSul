import React from 'react';
import { RxImage } from 'react-icons/rx';

const Thumbnail = ({ imgSrc, size = '10rem', styles }: { imgSrc: string | undefined; size?: string, styles?: string }) => {
  // 추후 실제 이미지 넣을 경우 img style 작업 필수 
  return imgSrc ? <img alt="alcoholImage" src={imgSrc} className={styles}  /> : <RxImage size={size} className={styles} />;
};

export default Thumbnail;
