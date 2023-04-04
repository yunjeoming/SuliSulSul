import React from 'react';
import { RxImage } from 'react-icons/rx';
import { MockAlcoholsType } from '../types/mockAlcohols';

const AlcoholThumbnail = ({ no, name, categoryName, image }: MockAlcoholsType) => {
  const handleClickThumbnail = () => {
    console.log('click~~~', name);
  };

  return (
    <div className="flex flex-col justify-center items-center cursor-pointer" onClick={handleClickThumbnail}>
      {image ? <img alt="alcoholImage" src={image} /> : <RxImage className="w-40 h-40" />}
      <span>{name}</span>
    </div>
  );
};

export default AlcoholThumbnail;
