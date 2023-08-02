import { useCallback, useEffect, useRef, useState } from 'react';

const useAddPage = () => {
  const [isOpenAddPage, setIsOpenAddPage] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const openAddPage = useCallback(() => {
    setIsOpenAddPage(true);
  }, []);

  const closeAddPage = useCallback(() => {
    setIsOpenAddPage(false);
  }, []);

  useEffect(() => {
    const targetElem = ref.current;
    const parentElem = targetElem?.parentElement;
    if (!parentElem) return;

    if (isOpenAddPage) {
      targetElem.style.overflow = 'hidden';
      parentElem.style.overflow = 'hidden';
    } else {
      targetElem.style.overflow = 'auto';
      parentElem.style.overflow = 'auto';
    }
  }, [isOpenAddPage, ref]);

  return { isOpenAddPage, openAddPage, closeAddPage, ref };
};

export default useAddPage;
