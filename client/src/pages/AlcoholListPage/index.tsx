import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { BsListUl } from 'react-icons/bs';
import { RxGrid } from 'react-icons/rx';
import AlcoholList from '../../components/AlcoholList';
import MainLayout from '../../layout/MainLayout';
import SubHeader from '../../components/SubHeader';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryClient';
import API from '../../api';
import { Alcohol } from '../../types/alcohol';

export type ShowingType = 'listType' | 'gridType';

const AlcoholListPage = () => {
  const {
    state: { cateNm, cateNo },
  } = useLocation();

  const [showingType, setShowingType] = useState<ShowingType>('listType');

  const { data: alcohols = [] } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL, cateNm, cateNo],
    queryFn: () => API.getAlcoholByCategory({ cateNo, cateNm }),
  });

  const handleClickShowingType = (type: ShowingType) => {
    setShowingType(type);
  };

  return cateNm ? (
    <MainLayout>
      <SubHeader headerName={cateNm}>
        <IconButton
          styles={`border-l border-r border-stone-950 p-3 hover:bg-gray-100`}
          onClick={() => handleClickShowingType('listType')}
        >
          <BsListUl color={`${showingType === 'listType' ? '#000' : '#adadad'}`} />
        </IconButton>
        <IconButton styles={`p-3 hover:bg-gray-100`} onClick={() => handleClickShowingType('gridType')}>
          <RxGrid color={`${showingType === 'gridType' ? '#000' : '#adadad'}`} />
        </IconButton>
      </SubHeader>
      <AlcoholList alcohols={alcohols} showingType={showingType} />
    </MainLayout>
  ) : null;
};

export default AlcoholListPage;
