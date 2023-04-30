import React from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import AlcoholListItem from './AlcoholListItem';
import { ShowingType } from '../pages/AlcoholListPage';

type AlcoholListType = {
  alcohols: MockAlcoholsType[];
  isSimple?: boolean;
  showingType?: ShowingType;
  styles?: string;
  isAdmin?: boolean;
};

const AlcoholList = ({ alcohols, isSimple = false, showingType, styles = '', isAdmin = false }: AlcoholListType) => {
  const isSimpleStyles = isSimple ? 'overflow-auto' : 'flex-wrap justify-evenly';
  return (
    <div className={`flex ${isSimpleStyles} ${styles}`}>
      {alcohols.map((al) => (
        <AlcoholListItem key={al.no} alcohol={al} isSimple={isSimple} showingType={showingType} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default AlcoholList;
