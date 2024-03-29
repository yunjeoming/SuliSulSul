import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AlcoholListItem from '../../components/Alcohol/AlcoholListItem';
import ReviewList from '../../components/Review/ReviewList';
import AddReview from '../AlcoholDetailPage/AddReview';
import ReviewUtil from '../../utils/Review';
import useAddPage from '../../hooks/useAddPage';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AllType } from '../../types/alcohol';
import { queryKeys } from '../../queryClient';
import AlcoholAPI from '../../api/alcohol';
import SkeletonReviewList from '../../components/Skeleton/SkeletonReviewList';
import ReviewGrade from '../../components/Review/ReviewGrade';

const ReviewListPage = () => {
  const { no } = useParams();
  const queryKey = useMemo(() => [queryKeys.REVIEW, no], [no]);
  const queryClient = useQueryClient();
  const { isOpenAddPage, openAddPage, closeAddPage, addRef } = useAddPage();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, isSuccess } = useInfiniteQuery<AllType>({
    queryKey,
    queryFn: ({ pageParam = 0 }) => AlcoholAPI.getAlcoholByNo(no ?? '', pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.reviewData) return undefined;
      return lastPage.reviewData.length < 10 ? undefined : allPages.length;
    },
  });

  const invalidateReviewQuery = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient]);

  if (isLoading) {
    return <SkeletonReviewList />;
  }

  if (!data?.pages || !data.pages.length) {
    return null;
  }

  const { alcData: alcohol } = data.pages[0];
  const stars = ReviewUtil.getGradesFromAlcohol(alcohol);
  return (
    <>
      {isOpenAddPage && (
        <AddReview ref={addRef} alcohol={alcohol} onClose={closeAddPage} invalidateFn={invalidateReviewQuery} />
      )}
      <div className="p-2 border-b">
        <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
      </div>
      <ReviewGrade avgGrade={alcohol.avgGrade || 0} {...stars} />
      <div className="border-b py-4 text-center">
        <span className="text-sm cursor-pointer hover:text-stone-600" onClick={openAddPage}>
          리뷰 등록하기
        </span>
      </div>
      <ReviewList
        reviews={data?.pages?.map((page) => page.reviewData)}
        infiniteScrollOptions={{ isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, isSuccess }}
        invalidateFn={invalidateReviewQuery}
      />
    </>
  );
};

export default ReviewListPage;
