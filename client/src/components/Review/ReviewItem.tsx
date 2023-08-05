import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import IconButton from '../IconButton';
import { AiOutlineEdit } from 'react-icons/ai';
import StarsWithGrade from '../Stars/StarsWithGrade';
import DynamicStars from '../Stars/DynamicStars';
import { Review } from '../../types/alcohol';
import { useMutation } from '@tanstack/react-query';
import ReviewAPI from '../../api/review';
import TwoBtnsModal from '../Modal/TwoBtnsModal';
import useModal from '../../hooks/useModal';
import OneBtnModal from '../Modal/OneBtnModal';
import ReviewPassword from './ReviewPassword';

type Props = {
  review: Review;
  invalidateFn?: () => void;
};

const initEditState = {
  showPasswordInput: false,
  isEditMode: false,
};

const ReviewItem: FC<Props> = ({ review, invalidateFn }) => {
  const [editState, setEditState] = useState<{
    showPasswordInput: boolean;
    isEditMode: boolean;
  }>(initEditState);
  const { showPasswordInput, isEditMode } = editState;
  const {
    modal: { content, isOpenModal: isOpenSucModal },
    onCloseModal,
    setModal,
    updateInitModalState,
  } = useModal();

  const [isOpenFailModal, setIsOpenFailModal] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const gradeRef = useRef<HTMLSpanElement | null>(null);

  const handleClickShowPasswordInput = useCallback(() => {
    setEditState((prev) => ({ ...prev, showPasswordInput: !prev.showPasswordInput }));
  }, []);

  const handleClickEditModeBtn = useCallback(
    (targetMode: string) => {
      const content = `${targetMode} 하시겠습니까?`;
      setModal((prev) => ({ ...prev, content, isOpenModal: true }));
    },
    [setModal],
  );

  const updateInitPasswordRef = () => {
    if (passwordRef.current) {
      passwordRef.current.value = '';
    }
  };

  const updateInitState = () => {
    invalidateFn && invalidateFn();
    setEditState(initEditState);
    updateInitModalState();
    updateInitPasswordRef();
  };

  const { mutate: checkPassword } = useMutation({
    mutationFn: () => {
      const reviewPwd = passwordRef.current?.value!;

      const data = new FormData();
      data.append('reviewPwd', reviewPwd);
      data.append('reviewNo', review.reviewNo.toString());

      return ReviewAPI.checkPassword(data);
    },
    onSuccess: (data) => {
      if (data === 'SUC') {
        setEditState((prev) => ({ ...prev, showPasswordInput: false, isEditMode: true }));
      } else {
        setIsOpenFailModal(true);
      }
    },
  });

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

      return ReviewAPI.updateReview(data);
    },
    onSuccess: (data) => {
      if (data === 'SUC') {
        updateInitState();
      }
    },
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: () => {
      const reviewPwd = passwordRef.current?.value!;
      const data = new FormData();
      data.append('reviewPwd', reviewPwd);
      data.append('userNm', review.userNm);
      data.append('reviewNo', review.reviewNo.toString());

      return ReviewAPI.deleteReview(data);
    },
    onSuccess: (data) => {
      if (data === 'SUC') {
        updateInitState();
      }
    },
  });

  const handleClickRequestBtn = useCallback(() => {
    if (content.startsWith('수정')) {
      editReview();
      return;
    }

    if (content.startsWith('삭제')) {
      deleteReview();
      return;
    }
  }, [content, deleteReview, editReview]);

  const convertTextToInput = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.value = review.title;
    }

    if (contentRef.current) {
      contentRef.current.value = review.content || '';
    }
  }, [review]);

  useEffect(() => {
    if (isEditMode) {
      convertTextToInput();
    }
  }, [isEditMode, convertTextToInput]);

  return (
    <li className="px-1 py-3 border-b">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <StarsWithGrade grade={review.grade} />
          <span className="text-sm text-stone-600">{review.userNm}</span>
        </div>
        <div className="flex text-stone-400">
          <IconButton styles="p-1 hover:text-stone-700" onClick={handleClickShowPasswordInput} disabled={isEditMode}>
            <AiOutlineEdit />
          </IconButton>
        </div>
      </div>
      {isEditMode ? (
        <div className="border border-dashed p-2">
          <div className="flex flex-col items-center mb-4">
            <DynamicStars selectedGrade={review.grade} gradeRef={gradeRef} />
          </div>
          <input className="w-full p-2 mb-2" placeholder="제목" ref={titleRef} />
          <textarea className="w-full p-2" placeholder="내용" rows={5} ref={contentRef} />
          <div className="flex items-center justify-between mt-2 text-sm">
            <button
              className="text-white bg-red-600 border px-4 py-2 mr-2"
              onClick={() => handleClickEditModeBtn('삭제')}
            >
              삭제
            </button>
            <div>
              <button className="border px-4 py-2 mr-2" onClick={updateInitState}>
                취소
              </button>
              <button className="border px-4 py-2" onClick={() => handleClickEditModeBtn('수정')}>
                수정
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="font-bold mb-2">{review.title}</div>
          <div className="text-sm">{review.content}</div>
        </>
      )}
      <ReviewPassword isShow={showPasswordInput} checkPassword={checkPassword} ref={passwordRef} />
      <TwoBtnsModal
        isOpen={isOpenSucModal}
        content={content}
        onClose={onCloseModal}
        onLeftFn={onCloseModal}
        onRightFn={handleClickRequestBtn}
      />
      <OneBtnModal
        isOpen={isOpenFailModal}
        content="비밀번호가 일치하지 않습니다."
        onClose={() => {
          setIsOpenFailModal(false);
          updateInitPasswordRef();
          if (passwordRef.current) passwordRef.current.focus();
        }}
      />
    </li>
  );
};

export default memo(ReviewItem);
