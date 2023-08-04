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

  const openAddPage = useCallback(() => {
    setIsOpenAddPage(true);
  }, []);

  const closeAddPage = useCallback(() => {
    setIsOpenAddPage(false);
    updateOverflowStyle(addRef, 'unset');
    updateOverflowStyle(targetRef, 'auto');
  }, [updateOverflowStyle]);

  useEffect(() => {
    if (isOpenAddPage) {
      updateOverflowStyle(addRef, 'hidden');
      updateOverflowStyle(targetRef, 'hidden');
    }
  }, [isOpenAddPage, updateOverflowStyle]);

  return { isOpenAddPage, openAddPage, closeAddPage, addRef, targetRef };
};

export default useAddPage;
