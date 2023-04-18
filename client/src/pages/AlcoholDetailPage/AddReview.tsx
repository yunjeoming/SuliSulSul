import React, { MouseEvent, useRef } from 'react';
import { Styles } from '../../constants/Styles';
import IconButton from '../../components/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import AlcoholListItem from '../../components/AlcoholListItem';
import { MockAlcoholsType } from '../../types/mockAlcohols';
import axios from 'axios';

type Props = {
  alcohol: MockAlcoholsType;
  onClose: () => void;
  getReviews: () => void;
};

const AddReview = ({ alcohol, onClose, getReviews }: Props) => {
  const baseRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const gradeRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const userNmRef = useRef<HTMLInputElement | null>(null);
  const reviewPwdRef = useRef<HTMLInputElement | null>(null);

  const clickSaveBtn = () => {
    if (!gradeRef.current?.textContent) {
      alert('별점을 선택해주세요!!');
      gradeRef.current?.focus();
      return;
    }

    if (!titleRef.current?.value) {
      alert('제목을 입력해주세요!!');
      titleRef.current?.focus();
      return;
    }

    if (!contentRef.current?.value) {
      alert('내용을 입력해주세요!!');
      contentRef.current?.focus();
      return;
    }

    if (!userNmRef.current?.value) {
      alert('작성자를 입력해주세요!!');
      userNmRef.current?.focus();
      return;
    }

    if (userNmRef.current?.value.length > 10) {
      alert('작성자는 최대 10자까지 입력해주세요!!');
      userNmRef.current?.focus();
      return;
    }

    if (!reviewPwdRef.current?.value) {
      alert('비밀번호를 입력해주세요!!');
      reviewPwdRef.current?.focus();
      return;
    }

    alert('임시 alert 창입니다. 리뷰 등록 완료되었습니다.')
    // addReview();

    onClose();
    getReviews();
  };

  const clickStar = (e: MouseEvent<HTMLDivElement>) => {
    if (!baseRef.current || !fillRef.current || !gradeRef.current) return;
    const baseWidth = baseRef.current.getBoundingClientRect().width;
    const offsetX = e.nativeEvent.offsetX;
    const stars = Math.ceil((offsetX / baseWidth) * 10) / 2;
    fillRef.current.style.width = `${(baseWidth / 5) * stars}px`;
    gradeRef.current.innerText = `${stars}점`;
  };

  const addReview = () => {
    const grade = gradeRef.current?.textContent?.split('점')[0];
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const userNm = userNmRef.current?.value;
    const reviewPwd = reviewPwdRef.current?.value;
    console.log('grade', grade);
    console.log('title', title);
    console.log('content', content);
    console.log('userNm', userNm);
    console.log('reviewPwd', reviewPwd);

    axios
      .post(`/`, {
        grade,
        title,
        content,
        userNm,
        reviewPwd 
      })
      .then((res) => {
        // status code 200일때 redirect. 실패하면 alert 다시 띄우기
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={`flex flex-col absolute top-0 left-0 w-full h-screen ${Styles.MAIN_BACKGROUND_COLOR}`}>
      <header className={`${Styles.HEADER_HEIGHT} flex justify-between items-center text-lg px-4 border-b`}>
        <span>
          <IconButton styles="p-0" onClick={onClose}>
            <AiOutlineClose size={'20px'} />
          </IconButton>
        </span>
        <span>리뷰작성</span>
        <button className="text-sm hover:text-blue-700" onClick={clickSaveBtn}>
          저장
        </button>
      </header>
      <div className="px-2 border-b mb-2">
        <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
      </div>
      <div className="flex-grow">
        <section className="flex flex-col items-center p-4 [&>*:not(:last-child)]:mb-2">
          <div>몇 점을 주시겠어요?</div>
          <div className="text-3xl text-gray-300 relative" onClick={clickStar}>
            <div className={`text-yellow-300 absolute top-0 left-0 w-0 overflow-hidden cursor-pointer`} ref={fillRef}>
              <span>★★★★★</span>
            </div>
            <span className="cursor-pointer" ref={baseRef}>
              ★★★★★
            </span>
          </div>
          <span className="text-sm" ref={gradeRef}></span>
        </section>
        <section className="flex flex-col items-center p-4 [&>*:not(:last-child)]:mb-2">
          <div>리뷰를 남겨주세요</div>
          <input className="w-full p-2" placeholder="제목" ref={titleRef} />
          <textarea className="w-full p-2" placeholder="내용" rows={5} ref={contentRef} />
        </section>
        <section className="flex flex-col items-center p-4 [&>*:not(:last-child)]:mb-2">
          <div>작성자 정보를 알려주세요</div>
          <div className='flex items-center justify-between'>
            <input className="w-[58%] p-2" placeholder="작성자" ref={userNmRef} />
            <input className="w-2/5 p-2" placeholder="비밀번호" ref={reviewPwdRef} type="password" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddReview;
