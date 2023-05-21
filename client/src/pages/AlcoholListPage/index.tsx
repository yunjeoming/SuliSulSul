import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { BsListUl } from 'react-icons/bs';
import { RxGrid } from 'react-icons/rx';
import axios from 'axios';
import AlcoholList from '../../components/AlcoholList';
import MainLayout from '../../layout/MainLayout';
import SubHeader from '../../components/SubHeader';
import { Alcohol } from '../../types/alcohol';

export type ShowingType = 'listType' | 'gridType';

const AlcoholListPage = () => {
  const {
    state: { cateNm, cateNo },
  } = useLocation();

  const [alcohols, setAlcohols] = useState<Alcohol[]>([]);
  const [showingType, setShowingType] = useState<ShowingType>('listType');

  useEffect(() => {
    // if category === 'all', 모든 술 가져오기
    const form = new FormData();
    form.append('cateNo', cateNo);
    if (cateNm === 'all') {
      form.delete('cateNo');
    }
    axios
      .post(`/selectAlcList`, form)
      .then((res) => {
        setAlcohols(res.data);
      })
      .catch((err) => console.error(err));
  }, [cateNm, cateNo]);

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
