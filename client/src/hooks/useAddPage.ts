import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

const useAddPage = () => {
  const [isOpenAddPage, setIsOpenAddPage] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const updateOverflowStyle = useCallback((targetRef: RefObject<HTMLDivElement>, targetStyle: string) => {
    const targetElem = targetRef.current;
    const parentElem = targetElem?.parentElement;
    if (parentElem) {
      parentElem.style.overflow = targetStyle;
    }
  }, []);

  const deleteOverflowStyle = useCallback((targetRef: RefObject<HTMLDivElement>) => {
    const targetElem = targetRef.current;
    const parentElem = targetElem?.parentElement;
    if (parentElem) {
      parentElem.style.removeProperty('overflow');
    }
  }, []);

  const openAddPage = useCallback(() => {
    setIsOpenAddPage(true);
  }, []);

  const closeAddPage = useCallback(() => {
    setIsOpenAddPage(false);
    deleteOverflowStyle(addRef);
    updateOverflowStyle(targetRef, 'auto');
  }, [updateOverflowStyle, deleteOverflowStyle]);

  useEffect(() => {
    if (isOpenAddPage) {
      updateOverflowStyle(addRef, 'hidden');
      updateOverflowStyle(targetRef, 'hidden');
    }
  }, [isOpenAddPage, updateOverflowStyle]);

  return { isOpenAddPage, openAddPage, closeAddPage, addRef, targetRef };
};

export default useAddPage;
