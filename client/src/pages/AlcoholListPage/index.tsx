import { useState } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { BsListUl } from 'react-icons/bs';
import { RxGrid } from 'react-icons/rx';
import AlcoholList from '../../components/Alcohol/AlcoholList';
import MainLayout from '../../layout/MainLayout';
import SubHeader from '../../components/Header/SubHeader';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryClient';
import AlcoholAPI from '../../api/alcohol';
import { Alcohol } from '../../types/alcohol';
import useCategory from '../../hooks/useCategory';

export type ShowingType = 'listType' | 'gridType';

const AlcoholListPage = () => {
  const { no } = useParams();
  const categoryInfo = useCategory().getCategoryByName(no);

  const [showingType, setShowingType] = useState<ShowingType>('listType');

  const { data: alcohols = [] } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL, categoryInfo?.cateNm || ''],
    queryFn: () => AlcoholAPI.getAlcoholByCategory(categoryInfo),
  });

  const handleClickShowingType = (type: ShowingType) => {
    setShowingType(type);
  };

  return categoryInfo ? (
    <MainLayout>
      <SubHeader headerName={categoryInfo.cateNm}>
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
