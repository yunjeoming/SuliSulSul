import { FC, memo, useCallback, useRef, useState } from 'react';
import IconButton from '../IconButton';
import { AiOutlineEdit } from 'react-icons/ai';
import StarsWithGrade from '../Stars/StarsWithGrade';
import { Review } from '../../types/alcohol';
import { useMutation } from '@tanstack/react-query';
import ReviewAPI from '../../api/review';
import OneBtnModal from '../Modal/OneBtnModal';
import ReviewPassword from './ReviewPassword';
import ReviewEditForm from './ReviewEditForm';
import { ModalStateType, ModalType } from '../../types/common';
import ReviewUtil from '../../utils/Review';

type Props = {
  review: Review;
  invalidateFn?: () => void;
};

const initModalState = {
  isOpen: false,
  content: '',
  type: null,
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
  const [oneBtnModalState, setOneBtnModalState] = useState<ModalStateType>(initModalState);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClickShowPasswordInput = useCallback(() => {
    setEditState((prev) => ({ ...prev, showPasswordInput: !prev.showPasswordInput }));
  }, []);

  const updateInitPasswordRef = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.value = '';
    }
  }, [passwordRef]);

  const updateInitState = useCallback(() => {
    invalidateFn && invalidateFn();
    setEditState(initEditState);
    updateInitPasswordRef();
  }, [invalidateFn, updateInitPasswordRef]);

  const closeOneBtnModal = useCallback(() => {
    setOneBtnModalState(initModalState);

    if (oneBtnModalState.type === 'password') {
      updateInitPasswordRef();
      if (passwordRef.current) passwordRef.current.focus();
    }
  }, [oneBtnModalState, updateInitPasswordRef]);

  const openOneBtnModal = useCallback((content: string, type: ModalType) => {
    setOneBtnModalState((prev) => ({ ...prev, content, isOpen: true, type }));
  }, []);

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
        openOneBtnModal('비밀번호가 일치하지 않아요', 'password');
      }
    },
  });

  return (
    <li className="px-1 py-3 border-b">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <StarsWithGrade grade={review.grade} />
          <div className="text-xs text-stone-500 flex gap-2">
            <span>{review.userNm || 'Anonymous'}</span>
            <span>{ReviewUtil.getReviewDate(review.regDt)}</span>
          </div>
        </div>
        <div className="flex text-stone-400">
          <IconButton styles="p-1 hover:text-stone-700" onClick={handleClickShowPasswordInput} disabled={isEditMode}>
            <AiOutlineEdit />
          </IconButton>
        </div>
      </div>
      {isEditMode ? (
        <ReviewEditForm openOneBtnModal={openOneBtnModal} review={review} updateInitState={updateInitState} />
      ) : (
        <>
          <div className="font-bold mb-2">{review.title}</div>
          <div className="text-sm">{review.content}</div>
        </>
      )}
      <ReviewPassword isShow={showPasswordInput} checkPassword={checkPassword} ref={passwordRef} />
      <OneBtnModal isOpen={oneBtnModalState.isOpen} content={oneBtnModalState.content} onClose={closeOneBtnModal} />
    </li>
  );
};

export default memo(ReviewItem);
