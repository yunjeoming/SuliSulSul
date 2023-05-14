import React, { useCallback, useRef, useState } from 'react';
import AlcoholListItem from '../../components/AlcoholListItem';
import { MockAlcoholsType } from '../../types/mockAlcohols';
// import axios from 'axios';
import DynamicStars from '../../components/DynamicStars';
import Modal from '../../components/Modal';
import AddLayout from '../../layout/AddLayout';

type Props = {
  alcohol: MockAlcoholsType;
  onClose: () => void;
  getReviews: () => void;
};

const AddReview = ({ alcohol, onClose, getReviews }: Props) => {
  const gradeRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const userNmRef = useRef<HTMLInputElement | null>(null);
  const reviewPwdRef = useRef<HTMLInputElement | null>(null);

  const [modal, setModal] = useState<{
    content: string;
    isOpenModal: boolean;
    targetRef: React.RefObject<HTMLElement> | null;
  }>({
    content: '',
    isOpenModal: false,
    targetRef: null
  });

  const { content, isOpenModal, targetRef } = modal;

  const handleClickSave = () => {
    if (!gradeRef.current?.textContent) {
      setModal({
        ...modal,
        content: '별점을 선택해주세요',
        isOpenModal: true,
        targetRef: gradeRef,
      });
      return;
    }

    if (!titleRef.current?.value) {
      setModal({
        content: '제목을 입력해주세요',
        isOpenModal: true,
        targetRef: titleRef,
      });
      return;
    }

    if (!contentRef.current?.value) {
      setModal({
        content: '내용을 입력해주세요',
        isOpenModal: true,
        targetRef: contentRef,
      });
      return;
    }

    if (!userNmRef.current?.value) {
      setModal({
        content: '작성자를 입력해주세요',
        isOpenModal: true,
        targetRef: userNmRef,
      });
      return;
    }

    if (userNmRef.current?.value.length > 10) {
      setModal({
        content: '작성자는 최대 10자까지 입력해주세요',
        isOpenModal: true,
        targetRef: userNmRef,
      });
      return;
    }

    if (!reviewPwdRef.current?.value) {
      setModal({
        content: '비밀번호를 입력해주세요',
        isOpenModal: true,
        targetRef: reviewPwdRef,
      });
      return;
    }

    console.log(gradeRef.current?.textContent);

    // addReview();

    // onClose();
    // getReviews();
  };

  const onCloseModal = useCallback(() => {
    setModal((state) => ({
      ...state,
      isOpenModal: false,
      targetRef: null
    }));

    if (targetRef?.current) {
      targetRef.current.focus();
    }
  }, [targetRef]);

  // const addReview = () => {
  //   const grade = gradeRef.current?.textContent?.split('점')[0];
  //   const title = titleRef.current?.value;
  //   const content = contentRef.current?.value;
  //   const userNm = userNmRef.current?.value;
  //   const reviewPwd = reviewPwdRef.current?.value;
  //   console.log('grade', grade);
  //   console.log('title', title);
  //   console.log('content', content);
  //   console.log('userNm', userNm);
  //   console.log('reviewPwd', reviewPwd);

  //   axios
  //     .post(`/`, {
  //       grade,
  //       title,
  //       content,
  //       userNm,
  //       reviewPwd
  //     })
  //     .then((res) => {
  //       // status code 200일때 redirect. 실패하면 alert 다시 띄우기
  //       console.log(res);
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <>
      <AddLayout headerText="리뷰작성" onClose={onClose} onSave={handleClickSave}>
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
      {isOpenModal && (
        <Modal onClose={onCloseModal}>
          <div className="p-4">{content}</div>
          <button className="w-full border rounded-md py-1 hover:bg-gray-200" onClick={onCloseModal}>
            확인
          </button>
        </Modal>
      )}
    </>
  );
};

export default AddReview;
