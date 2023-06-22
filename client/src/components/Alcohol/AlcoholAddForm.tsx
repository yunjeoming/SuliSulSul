import React, { FormEvent, useCallback, useEffect } from 'react';
import AlcoholForm from './AlcoholForm';
import useAlcoholFormRef from '../../hooks/useAlcoholFormRef';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import { Styles } from '../../constants/Styles';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import API from '../../api';

type Props = {
  onCancel: () => void;
  setSaveFunc: React.Dispatch<
    React.SetStateAction<{
      func: () => void;
    }>
  >;
};

const AlcoholAddForm: React.FC<Props> = ({ onCancel, setSaveFunc }) => {
  const navigate = useNavigate();
  const { refObj, resetRefs, getFormDataByRefObj } = useAlcoholFormRef();
  const { modal, setModal, initModalState, onCloseModal } = useModal();
  const { content, isOpenModal, showOneBtn, isAdded } = modal;

  const { mutate: addAlcohol } = useMutation({
    mutationFn: (data: FormData) => API.addAlcohol(data),
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
    onCancel();
    navigate('/admin', { replace: true });
    // 메인 새로 불러오기
  }, [navigate, onCloseModal, onCancel]);

  // 술 추가 완료 후 '계속 추가'
  const addAnotherOne = useCallback(() => {
    setModal(initModalState);
    onCloseModal();
    resetRefs(refObj);
  }, [onCloseModal, initModalState, refObj, setModal, resetRefs]);

  // 저장 함수 등록
  useEffect(() => {
    setSaveFunc && setSaveFunc(() => ({ func: handleClickSave }));
  }, [setSaveFunc, handleClickSave]);

  return (
    <>
      <AlcoholForm ref={refObj} />
      {isOpenModal && (
        <Modal onClose={onCloseModal}>
          <div className="p-4">{content}</div>
          {isAdded ? (
            // 술 추가 되었을 때
            <div className="flex">
              <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={addAnotherOne}>
                계속 추가
              </button>
              <button type="submit" className={`${Styles.BUTTON_DEFAULT}`} onClick={goHome}>
                홈으로
              </button>
            </div>
          ) : showOneBtn ? (
            // 확인 버튼만 보여줄 때
            <button className="w-full border rounded-md py-1 hover:bg-gray-200" onClick={onCloseModal}>
              확인
            </button>
          ) : (
            // 확인 & 취소 둘 다 보여줄 때
            <div className="flex">
              <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={onCloseModal}>
                취소
              </button>
              <button type="submit" className={`${Styles.BUTTON_DEFAULT}`} onClick={onSubmit}>
                확인
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default AlcoholAddForm;
