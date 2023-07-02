import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import IconButton from '../IconButton';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import StarsWithGrade from '../Stars/StarsWithGrade';
import DynamicStars from '../Stars/DynamicStars';
import Modal from '../Modal';
import { Review } from '../../types/alcohol';
import { useMutation } from '@tanstack/react-query';
import API from '../../api';

type Props = {
  review: Review;
};

const ReviewItem: FC<Props> = ({ review }) => {
  const [state, setState] = useState<{
    targetMode: '' | 'edit' | 'delete';
    isOpenPasswordInput: boolean;
    isEdit: boolean;
    isOpenModalDeleteReview: boolean;
  }>({
    targetMode: '',
    isOpenPasswordInput: false,
    isEdit: false,
    isOpenModalDeleteReview: false,
  });
  const { targetMode, isOpenPasswordInput, isEdit, isOpenModalDeleteReview } = state;

  const passwordRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const gradeRef = useRef<HTMLSpanElement | null>(null);

  const handleClickShowPasswordInput = useCallback((targetMode: 'edit' | 'delete') => {
    setState((prev) => {
      if (!prev.targetMode)
        return {
          ...prev,
          isOpenPasswordInput: true,
          targetMode,
        };

      const isSameMode = prev.targetMode === targetMode;
      const isShowingPasswordInput = prev.isOpenPasswordInput;

      return isSameMode
        ? isShowingPasswordInput
          ? { ...prev, isOpenPasswordInput: false }
          : { ...prev, isOpenPasswordInput: true }
        : { ...prev, isOpenPasswordInput: true, targetMode };
    });
  }, []);

  const changeEditMode = useCallback(() => {
    setState((prev) => ({ ...prev, isOpenPasswordInput: false, isEdit: true }));
  }, []);

  const showDeleteReviewModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpenModalDeleteReview: true,
    }));
  }, []);

  const checkPassword = useCallback(() => {
    if (!passwordRef.current || !passwordRef.current.value) return;

    // 삭제 모드
    if (targetMode === 'delete') showDeleteReviewModal();

    // 수정 모드
    if (targetMode === 'edit') changeEditMode();
  }, [targetMode, passwordRef, showDeleteReviewModal, changeEditMode]);

  const cancelEditMode = useCallback(() => {
    setState((prev) => ({ ...prev, isOpenPasswordInput: false, isEdit: false }));
  }, []);

  const initState = () => {
    // 리뷰 수정 / 삭제 성공 시 state 초기화
    setState((prev) => ({ ...prev, targetMode: '', isOpenPasswordInput: false, isEdit: false }));

    // pwd ref 초기화
    if (passwordRef.current) {
      passwordRef.current.value = '';
    }
  };

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpenModalDeleteReview: false,
    }));
  }, []);

  const { mutate: editReview } = useMutation({
    mutationFn: () => {
      const grade = gradeRef.current?.textContent?.split('점')[0]!;
      const title = titleRef.current?.value!;
      const content = contentRef.current?.value!;
      const reviewPwd = passwordRef.current?.value!;

      const data = new FormData();
      data.append('title', title);
      data.append('grade', grade);
      data.append('content', content);
      data.append('reviewPwd', reviewPwd);
      data.append('userNm', review.userNm);
      data.append('reviewNo', review.reviewNo.toString());

      return API.updateReview(data);
    },
    onSuccess: () => {
      console.log('reviewItem.tsx 수정 api');

      // 수정 모드 -> 일반 모드로 변경
      initState();
    },
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: () => {
      const reviewPwd = passwordRef.current?.value!;
      const data = new FormData();
      data.append('reviewPwd', reviewPwd);
      data.append('userNm', review.userNm);
      data.append('reviewNo', review.reviewNo.toString());

      return API.updateReview(data);
    },
    onSuccess: () => {
      console.log('reviewItem.tsx 삭제 api');

      // 모달 닫고, 패스워드 인풋 지우기
      closeModal();
      initState();
    },
  });

  const convertTextToInput = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.value = review.title;
    }

    if (contentRef.current) {
      contentRef.current.value = review.content || '';
    }
  }, [review]);

  useEffect(() => {
    if (isEdit) {
      convertTextToInput();
    }
  }, [isEdit, convertTextToInput]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <StarsWithGrade grade={review.grade} />
          <span className="text-sm text-stone-600">{review.userNm}</span>
        </div>
        <div className="flex text-stone-400">
          <IconButton
            styles="p-1 hover:text-stone-700"
            onClick={() => handleClickShowPasswordInput('edit')}
            disabled={isEdit}
          >
            <AiOutlineEdit />
          </IconButton>
          <IconButton
            styles="p-1 hover:text-stone-700"
            onClick={() => handleClickShowPasswordInput('delete')}
            disabled={isEdit}
          >
            <AiOutlineCloseSquare />
          </IconButton>
        </div>
      </div>
      {isEdit ? (
        <div className="border border-dashed p-2">
          <div className="flex flex-col items-center mb-4">
            <DynamicStars selectedGrade={review.grade} gradeRef={gradeRef} />
          </div>
          <input className="w-full p-2 mb-2" placeholder="제목" ref={titleRef} />
          <textarea className="w-full p-2" placeholder="내용" rows={5} ref={contentRef} />
          <div className="flex items-center justify-end mt-2">
            <button className="border px-4 py-2 mr-2" onClick={cancelEditMode}>
              취소
            </button>
            <button className="border px-4 py-2" onClick={() => editReview()}>
              확인
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="font-bold mb-2">{review.title}</div>
          <div>{review.content}</div>
        </>
      )}
      {isOpenPasswordInput && (
        <div className="flex items-center mt-4 text-sm">
          <input
            type="password"
            className="flex-grow p-2 mr-2"
            placeholder="비밀번호를 입력해주세요"
            ref={passwordRef}
          />
          <button className="border px-4 py-2" onClick={checkPassword}>
            확인
          </button>
        </div>
      )}
      {isOpenModalDeleteReview && (
        <Modal onClose={closeModal} hasCloseBtn>
          <>
            <div className="px-6 py-6">리뷰를 삭제하시겠습니까?</div>
            <div className="w-full flex justify-end border-t">
              <button className="p-2 w-1/2 border-r" onClick={closeModal}>
                취소
              </button>
              <button className="p-2 w-1/2" onClick={() => deleteReview()}>
                확인
              </button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default ReviewItem;
