import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Alcohol, Category } from '../types/alcohol';
import { CategoryUtils } from '../utils/Category';
import { Styles } from '../constants/Styles';
import Thumbnail from './Thumbnail';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
  alcohol?: Alcohol;
  onCancel?: () => void;
  setSaveFunc?: React.Dispatch<
    React.SetStateAction<{
      func: () => void;
    }>
  >;
};

const AlcoholEdit: React.FC<Props> = ({ alcohol, onCancel, setSaveFunc }) => {
  const navigate = useNavigate();

  const alcoholNmRef = useRef<HTMLInputElement>(null);
  const categoryNmRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [category, setCategory] = useState<Category[]>([]);
  const [imageName, setImageName] = useState('');
  const [modal, setModal] = useState<{
    content: string;
    isOpenModal: boolean;
    showOneBtn: boolean;
    targetRef: React.RefObject<HTMLElement> | null;
  }>({
    content: '',
    isOpenModal: false,
    showOneBtn: true,
    targetRef: null,
  });
  const { content, isOpenModal, showOneBtn, targetRef } = modal;

  const handleClickFile = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  }, []);

  // 모달 열기
  const handleClickSave = useCallback(() => {
    if (!alcoholNmRef.current?.value) {
      setModal((state) => ({
        ...state,
        content: '술 이름을 입력해주세요',
        isOpenModal: true,
        targetRef: alcoholNmRef,
      }));
      return;
    }

    if (!categoryNmRef.current?.value) {
      setModal((state) => ({
        ...state,
        content: '카테고리를 선택해주세요',
        isOpenModal: true,
        targetRef: categoryNmRef,
      }));
      return;
    }

    if (!descriptionRef.current?.value) {
      setModal((state) => ({
        ...state,
        content: '설명을 입력해주세요',
        isOpenModal: true,
        targetRef: descriptionRef,
      }));
      return;
    }

    setModal({
      content: `해당 내용을 ${alcohol ? '수정' : '등록'}하시겠습니까?`,
      isOpenModal: true,
      showOneBtn: false,
      targetRef: null,
    });
  }, [alcohol]);

  const handleClickCancel = useCallback(() => {
    if (onCancel) {
      // 술 등록
      onCancel();
    } else {
      // 술 수정
      navigate(-1);
    }
  }, [navigate, onCancel]);

  const onCloseModal = useCallback(() => {
    setModal((state) => ({
      ...state,
      isOpenModal: false,
      showOneBtn: true,
      targetRef: null,
    }));

    if (targetRef?.current) {
      targetRef.current.focus();
    }
  }, [targetRef]);

  // 최종 api 실행
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log('제출');

      const form = new FormData();
      // form.append('alcNo', alcNo);
      // form.append('alcNm', alcNm);
      // form.append('cateNm', cateNm);
      // form.append('cateNo', cateNo);
      // form.append('detail', detail);
      // form.append('exeYn', exeYn);
      // form.append('vol', vol);

      // 변경사항 저장
      axios
        .post(`/insertAlcReview`, form)
        .then((res) => {})
        .catch((err) => console.dir(err));

      onCloseModal();
    },
    [onCloseModal],
  );

  // category 가져오기
  useEffect(() => {
    (async () => {
      const categoryData = await CategoryUtils.getCategory();
      categoryData && setCategory(categoryData);
    })();
  }, []);

  // 수정 시 alcohol 정보 넣기
  useEffect(() => {
    if (!alcohol || !category.length) return;

    if (alcoholNmRef.current && alcohol.alcNm) {
      alcoholNmRef.current.value = alcohol.alcNm;
    }

    if (categoryNmRef.current && alcohol.cateNm) {
      categoryNmRef.current.value = alcohol.cateNm;
    }

    if (imageRef.current && alcohol.fileNm) {
      imageRef.current.value = alcohol.fileNm;
      setImageName(alcohol.fileNm);
    }

    if (descriptionRef.current && alcohol.detail) {
      descriptionRef.current.value = alcohol.detail;
    }
  }, [alcohol, category]);

  // 저장 함수 등록
  useEffect(() => {
    if (!alcohol) {
      setSaveFunc && setSaveFunc(() => ({ func: handleClickSave }));
    }
  }, [alcohol, setSaveFunc, handleClickSave]);

  return (
    <>
      <Thumbnail imgSrc="" isCenter styles="mb-4" />
      <form className="flex flex-col [&>div]:flex [&>div]:items-center [&>div]:mb-4 [&>div>label]:basis-20 [&>div>label]:shrink-0 [&>div>label+.input-area]:grow">
        <div>
          <label htmlFor="alcohol-name">술 이름</label>
          <input id="alcohol-name" className="input-area p-2" ref={alcoholNmRef} />
        </div>
        <div>
          <label htmlFor="alcohol-name">카테고리</label>
          <select className="input-area p-2" ref={categoryNmRef}>
            <option value={''}>선택</option>
            {category.map((c) => (
              <option key={c.cateNo} value={c.cateNm}>
                {c.cateNm}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alcohol-img">이미지</label>
          <div className="input-area flex items-center">
            <input id="alcohol-img" type="file" ref={imageRef} hidden />
            {imageName && <div className="mr-2 text-sm">{imageName}</div>}
            <button type="button" className={`${Styles.BUTTON_DEFAULT} shrink-0`} onClick={handleClickFile}>
              {alcohol ? '수정' : '등록'}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="alcohol-desc">설명</label>
          <textarea id="alcohol-desc" className="input-area p-2" ref={descriptionRef} rows={5} />
        </div>
        {alcohol && (
          <div className="flex justify-end">
            <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={handleClickCancel}>
              취소
            </button>
            <button type="button" className={`${Styles.BUTTON_DEFAULT}`} onClick={handleClickSave}>
              확인
            </button>
          </div>
        )}
        {isOpenModal && (
          <Modal onClose={onCloseModal}>
            <div className="p-4">{content}</div>
            {showOneBtn ? (
              <button className="w-full border rounded-md py-1 hover:bg-gray-200" onClick={onCloseModal}>
                확인
              </button>
            ) : (
              <div className="flex">
                <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={onCloseModal}>
                  취소
                </button>
                <button type="submit" className={`${Styles.BUTTON_DEFAULT}`} onClick={onSubmit}>
                  확인
                </button>
              </div>
            )}
          </Modal>
        )}
      </form>
    </>
  );
};

export default AlcoholEdit;
