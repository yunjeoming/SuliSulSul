import React from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import AlcoholThumbnail from './AlcoholThumbnail';

type AlcoholListType = {
  alcohols: MockAlcoholsType[];
};

const AlcoholThumbnailList = ({ alcohols }: AlcoholListType) => {
  return (
    <div className="flex overflow-auto ">
      {alcohols.map((al) => (
        <AlcoholThumbnail key={al.no} {...al} />
      ))}
    </div>
  );
};

export default AlcoholThumbnailList;
