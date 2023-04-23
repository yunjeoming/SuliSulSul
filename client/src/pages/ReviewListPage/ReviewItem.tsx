import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import IconButton from '../../components/IconButton';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import StarsWithGrade from '../../components/StarsWithGrade';
import { MockReviewType } from '../../types/mockAlcohols';
import axios from 'axios';
import DynamicStars from '../../components/DynamicStars';
import Modal from '../../components/Modal';

type Props = {
  review: MockReviewType;
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
  const { isOpenPasswordInput, isEdit, isOpenModalDeleteReview } = state;

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

  // useEffect(() => {
  //   console.log({ targetMode, isOpenPasswordInput, isEdit });
  // }, [targetMode, isOpenPasswordInput, isEdit]);

  const checkPassword = useCallback(() => {
    if (!passwordRef.current || !passwordRef.current.value) return;

    // 삭제
    showDeleteReviewModal();

    // 수정
    // changeEditMode();

    // axios
    //   .post(``)
    //   .then((res) => {
    //     // 비밀번호 일치시
    //     // 수정 -> text -> textarea로
    //     // 삭제 -> 삭제 alert
    //     if (targetMode === 'edit') changeEditMode();
    //     if (targetMode === 'delete') showDeleteReviewModal();
    //   })
    //   .catch((err) => console.dir(err));
  }, []);

  const changeEditMode = useCallback(() => {
    setState((prev) => ({ ...prev, isOpenPasswordInput: false, isEdit: true }));
    // text -> textarea
  }, []);

  const showDeleteReviewModal = useCallback(() => {
    setState((prev) => ({ ...prev, isOpenPasswordInput: false }));
    // 삭제 alert
    setState((prev) => ({
      ...prev,
      isOpenModalDeleteReview: true,
    }));
  }, []);

  const cancelEditMode = useCallback(() => {
    setState((prev) => ({ ...prev, isOpenPasswordInput: false, isEdit: false }));
  }, []);

  const handleClickEditReview = useCallback(() => {
    // 리뷰수정
    const grade = gradeRef.current?.textContent?.split('점')[0];
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    console.log('grade', grade);
    console.log('title', title);
    console.log('content', content);
    // axios
    //   .post('')
    //   .then((res) => {
    //     //
    //   })
    //   .catch((err) => console.dir(err));
  }, []);

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      isOpenModalDeleteReview: false,
    }));
  };

  useEffect(() => {
    if (!isEdit) return;

    if (titleRef.current) {
      titleRef.current.value = review.title;
    }

    if (contentRef.current) {
      contentRef.current.value = review.content || '';
    }
  }, [isEdit, review]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <StarsWithGrade grade={review.grade} />
          <span className="text-sm text-stone-600">{review.userName}</span>
        </div>
        <div className="flex text-stone-400">
          <IconButton styles="p-1 hover:text-stone-700" onClick={() => handleClickShowPasswordInput('edit')}>
            <AiOutlineEdit />
          </IconButton>
          <IconButton styles="p-1 hover:text-stone-700" onClick={() => handleClickShowPasswordInput('delete')}>
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
            <button className="border px-4 py-2" onClick={handleClickEditReview}>
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
            <div className='px-6 py-6'>리뷰를 삭제하시겠습니까?</div>
            <div className="w-full flex justify-end border-t">
              <button className="p-2 w-1/2 border-r" onClick={closeModal}>
                취소
              </button>
              <button className="p-2 w-1/2" onClick={handleClickEditReview}>
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
