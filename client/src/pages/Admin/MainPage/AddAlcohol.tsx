import { FC, FormEvent, useCallback } from 'react';
import AddLayout from '../../../layout/AddLayout';
import AlcoholForm from '../../../components/Alcohol/AlcoholForm';
import { useNavigate } from 'react-router-dom';
import useAlcoholFormRef from '../../../hooks/useAlcoholFormRef';
import useModal from '../../../hooks/useModal';
import { useMutation } from '@tanstack/react-query';
import AlcoholAPI from '../../../api/alcohol';
import TwoBtnsModal from '../../../components/Modal/TwoBtnsModal';
import OneBtnModal from '../../../components/Modal/OneBtnModal';
import useInvalidateAlcohol from '../../../hooks/useInvalidateAlcohol';
import useCautionModal from '../../../hooks/useCautionModal';

type Props = {
  onClose: () => void;
};

const AddAlcohol: FC<Props> = ({ onClose: closeAddAlcohol }) => {
  const navigate = useNavigate();
  const { cautionContent, closeCautionModal, isOpenCaution, openCautionModal } = useCautionModal();
  const { modal, setModal, initModalState, onCloseModal } = useModal();
  const { refObj, resetRefs, getFormDataByRefObj } = useAlcoholFormRef();
  const { content, isOpenModal, showOneBtn, isAdded } = modal;
  const { invalidateAlcohol } = useInvalidateAlcohol();

  const { mutate: addAlcohol } = useMutation({
    mutationFn: (data: FormData) => AlcoholAPI.addAlcohol(data),
    onSuccess: () => {
      setModal((state) => ({
        ...state,
        content: '추가를 완료했습니다.',
        showOneBtn: true,
        isOpenModal: true,
        isAdded: true,
        targetRef: null,
      }));
    },
  });

  // 모달 열기
  const handleClickSave = useCallback(() => {
    const { alcoholNmRef, descriptionRef, categoryNmRef, volRef } = refObj.current;
    if (!alcoholNmRef?.value) {
      setModal((state) => ({
        ...state,
        content: '술 이름을 입력해주세요',
        isOpenModal: true,
        targetRef: alcoholNmRef,
      }));
      return;
    }

    if (!categoryNmRef?.value) {
      setModal((state) => ({
        ...state,
        content: '카테고리를 선택해주세요',
        isOpenModal: true,
        targetRef: categoryNmRef,
      }));
      return;
    }

    if (!volRef?.value) {
      setModal((state) => ({
        ...state,
        content: '도수를 입력해주세요',
        isOpenModal: true,
        targetRef: volRef,
      }));
      return;
    }

    if (!descriptionRef?.value) {
      setModal((state) => ({
        ...state,
        content: '설명을 입력해주세요',
        isOpenModal: true,
        targetRef: descriptionRef,
      }));
      return;
    }

    setModal((state) => ({
      ...state,
      content: `해당 내용을 등록하시겠습니까?`,
      isOpenModal: true,
      showOneBtn: false,
      targetRef: null,
    }));
  }, [setModal, refObj]);

  // 최종 api 실행
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const data = getFormDataByRefObj(refObj);
      addAlcohol(data);
      onCloseModal();
    },
    [onCloseModal, addAlcohol, refObj, getFormDataByRefObj],
  );

  // 술 추가 완료 후 '홈으로'
  const goHome = useCallback(() => {
    onCloseModal();
    closeAddAlcohol();

    // 메인 새로 불러오기
    invalidateAlcohol();
    navigate('/admin', { replace: true });
  }, [navigate, onCloseModal, closeAddAlcohol, invalidateAlcohol]);

  // 술 추가 완료 후 '계속 추가'
  const addAnotherOne = useCallback(() => {
    setModal(initModalState);
    onCloseModal();
    resetRefs(refObj);
  }, [onCloseModal, initModalState, refObj, setModal, resetRefs]);

  return (
    <AddLayout headerText="술 등록" onClose={openCautionModal} onSave={handleClickSave}>
      <div className="p-4">
        <AlcoholForm ref={refObj} />
        {isAdded ? (
          <TwoBtnsModal
            isOpen={isOpenModal}
            content={content}
            onClose={onCloseModal}
            onLeftFn={addAnotherOne}
            onRightFn={goHome}
            closeBtnName="계속 추가"
            okBtnName="홈으로"
          />
        ) : showOneBtn ? (
          <OneBtnModal isOpen={isOpenModal} content={content} onClose={onCloseModal} />
        ) : (
          <TwoBtnsModal
            isOpen={isOpenModal}
            content={content}
            onClose={onCloseModal}
            onLeftFn={onCloseModal}
            onRightFn={onSubmit}
          />
        )}
      </div>
      <TwoBtnsModal
        isOpen={isOpenCaution}
        content={cautionContent}
        onClose={closeCautionModal}
        onLeftFn={closeCautionModal}
        onRightFn={closeAddAlcohol}
      />
    </AddLayout>
  );
};

export default AddAlcohol;
