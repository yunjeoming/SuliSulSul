import { FC } from 'react';
import AlcoholListItem from './AlcoholListItem';
import { ShowingType } from '../../pages/AlcoholListPage';
import { Alcohol } from '../../types/alcohol';
import { InfiniteScrollOptionsType } from '../../types/common';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import SkeletonAlcoholList from '../Skeleton/SkeletonAlcoholList';

type AlcoholListType = {
  alcohols: Alcohol[][] | undefined;
  showingType?: ShowingType;
  styles?: string;
  isAdmin?: boolean;
  infiniteScrollOptions: InfiniteScrollOptionsType;
};

const AlcoholList: FC<AlcoholListType> = ({
  alcohols,
  showingType,
  styles = '',
  isAdmin = false,
  infiniteScrollOptions,
}) => {
  const { targetRef } = useIntersectionObserver(infiniteScrollOptions);

  if (infiniteScrollOptions?.isLoading) {
    return <SkeletonAlcoholList />;
  }

  if (!alcohols || !alcohols[0].length) {
    return <div className="flex justify-center">등록된 술이 없습니다.</div>;
  }

  return (
    <>
      <div
        className={`flex flex-wrap justify-start gap-y-3 p-4 ${
          showingType === 'gridType' ? '[&>*:last-child]:flex-grow-0 [&>*:last-child]:basis-1/2' : ''
        }  ${styles}`}
      >
        {alcohols.flat().map((al) => (
          <AlcoholListItem key={al.alcNo} alcohol={al} showingType={showingType} isAdmin={isAdmin} />
        ))}
      </div>
      <div ref={targetRef}></div>
    </>
  );
};

export default AlcoholList;
