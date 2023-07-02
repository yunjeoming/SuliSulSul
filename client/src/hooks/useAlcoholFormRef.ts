import { useCallback, useRef } from 'react';
import { RefObjType } from '../types/ref';

const useAlcoholFormRef = () => {
  const refObj = useRef<RefObjType>({
    alcoholNmRef: null,
    categoryNmRef: null,
    volRef: null,
    expRef: null,
    descriptionRef: null,
  });
  // const imageRef = useRef<HTMLInputElement>(null);

  const resetRefs = useCallback((refObj: React.MutableRefObject<RefObjType>) => {
    const { alcoholNmRef, descriptionRef, categoryNmRef, volRef } = refObj.current;

    // 입력창 초기화
    if (alcoholNmRef) {
      alcoholNmRef.value = '';
    }
    if (categoryNmRef) {
      categoryNmRef.value = '';
    }
    if (volRef) {
      volRef.value = '';
    }
    if (descriptionRef) {
      descriptionRef.value = '';
    }
  }, []);

  const getFormDataByRefObj = useCallback((refObj: React.MutableRefObject<RefObjType>) => {
    const { alcoholNmRef, descriptionRef, categoryNmRef, volRef, expRef } = refObj.current;

    const data = new FormData();
    const alcNm = alcoholNmRef?.value || '';
    const cateNo = categoryNmRef?.value || '';
    const vol = volRef?.value || '';
    const detail = descriptionRef?.value || '';
    const expYn = expRef?.value || '';
    data.append('alcNm', alcNm);
    data.append('cateNo', cateNo);
    data.append('detail', detail);
    data.append('vol', vol);
    data.append('expYn', expYn);

    return data;
  }, []);

  return { refObj, resetRefs, getFormDataByRefObj };
};

export default useAlcoholFormRef;
