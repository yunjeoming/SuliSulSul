import React from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import AlcoholListItem from './AlcoholListItem';
import { ShowingType } from '../pages/AlcoholListPage';

type AlcoholListType = {
  alcohols: MockAlcoholsType[];
  isSimple?: boolean;
  showingType?: ShowingType;
  styles?: string;
};

const AlcoholList = ({ alcohols, isSimple = false, showingType, styles }: AlcoholListType) => {
  const isSimpleStyles = isSimple ? 'overflow-auto' : 'flex-wrap justify-evenly';
  return (
    <div className={`flex ${isSimpleStyles} ${styles}`}>
      {alcohols.map((al) => (
        <AlcoholListItem key={al.no} alcohol={al} isSimple={isSimple} showingType={showingType} />
      ))}
    </div>
  );
};

export default AlcoholList;
