import React from 'react';
import { RxImage } from 'react-icons/rx';
import { MockAlcoholsType } from '../types/mockAlcohols';

const Alcohol = ({ no, name, categoryName, image }: MockAlcoholsType) => {
  return (
    <div className="flex-col justify-center">
      {image ? <img alt="alcoholImage" src={image} /> : <RxImage className="w-40 h-40" />}
      <span>{name}</span>
    </div>
  );
};

export default Alcohol;
