import { forwardRef, useCallback, useState } from 'react';
import AddLayout from '../../../layout/AddLayout';
import AlcoholForm from '../../../components/Alcohol/AlcoholForm';
import { useNavigate } from 'react-router-dom';
import useAlcoholFormRef from '../../../hooks/useAlcoholFormRef';
import { useMutation } from '@tanstack/react-query';
import AlcoholAPI from '../../../api/alcohol';
import TwoBtnsModal from '../../../components/Modal/TwoBtnsModal';
import OneBtnModal from '../../../components/Modal/OneBtnModal';
import useInvalidateAlcohol from '../../../hooks/useInvalidateAlcohol';
import { TextConstants } from '../../../constants/text';
import { ModalType } from '../../../types/common';

type Props = {
  onClose: () => void;
  invalidateFn?: () => void;
};

const AddAlcohol = forwardRef<HTMLDivElement, Props>(({ onClose: closeAddAlcohol, invalidateFn }, ref) => {
  const navigate = useNavigate();
  const { refObj, resetRefs, getFormDataByRefObj } = useAlcoholFormRef();
  const { invalidateAlcohol } = useInvalidateAlcohol(['admin']);

  const [oneBtnModalState, setOneBtnModalState] = useState<{
    content: string;
    isOpenModal: boolean;
    targetRef: HTMLElement | null;
  }>({
    content: '',
    isOpenModal: false,
    targetRef: null,
  });

  const [twoBtnModalState, setTwoBtnModalState] = useState<{
    content: string;
    isOpenModal: boolean;
    type: ModalType | null;
    onLeftFn?: () => void;
    onRightFn?: () => void;
    closeBtnName?: string;
    okBtnName?: string;
  }>({
    content: '',
    isOpenModal: false,
    type: null,
  });

  const openOneBtnModal = useCallback((content: string, targetRef: HTMLElement | null) => {
    setOneBtnModalState((prev) => ({
      ...prev,
      isOpenModal: true,
      content,
      targetRef,
    }));
  }, []);

  const openTwoBtnModal = useCallback(
    (
      content: string,
      options?: {
        type?: ModalType;
        onLeftFn?: () => void;
        onRightFn?: () => void;
        closeBtnName?: string;
        okBtnName?: string;
      },
    ) => {
      setTwoBtnModalState((prev) => {
        const returnState = {
          ...prev,
          isOpenModal: true,
          content,
        };
        if (options?.type) {
          returnState.type = options.type;
        }
        if (options?.closeBtnName) {
          returnState.closeBtnName = options.closeBtnName;
        }
        if (options?.okBtnName) {
          returnState.okBtnName = options.okBtnName;
        }
        if (options?.onLeftFn) {
          returnState.onLeftFn = options.onLeftFn;
        }
        if (options?.onRightFn) {
          returnState.onRightFn = options.onRightFn;
        }
        return returnState;
      });
    },
    [],
  );

  const closeOneBtnModal = useCallback(() => {
    setOneBtnModalState((prev) => ({
      ...prev,
      isOpenModal: false,
    }));

    if (oneBtnModalState.targetRef) {
      oneBtnModalState.targetRef.focus();
    }
  }, [oneBtnModalState]);

  const closeTwoBtnModal = useCallback(() => {
    setTwoBtnModalState((prev) => ({
      ...prev,
      isOpenModal: false,
      closeBtnName: undefined,
      okBtnName: undefined,
      onLeftFn: undefined,
      onRightFn: () => {},
    }));
  }, []);

  const { mutate: addAlcohol } = useMutation({
    mutationFn: (data: FormData) => AlcoholAPI.addAlcohol(data),
    onSuccess: () => {
      closeTwoBtnModal();
      invalidateAlcohol();
      invalidateFn && invalidateFn();

      setTimeout(() => {
        openTwoBtnModal(TextConstants.SUC_ADD, {
          closeBtnName: '계속 추가',
          okBtnName: '홈으로',
          onLeftFn: addAnotherOne,
          onRightFn: goHome,
        });
      }, 200);
    },
    onError: (err) => {
      openOneBtnModal(TextConstants.FAIL_ADD, null);
    },
  });

  const validateForm = useCallback(() => {
    const { alcoholNmRef, descriptionRef, categoryNmRef, volRef } = refObj.current;
    if (!alcoholNmRef?.value) {
      openOneBtnModal('술 이름을 입력해주세요', alcoholNmRef);
      return false;
    }

    if (!categoryNmRef?.value) {
      openOneBtnModal('카테고리를 선택해주세요', categoryNmRef);
      return false;
    }

    if (!volRef?.value) {
      openOneBtnModal('도수를 입력해주세요', volRef);
      return false;
    }

    if (!descriptionRef?.value) {
      openOneBtnModal('설명을 입력해주세요', descriptionRef);
      return false;
    }

    return true;
  }, [refObj, openOneBtnModal]);

  // 최종 api 실행
  const onSubmit = useCallback(() => {
    const data = getFormDataByRefObj(refObj);
    addAlcohol(data);
  }, [addAlcohol, refObj, getFormDataByRefObj]);

  const handleClickSave = useCallback(() => {
    if (validateForm()) {
      openTwoBtnModal(TextConstants.ASK_ADD, { onRightFn: onSubmit });
    }
  }, [validateForm, openTwoBtnModal, onSubmit]);

  // 술 추가 완료 후 '홈으로'
  const goHome = useCallback(() => {
    closeTwoBtnModal();
    closeAddAlcohol();
    navigate('/admin', { replace: true });
  }, [navigate, closeTwoBtnModal, closeAddAlcohol]);

  // 술 추가 완료 후 '계속 추가'
  const addAnotherOne = useCallback(() => {
    closeTwoBtnModal();
    resetRefs(refObj);
  }, [refObj, resetRefs, closeTwoBtnModal]);

  const openCautionModal = useCallback(() => {
    openTwoBtnModal(TextConstants.CAUTION, { onRightFn: goHome });
  }, [openTwoBtnModal, goHome]);

  return (
    <AddLayout ref={ref} headerText="술 등록" onClose={openCautionModal} onSave={handleClickSave}>
      <div className="p-4">
        <AlcoholForm ref={refObj} />
      </div>
      <TwoBtnsModal
        isOpen={twoBtnModalState.isOpenModal}
        content={twoBtnModalState.content}
        onClose={closeTwoBtnModal}
        onLeftFn={twoBtnModalState.onLeftFn || closeTwoBtnModal}
        onRightFn={twoBtnModalState.onRightFn || onSubmit}
        closeBtnName={twoBtnModalState.closeBtnName}
        okBtnName={twoBtnModalState.okBtnName}
      />
      <OneBtnModal
        isOpen={oneBtnModalState.isOpenModal}
        content={oneBtnModalState.content}
        onClose={closeOneBtnModal}
      />
    </AddLayout>
  );
});

export default AddAlcohol;
