import { useState } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { BsListUl } from 'react-icons/bs';
import { RxGrid } from 'react-icons/rx';
import AlcoholList from '../../components/Alcohol/AlcoholList';
import SubHeader from '../../components/Header/SubHeader';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '../../queryClient';
import AlcoholAPI from '../../api/alcohol';
import useCategory from '../../hooks/useCategory';

export type ShowingType = 'listType' | 'gridType';

const AlcoholListPage = () => {
  const { no } = useParams();
  const categoryInfo = useCategory().getCategoryByName(no);
  const [showingType, setShowingType] = useState<ShowingType>('listType');

  const { data, isLoading, hasNextPage, isFetchingNextPage, isSuccess, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKeys.ALCOHOL, categoryInfo?.cateNm || '', categoryInfo?.cateNo || ''],
    queryFn: ({ pageParam = 0 }) => AlcoholAPI.getAlcoholByCategory(categoryInfo, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length < 10 ? undefined : allPages.length;
    },
  });

  const handleClickShowingType = (type: ShowingType) => {
    setShowingType(type);
  };

  return categoryInfo ? (
    <>
      <SubHeader headerName={categoryInfo.cateNm}>
        <IconButton
          styles={`border-l border-r border-stone-950 p-3 hover:bg-gray-100`}
          onClick={() => handleClickShowingType('listType')}
          label="listType"
        >
          <BsListUl color={`${showingType === 'listType' ? '#000' : '#adadad'}`} />
        </IconButton>
        <IconButton
          styles={`p-3 hover:bg-gray-100`}
          onClick={() => handleClickShowingType('gridType')}
          label="gridType"
        >
          <RxGrid color={`${showingType === 'gridType' ? '#000' : '#adadad'}`} />
        </IconButton>
      </SubHeader>
      <AlcoholList
        alcohols={data?.pages}
        showingType={showingType}
        infiniteScrollOptions={{ isLoading, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage }}
      />
    </>
  ) : null;
};

export default AlcoholListPage;
