import { useCallback, useState } from 'react';

const useCautionModal = () => {
  const [isOpenCaution, setIsOpenCaution] = useState(false);
  const cautionContent = `내용이 저장되지 않았습니다. \n나가시겠습니까?`;

  const openCautionModal = useCallback(() => {
    setIsOpenCaution(true);
  }, []);

  const closeCautionModal = useCallback(() => {
    setIsOpenCaution(false);
  }, []);

  return { isOpenCaution, cautionContent, openCautionModal, closeCautionModal };
};

export default useCautionModal;
