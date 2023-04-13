import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { BsListUl } from 'react-icons/bs';
import { RxGrid } from 'react-icons/rx';
import axios from 'axios';
import { MockAlcoholsType } from '../../types/mockAlcohols';
import AlcoholList from '../../components/AlcoholList';
import MainStyle from '../../components/MainStyle';

export type ShowingType = 'listType' | 'gridType';

const AlcoholListPage = () => {
  const { category } = useParams();

  const [alcohols, setAlcohols] = useState<MockAlcoholsType[]>([]);
  const [showingType, setShowingType] = useState<ShowingType>('listType');

  useEffect(() => {
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

  return (
    <MainStyle>
      <div className="flex justify-between items-center pl-4 border-t border-b child border-stone-950">
        <span className="text-2xl flex-grow">{category}</span>
        <IconButton
          styles={`border-l border-r border-stone-950 hover:bg-gray-100`}
          onClick={() => handleClickShowingType('listType')}
        >
          <BsListUl color={`${showingType === 'listType' ? '#000' : '#adadad'}`} />
        </IconButton>
        <IconButton styles={`hover:bg-gray-100`} onClick={() => handleClickShowingType('gridType')}>
          <RxGrid color={`${showingType === 'gridType' ? '#000' : '#adadad'}`} />
        </IconButton>
      </div>
      <div className="p-4">
        <AlcoholList alcohols={alcohols} showingType={showingType} />
      </div>
    </MainStyle>
  );
};

export default AlcoholListPage;
