import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { BsListUl } from 'react-icons/bs';
import { RxGrid } from 'react-icons/rx';
import AlcoholList from '../../components/Alcohol/AlcoholList';
import SubHeader from '../../components/Header/SubHeader';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess } = useInfiniteQuery({
    queryKey: [queryKeys.ALCOHOL, categoryInfo?.cateNm || '', categoryInfo?.cateNo || ''],
    queryFn: ({ pageParam = 0 }) => AlcoholAPI.getAlcoholByCategory(categoryInfo, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // lastPage -> 직전 페이지
      // allPags -> 로드된 모든 페이지

      // false 리턴되면 무한스크롤 종료
      // 다음 페이지가 있다면 다음 페이지 번호를 넘겨주자
      // console.log('getNextPagePram!!', lastPage, allPages);
      return 1;
    },
  });

  const handleClickShowingType = (type: ShowingType) => {
    setShowingType(type);
  };

  useEffect(() => {
    console.log('data->', data);
    console.log('data.pages->', data?.pages);
  }, [data]);

  useEffect(() => {
    console.log(hasNextPage, isLoading, isSuccess);
  }, [hasNextPage, isLoading, isSuccess]);

  return categoryInfo ? (
    <>
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
      <AlcoholList
        alcohols={alcohols}
        showingType={showingType}
        infiniteScrollOptions={{ isLoading, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage }}
      />
    </>
  ) : null;
};

export default AlcoholListPage;
