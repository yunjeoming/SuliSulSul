import { useCallback, useEffect, useMemo, useRef } from 'react';
import { InfiniteScrollOptionsType } from '../types/common';

const useIntersectionObserver = (infiniteScrollOptions?: InfiniteScrollOptionsType) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const ioCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (
        !infiniteScrollOptions?.isSuccess ||
        !infiniteScrollOptions?.hasNextPage ||
        infiniteScrollOptions?.isLoading ||
        infiniteScrollOptions?.isFetchingNextPage
      ) {
        return;
      }
      if (entry.isIntersecting) {
        infiniteScrollOptions && infiniteScrollOptions.fetchNextPage();
      }
    },
    [infiniteScrollOptions],
  );

  const observer = useMemo(() => new IntersectionObserver(ioCallback), [ioCallback]);

  useEffect(() => {
    const targetElem = targetRef.current;
    if (!targetElem) return;

    observer.observe(targetElem);

    return () => {
      observer.unobserve(targetElem);
    };
  }, [observer]);

  return { targetRef };
};

export default useIntersectionObserver;
