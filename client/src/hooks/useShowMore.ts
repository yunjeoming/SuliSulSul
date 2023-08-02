import { RefObject, useEffect, useState } from 'react';

const useShowMore = (targetRef: RefObject<HTMLElement>) => {
  const [state, setState] = useState({
    showMore: false,
    isMoreBtn: true,
  });

  const handleShowMoreClick = () => {
    setState((prev) => ({ ...prev, isMoreBtn: !prev.isMoreBtn }));
  };

  useEffect(() => {
    if (targetRef.current && targetRef.current.clientHeight > 200) {
      setState((prev) => ({ ...prev, showMore: true }));
    }
  }, [targetRef]);

  return { state, handleShowMoreClick };
};

export default useShowMore;
