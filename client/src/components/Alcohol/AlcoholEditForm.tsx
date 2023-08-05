import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import AlcoholForm from './AlcoholForm';
import { useNavigate } from 'react-router-dom';
import useAlcoholFormRef from '../../hooks/useAlcoholFormRef';
import { Alcohol } from '../../types/alcohol';
import { StyleConstants } from '../../constants/style';
import { useMutation } from '@tanstack/react-query';
import AlcoholAPI from '../../api/alcohol';
import OneBtnModal from '../Modal/OneBtnModal';
import TwoBtnsModal from '../Modal/TwoBtnsModal';
import useInvalidateAlcohol from '../../hooks/useInvalidateAlcohol';
import { TextConstants } from '../../constants/text';

type Props = {
  alcohol: Alcohol;
  invalidateFn?: () => void;
};

const AlcoholEditForm: FC<Props> = ({ alcohol, invalidateFn }) => {
  const navigate = useNavigate();
  const { invalidateAlcohol } = useInvalidateAlcohol(['admin']);
  const { refObj, getFormDataByRefObj } = useAlcoholFormRef();
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
  }>({
    content: '',
    isOpenModal: false,
  });

  const openOneBtnModal = useCallback((content: string, targetRef: HTMLElement | null) => {
    setOneBtnModalState((prev) => ({
      ...prev,
      isOpenModal: true,
      content,
      targetRef,
    }));
  }, []);

  const closeOneBtnModal = useCallback(() => {
    setOneBtnModalState((prev) => ({
      ...prev,
      isOpenModal: false,
    }));
  }, []);

  const openTwoBtnModal = useCallback((content: string) => {
    setTwoBtnModalState((prev) => ({
      ...prev,
      isOpenModal: true,
      content,
    }));
  }, []);

  const closeTwoBtnModal = useCallback(() => {
    setTwoBtnModalState((prev) => ({
      ...prev,
      isOpenModal: false,
    }));
  }, []);

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

  const handleClickSave = useCallback(() => {
    if (validateForm()) {
      openTwoBtnModal(TextConstants.ASK_EDIT);
    }
  }, [validateForm, openTwoBtnModal]);

  const handleClickCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { mutate: updateAlcohol } = useMutation({
    mutationFn: (data: FormData) => {
      if (alcohol && alcohol.alcNo) {
        data.append('alcNo', alcohol.alcNo.toString());
      }
      return AlcoholAPI.updateAlcohol(data);
    },
    onSuccess: () => {
      openOneBtnModal(TextConstants.SUC_EDIT, null);
      invalidateAlcohol();
      invalidateFn && invalidateFn();
    },
    onError: (err) => {
      openOneBtnModal(TextConstants.FAIL_EDIT, null);
    },
  });

  // 최종 api 실행
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const data = getFormDataByRefObj(refObj);
      updateAlcohol(data);
      closeTwoBtnModal();
    },
    [closeTwoBtnModal, updateAlcohol, refObj, getFormDataByRefObj],
  );

  // 수정 시 alcohol 정보 넣기
  useEffect(() => {
    const { alcoholNmRef, descriptionRef, expRef, volRef } = refObj.current;
    if (alcoholNmRef && alcohol.alcNm) {
      alcoholNmRef.value = alcohol.alcNm;
    }

    if (descriptionRef && alcohol.detail) {
      descriptionRef.value = alcohol.detail;
    }

    if (expRef && alcohol.expYn) {
      expRef.value = alcohol.expYn.toString();
    }

    if (volRef && alcohol.vol) {
      volRef.value = alcohol.vol.toString();
    }
  }, [alcohol, refObj]);

  return (
    <>
      <AlcoholForm ref={refObj} selectedCategory={alcohol.cateNo.toString()} />
      {alcohol && (
        <div className="flex justify-end">
          <button type="button" className={`${StyleConstants.BUTTON_DEFAULT} mr-2`} onClick={handleClickCancel}>
            취소
          </button>
          <button type="button" className={`${StyleConstants.BUTTON_DEFAULT}`} onClick={handleClickSave}>
            확인
          </button>
        </div>
      )}
      <OneBtnModal
        isOpen={oneBtnModalState.isOpenModal}
        content={oneBtnModalState.content}
        onClose={closeOneBtnModal}
      />
      <TwoBtnsModal
        isOpen={twoBtnModalState.isOpenModal}
        content={twoBtnModalState.content}
        onClose={closeTwoBtnModal}
        onLeftFn={closeTwoBtnModal}
        onRightFn={handleSubmit}
      />
    </>
  );
};

export default AlcoholEditForm;
