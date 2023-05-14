import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { BsListUl } from 'react-icons/bs';
import { RxGrid } from 'react-icons/rx';
import axios from 'axios';
import { MockAlcoholsType } from '../../types/mockAlcohols';
import AlcoholList from '../../components/AlcoholList';
import MainLayout from '../../layout/MainLayout';
import SubHeader from '../../components/SubHeader';

export type ShowingType = 'listType' | 'gridType';

const AlcoholListPage = () => {
  const { category } = useParams();

  const [alcohols, setAlcohols] = useState<MockAlcoholsType[]>([]);
  const [showingType, setShowingType] = useState<ShowingType>('listType');

  useEffect(() => {
    // if category === 'all', 모든 술 가져오기
    axios
      .get(`/alcoholsByCategory.json`)
      .then((res) => {
        setAlcohols(res.data.alcoholsByCategory);
      })
      .catch((err) => console.error(err));
  }, [category]);

  const handleClickShowingType = (type: ShowingType) => {
    setShowingType(type);
  };

  return category ? (
    <MainLayout>
      <SubHeader headerName={category}>
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
