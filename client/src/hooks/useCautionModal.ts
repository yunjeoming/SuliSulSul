import { useCallback, useState } from 'react';
import { TextConstants } from '../constants/text';

const useCautionModal = () => {
  const [isOpenCaution, setIsOpenCaution] = useState(false);
  const cautionContent = TextConstants.CAUTION;

  const openCautionModal = useCallback(() => {
    setIsOpenCaution(true);
  }, []);

  const closeCautionModal = useCallback(() => {
    setIsOpenCaution(false);
  }, []);

  return { isOpenCaution, cautionContent, openCautionModal, closeCautionModal };
};

export default useCautionModal;
