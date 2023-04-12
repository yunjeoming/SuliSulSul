import React from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import AlcoholListItem from './AlcoholListItem';
import { ShowingType } from '../pages/AlcoholListPage';

type AlcoholListType = {
  alcohols: MockAlcoholsType[];
  isSimple?: boolean;
  showingType?: ShowingType;
};

const AlcoholList = ({ alcohols, isSimple = false, showingType }: AlcoholListType) => {
  const styles = isSimple ? 'overflow-auto' : 'flex-wrap justify-evenly';
  return (
    <div className={`flex ${styles}`}>
      {alcohols.map((al) => (
        <AlcoholListItem key={al.no} alcohol={al} isSimple={isSimple} showingType={showingType} />
      ))}
    </div>
  );
};

export default AlcoholList;
