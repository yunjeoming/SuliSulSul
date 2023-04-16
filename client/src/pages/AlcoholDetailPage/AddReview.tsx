import React, { MouseEvent, useRef } from 'react';
import { Styles } from '../../constants/Styles';
import IconButton from '../../components/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import AlcoholListItem from '../../components/AlcoholListItem';
import { MockAlcoholsType } from '../../types/mockAlcohols';

type Props = {
  alcohol: MockAlcoholsType;
  onClose: () => void;
};

const AddReview = ({ alcohol, onClose }: Props) => {
  const baseRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const gradeRef = useRef<HTMLSpanElement | null>(null);
  const reviewTitleRef = useRef<HTMLInputElement | null>(null);
  const reviewContentRef = useRef<HTMLTextAreaElement | null>(null);

  const clickSaveBtn = () => {
    // console.log(gradeRef.current?.textContent);
    // console.log(reviewTitleRef.current?.value);
    // console.log(reviewContentRef.current?.value);

    if(!gradeRef.current?.textContent) {
      alert('별점을 선택해주세요!!');
      return;
    }
    if(!reviewTitleRef.current?.value) {
      alert('제목을 입력해주세요!!');
      return;
    }

    // 페이지 이동
  };

  const clickStar = (e: MouseEvent<HTMLDivElement>) => {
    if (!baseRef.current || !fillRef.current || !gradeRef.current) return;
    const baseWidth = baseRef.current.getBoundingClientRect().width;
    const offsetX = e.nativeEvent.offsetX;
    const stars = Math.ceil((offsetX / baseWidth) * 10) / 2;
    fillRef.current.style.width = `${(baseWidth / 5) * stars}px`;
    gradeRef.current.innerText = `${stars}점`;
  };

  return (
    <div className={`flex flex-col absolute top-0 left-0 w-full h-screen ${Styles.MAIN_BACKGROUND_COLOR}`}>
      <header className={`${Styles.HEADER_HEIGHT} flex justify-between items-center text-lg px-4 border-b`}>
        <span>
          <IconButton styles="p-1" onClick={onClose}>
            <AiOutlineClose size={'24px'} />
          </IconButton>
        </span>
        <span>리뷰작성</span>
        <button className="text-sm" onClick={clickSaveBtn}>
          저장
        </button>
      </header>
      <div className="px-2 border-b mb-2">
        <AlcoholListItem alcohol={alcohol} showingType="listType" isNotLink />
      </div>
      <div className="flex-grow">
        <section className="flex flex-col items-center py-4 [&>*:not(:last-child)]:mb-2">
          <div className="mb-2">몇 점을 주시겠어요?</div>
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
        <section className="flex flex-col items-center p-4 [&>*:not(:last-child)]:mb-4">
          <div>리뷰를 남겨주세요.</div>
          <input className="w-full p-2" placeholder="제목은 필수 사항입니다." ref={reviewTitleRef} />
          <textarea className="w-full p-2" placeholder="내용은 선택 사항입니다." rows={5} ref={reviewContentRef} />
          <div className="">
            {/* <label>제목</label> */}
            {/* <label>내용</label> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddReview;
