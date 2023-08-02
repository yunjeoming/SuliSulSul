import React, { FormEvent, useCallback, useEffect } from 'react';
import AlcoholForm from './AlcoholForm';
import { useNavigate } from 'react-router-dom';
import useAlcoholFormRef from '../../hooks/useAlcoholFormRef';
import useModal from '../../hooks/useModal';
import { Alcohol } from '../../types/alcohol';
import { Styles } from '../../constants/Styles';
import { useMutation } from '@tanstack/react-query';
import AlcoholAPI from '../../api/alcohol';
import OneBtnModal from '../Modal/OneBtnModal';
import TwoBtnsModal from '../Modal/TwoBtnsModal';

type Props = {
  alcohol: Alcohol;
};

const AlcoholEditForm: React.FC<Props> = ({ alcohol }) => {
  const navigate = useNavigate();
  const { refObj, getFormDataByRefObj } = useAlcoholFormRef();
  const { modal, setModal, onCloseModal } = useModal();
  const { content, isOpenModal, showOneBtn } = modal;

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
      content: `해당 내용을 수정하시겠습니까?`,
      isOpenModal: true,
      showOneBtn: false,
      targetRef: null,
    }));
  }, [setModal, refObj]);

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
      setModal((state) => ({
        ...state,
        content: '내용을 수정했습니다.',
        showOneBtn: true,
        isOpenModal: true,
        targetRef: null,
      }));
    },
  });

  // 최종 api 실행
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const data = getFormDataByRefObj(refObj);
      updateAlcohol(data);
      onCloseModal();
    },
    [onCloseModal, updateAlcohol, refObj, getFormDataByRefObj],
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
          <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={handleClickCancel}>
            취소
          </button>
          <button type="button" className={`${Styles.BUTTON_DEFAULT}`} onClick={handleClickSave}>
            확인
          </button>
        </div>
      )}
      {showOneBtn ? (
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
    </>
  );
};

export default AlcoholEditForm;
