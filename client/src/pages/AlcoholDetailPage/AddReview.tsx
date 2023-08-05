import { RefObject, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import AlcoholListItem from '../../components/Alcohol/AlcoholListItem';
import DynamicStars from '../../components/Stars/DynamicStars';
import AddLayout from '../../layout/AddLayout';
import { Alcohol } from '../../types/alcohol';
import { useMutation } from '@tanstack/react-query';
import ReviewAPI from '../../api/review';
import OneBtnModal from '../../components/Modal/OneBtnModal';
import useCautionModal from '../../hooks/useCautionModal';
import TwoBtnsModal from '../../components/Modal/TwoBtnsModal';

type Props = {
  alcohol: Alcohol;
  onClose: () => void;
  invalidateFn?: () => void;
};

const AddReview = forwardRef<HTMLDivElement, Props>(({ alcohol, onClose: closeAddReview, invalidateFn }, addRef) => {
  const { cautionContent, closeCautionModal, isOpenCaution, openCautionModal } = useCautionModal();
  const gradeRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const userNmRef = useRef<HTMLInputElement | null>(null);
  const reviewPwdRef = useRef<HTMLInputElement | null>(null);

  const [modal, setModal] = useState<{
    content: string;
    isOpenModal: boolean;
    targetRef: RefObject<HTMLElement> | null;
    onCloseModal: () => void;
  }>({
    content: '',
    isOpenModal: false,
    targetRef: null,
    onCloseModal: () => {},
  });

  const { content, isOpenModal, targetRef, onCloseModal } = modal;

  const openModal = useCallback(
    (content: string, targetRef: RefObject<HTMLElement> | null, onCloseModal?: () => void) => {
      setModal((prevState) => {
        const returnState = {
          ...prevState,
          isOpenModal: true,
          content,
          targetRef,
        };
        if (onCloseModal) {
          returnState.onCloseModal = onCloseModal;
        }

        return returnState;
      });
    },
    [],
  );

  const validateForm = useCallback(() => {
    if (!gradeRef.current?.textContent) {
      openModal('별점을 선택해주세요', gradeRef);
      return false;
    }

    if (!titleRef.current?.value) {
      openModal('제목을 입력해주세요', titleRef);
      return false;
    }

    if (!contentRef.current?.value) {
      openModal('내용을 입력해주세요', contentRef);
      return false;
    }

    if (contentRef.current?.value.length > 100) {
      openModal('내용은 최대 100자까지 입력해주세요', contentRef);
      return false;
    }

    if (!userNmRef.current?.value) {
      openModal('작성자를 입력해주세요', userNmRef);
      return false;
    }

    if (userNmRef.current?.value.length > 10) {
      openModal('작성자는 최대 10자까지 입력해주세요', userNmRef);
      return false;
    }

    if (!reviewPwdRef.current?.value) {
      openModal('비밀번호를 입력해주세요', reviewPwdRef);
      return false;
    }
    return true;
  }, [openModal]);

  const closeModalByDefault = useCallback(() => {
    setModal((prevState) => ({
      ...prevState,
      isOpenModal: false,
      targetRef: null,
    }));

    if (targetRef?.current) {
      targetRef.current.focus();
    }
  }, [targetRef]);

  const closeModalBySuccess = useCallback(() => {
    setModal((prevState) => ({
      ...prevState,
      isOpenModal: false,
      targetRef: null,
      onCloseModal: closeModalByDefault,
    }));

    closeAddReview();
    invalidateFn && invalidateFn();
  }, [closeModalByDefault, closeAddReview, invalidateFn]);

  const { mutate: addReview } = useMutation({
    mutationFn: () => {
      const grade = gradeRef.current?.textContent?.split('점')[0]!;
      const title = titleRef.current?.value!;
      const content = contentRef.current?.value!;
      const userNm = userNmRef.current?.value!;
      const reviewPwd = reviewPwdRef.current?.value!;

      const data = new FormData();
      data.append('alcNo', alcohol.alcNo!.toString());
      data.append('title', title);
      data.append('grade', grade);
      data.append('content', content);
      data.append('userNm', userNm);
      data.append('reviewPwd', reviewPwd);

      return ReviewAPI.addReview(data);
    },
    onSuccess: (data) => {
      if (data === 'SUC') {
        openModal('리뷰가 등록되었어요', null, closeModalBySuccess);
      } else {
        openModal('등록에 실패했어요 \n\n ⚠️ 이모티콘은 등록이 되지 않아요 ⚠️', contentRef);
      }
    },
    onError: (err) => {
      console.error(err);
      openModal('등록에 실패했어요 \n\n ⚠️ 이모티콘은 등록이 되지 않아요 ⚠️', contentRef);
    },
  });

  const handleClickSave = useCallback(() => {
    if (validateForm()) {
      addReview();
    }
  }, [validateForm, addReview]);

  useEffect(() => {
    setModal((prevState) => ({
      ...prevState,
      onCloseModal: closeModalByDefault,
    }));
  }, [closeModalByDefault]);

  return (
    <>
      <AddLayout ref={addRef} headerText="리뷰작성" onClose={openCautionModal} onSave={handleClickSave}>
        <div className="p-2 border-b mb-2">
          <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
        </div>
        <div className="flex-grow">
          <section className="flex flex-col items-center p-4 [&>*:not(:last-child)]:mb-2">
            <div>몇 점을 주시겠어요?</div>
            <DynamicStars gradeRef={gradeRef} />
          </section>
          <section className="flex flex-col items-center p-4 [&>*:not(:last-child)]:mb-2">
            <div>리뷰를 남겨주세요</div>
            <input className="w-full p-2" placeholder="제목" ref={titleRef} />
            <textarea className="w-full p-2" placeholder="내용" rows={5} ref={contentRef} />
          </section>
          <section className="flex flex-col items-center p-4 [&>*:not(:last-child)]:mb-2">
            <div>작성자 정보를 알려주세요</div>
            <div className="flex items-center justify-between">
              <input className="w-[58%] p-2" placeholder="작성자" ref={userNmRef} />
              <input className="w-2/5 p-2" placeholder="비밀번호" ref={reviewPwdRef} type="password" />
            </div>
          </section>
        </div>
      </AddLayout>
      <OneBtnModal isOpen={isOpenModal} content={content} onClose={onCloseModal} />
      <TwoBtnsModal
        isOpen={isOpenCaution}
        content={cautionContent}
        onClose={closeCautionModal}
        onLeftFn={closeCautionModal}
        onRightFn={closeAddReview}
      />
    </>
  );
});

export default AddReview;
