import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
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

const AddReview = ({ alcohol, onClose: closeAddReview, invalidateFn }: Props) => {
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

  const { content, isOpenModal, targetRef } = modal;

  const handleClickSave = () => {
    if (!gradeRef.current?.textContent) {
      setModal((prevState) => ({
        ...prevState,
        content: '별점을 선택해주세요',
        isOpenModal: true,
        targetRef: gradeRef,
      }));
      return;
    }

    if (!titleRef.current?.value) {
      setModal((prevState) => ({
        ...prevState,
        content: '제목을 입력해주세요',
        isOpenModal: true,
        targetRef: titleRef,
      }));
      return;
    }

    if (!contentRef.current?.value) {
      setModal((prevState) => ({
        ...prevState,
        content: '내용을 입력해주세요',
        isOpenModal: true,
        targetRef: contentRef,
      }));
      return;
    }

    if (contentRef.current?.value.length > 100) {
      setModal((prevState) => ({
        ...prevState,
        content: '내용은 최대 100자까지 입력해주세요',
        isOpenModal: true,
        targetRef: contentRef,
      }));
      return;
    }

    if (!userNmRef.current?.value) {
      setModal((prevState) => ({
        ...prevState,
        content: '작성자를 입력해주세요',
        isOpenModal: true,
        targetRef: userNmRef,
      }));
      return;
    }

    if (userNmRef.current?.value.length > 10) {
      setModal((prevState) => ({
        ...prevState,
        content: '작성자는 최대 10자까지 입력해주세요',
        isOpenModal: true,
        targetRef: userNmRef,
      }));
      return;
    }

    if (!reviewPwdRef.current?.value) {
      setModal((prevState) => ({
        ...prevState,
        content: '비밀번호를 입력해주세요',
        isOpenModal: true,
        targetRef: reviewPwdRef,
      }));
      return;
    }

    addReview();
  };

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
        // onClose();
        // invalidateFn && invalidateFn();
        setModal((prevState) => ({
          ...prevState,
          content: '리뷰가 등록되었습니다.',
          isOpenModal: true,
          onCloseModal: closeModalBySuccess,
        }));
      } else {
        setModal((prevState) => ({
          ...prevState,
          content: '등록에 실패했어요',
          isOpenModal: true,
          targetRef: contentRef,
        }));
      }
    },
    onError: (err) => {
      console.error(err);
      setModal((prevState) => ({
        ...prevState,
        content: '등록에 실패했어요',
        isOpenModal: true,
        targetRef: contentRef,
      }));
    },
  });

  useEffect(() => {
    setModal((prevState) => ({
      ...prevState,
      onCloseModal: closeModalByDefault,
    }));
  }, [closeModalByDefault]);

  return (
    <>
      <AddLayout headerText="리뷰작성" onClose={openCautionModal} onSave={handleClickSave}>
        <div className="px-2 border-b mb-2">
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
      <OneBtnModal isOpen={isOpenModal} content={content} onClose={modal.onCloseModal} />
      <TwoBtnsModal
        isOpen={isOpenCaution}
        content={cautionContent}
        onClose={closeCautionModal}
        onLeftFn={closeCautionModal}
        onRightFn={closeAddReview}
      />
    </>
  );
};

export default AddReview;
