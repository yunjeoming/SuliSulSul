import { FC, useCallback, useEffect, useRef, useState } from 'react';
import DynamicStars from '../Stars/DynamicStars';
import { Review } from '../../types/alcohol';
import { useMutation } from '@tanstack/react-query';
import ReviewAPI from '../../api/review';
import TwoBtnsModal from '../Modal/TwoBtnsModal';
import { ModalStateType, ModalType } from '../../types/common';

type Props = {
  review: Review;
  updateInitState: () => void;
  openOneBtnModal: (content: string, type: ModalType) => void;
};

const initModalState = {
  isOpen: false,
  content: '',
  type: null,
};

const ReviewEditForm: FC<Props> = ({ review, updateInitState, openOneBtnModal }) => {
  const [modalState, setModalState] = useState<ModalStateType>(initModalState);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const gradeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = review.title;
    }
    if (contentRef.current) {
      contentRef.current.value = review.content || '';
    }
  }, [review]);

  const openModal = useCallback((content: string, type: ModalType) => {
    setModalState((prev) => ({ ...prev, content, isOpen: true, type }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState(initModalState);
  }, []);

  const handleClickTypeBtn = useCallback(
    (type: 'edit' | 'delete') => {
      if (type === 'delete') {
        openModal('삭제 하시겠어요?', 'delete');
      }
      if (type === 'edit') {
        openModal('수정 하시겠어요?', 'edit');
      }
    },
    [openModal],
  );

  const { mutate: editReview } = useMutation({
    mutationFn: () => {
      const grade = gradeRef.current?.textContent?.split('점')[0]!;
      const title = titleRef.current?.value!;
      const content = contentRef.current?.value!;

      const data = new FormData();
      data.append('title', title);
      data.append('grade', grade);
      data.append('content', content);
      data.append('reviewNo', review.reviewNo.toString());

      return ReviewAPI.updateReview(data);
    },
    onSuccess: (data) => {
      if (data === 'SUC') {
        updateInitState();
      } else {
        openOneBtnModal('수정에 실패했어요 \n\n ⚠️ 이모티콘은 등록이 되지 않아요 ⚠️', 'fail');
      }
      closeModal();
    },
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: () => {
      const data = new FormData();
      data.append('reviewNo', review.reviewNo.toString());
      return ReviewAPI.deleteReview(data);
    },
    onSuccess: (data) => {
      if (data === 'SUC') {
        updateInitState();
      } else {
        openOneBtnModal('삭제에 실패했어요 \n 잠시 후 다시 시도해주세요', 'fail');
      }
      closeModal();
    },
  });

  const handleClickRequestBtn = useCallback(() => {
    if (modalState.type === 'delete') {
      deleteReview();
    }

    if (modalState.type === 'edit') {
      editReview();
    }
  }, [deleteReview, editReview, modalState]);

  return (
    <div className="border border-dashed p-2">
      <div className="flex flex-col items-center mb-4">
        <DynamicStars selectedGrade={review.grade} gradeRef={gradeRef} />
      </div>
      <input className="w-full p-2 mb-2" placeholder="제목" ref={titleRef} />
      <textarea className="w-full p-2" placeholder="내용" rows={5} ref={contentRef} />
      <div className="flex items-center justify-between mt-2 text-sm">
        <button className="text-white bg-red-600 border px-4 py-2 mr-2" onClick={() => handleClickTypeBtn('delete')}>
          삭제
        </button>
        <div>
          <button className="border px-4 py-2 mr-2" onClick={updateInitState}>
            취소
          </button>
          <button className="border px-4 py-2" onClick={() => handleClickTypeBtn('edit')}>
            수정
          </button>
        </div>
      </div>
      <TwoBtnsModal
        isOpen={modalState.isOpen}
        content={modalState.content}
        onClose={closeModal}
        onLeftFn={closeModal}
        onRightFn={handleClickRequestBtn}
      />
    </div>
  );
};

export default ReviewEditForm;