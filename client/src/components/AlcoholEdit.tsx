import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alcohol, Category } from '../types/alcohol';
import { CategoryUtils } from '../utils/Category';
import { Styles } from '../constants/Styles';
// import Thumbnail from './Thumbnail';
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
  const volRef = useRef<HTMLInputElement>(null);
  const productorRef = useRef<HTMLInputElement>(null);
  const expRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  // const imageRef = useRef<HTMLInputElement>(null);

  const initModalState = useMemo(
    () => ({
      content: '',
      isOpenModal: false,
      showOneBtn: true,
      isAdded: false,
      targetRef: null,
    }),
    [],
  );

  const [category, setCategory] = useState<Category[]>([]);
  const [modal, setModal] = useState<{
    content: string;
    isOpenModal: boolean;
    showOneBtn: boolean;
    isAdded: boolean;
    targetRef: React.RefObject<HTMLElement> | null;
  }>(initModalState);
  // const [imageName, setImageName] = useState('');
  const { content, isOpenModal, showOneBtn, isAdded, targetRef } = modal;

  // const handleClickFile = useCallback(() => {
  //   if (imageRef.current) {
  //     imageRef.current.click();
  //   }
  // }, []);

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

    if (!volRef.current?.value) {
      setModal((state) => ({
        ...state,
        content: '도수를 입력해주세요',
        isOpenModal: true,
        targetRef: volRef,
      }));
      return;
    }

    if (!productorRef.current?.value) {
      setModal((state) => ({
        ...state,
        content: '생산지를 입력해주세요',
        isOpenModal: true,
        targetRef: productorRef,
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

    setModal((state) => ({
      ...state,
      content: `해당 내용을 ${alcohol ? '수정' : '등록'}하시겠습니까?`,
      isOpenModal: true,
      showOneBtn: false,
      targetRef: null,
    }));
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

  const addAlcohol = useCallback((form: FormData) => {
    axios
      .post(`/insertAlcInfo`, form)
      .then((res) => {
        if (res.status.toString().startsWith('2')) {
          setModal((state) => ({
            ...state,
            content: '추가를 완료했습니다.',
            showOneBtn: true,
            isOpenModal: true,
            isAdded: true,
            targetRef: null,
          }));
        }
      })
      .catch((err) => console.dir(err));
  }, []);

  const updateAlcohol = useCallback(
    (form: FormData) => {
      if (!alcohol) return;
      form.append('alcNo', alcohol.alcNo.toString());
      axios
        .post(`/updateAlcInfo`, form)
        .then((res) => {
          if (res.status.toString().startsWith('2')) {
            setModal((state) => ({
              ...state,
              content: '내용을 수정했습니다.',
              showOneBtn: true,
              isOpenModal: true,
              targetRef: null,
            }));
          }
        })
        .catch((err) => console.dir(err));
    },
    [alcohol],
  );

  // 최종 api 실행
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const form = new FormData();
      const alcNm = alcoholNmRef.current?.value || '';
      const cateNo = categoryNmRef.current?.value || '';
      const vol = volRef.current?.value || '';
      const productor = productorRef.current?.value || '';
      const detail = descriptionRef.current?.value || '';
      const expYn = expRef.current?.value || '';
      form.append('alcNm', alcNm);
      form.append('cateNo', cateNo);
      form.append('detail', detail);
      form.append('vol', vol);
      form.append('productor', productor);
      form.append('expYn', expYn);

      alcohol ? updateAlcohol(form) : addAlcohol(form);
      onCloseModal();
    },
    [alcohol, onCloseModal, updateAlcohol, addAlcohol],
  );

  // 술 추가 완료 후 '계속 추가'
  const addAnotherOne = useCallback(() => {
    setModal(initModalState);
    onCloseModal();

    // 입력창 초기화
    if (alcoholNmRef.current) {
      alcoholNmRef.current.value = '';
    }
    if (categoryNmRef.current) {
      categoryNmRef.current.value = '';
    }
    if (volRef.current) {
      volRef.current.value = '';
    }
    if (productorRef.current) {
      productorRef.current.value = '';
    }
    if (descriptionRef.current) {
      descriptionRef.current.value = '';
    }
  }, [onCloseModal, initModalState]);

  // 술 추가 완료 후 '홈으로'
  const goHome = useCallback(() => {
    onCloseModal();
    handleClickCancel();
    navigate('/admin', { replace: true });
  }, [navigate, onCloseModal, handleClickCancel]);

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

    if (categoryNmRef.current && alcohol.cateNo) {
      categoryNmRef.current.value = alcohol.cateNo.toString();
    }

    // if (imageRef.current && alcohol.fileNm) {
    //   imageRef.current.value = alcohol.fileNm;
    //   setImageName(alcohol.fileNm);
    // }

    if (descriptionRef.current && alcohol.detail) {
      descriptionRef.current.value = alcohol.detail;
    }

    if (productorRef.current && alcohol.productor) {
      productorRef.current.value = alcohol.productor;
    }

    if (expRef.current && alcohol.expYn) {
      expRef.current.value = alcohol.expYn.toString();
    }

    if (volRef.current && alcohol.vol) {
      volRef.current.value = alcohol.vol.toString();
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
      {/* <Thumbnail imgSrc="" isCenter styles="mb-4" /> */}
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
              <option key={c.cateNo} value={c.cateNo}>
                {c.cateNm}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alcohol-vol">도수</label>
          <input type="number" id="alcohol-vol" className="input-area p-2" ref={volRef} />
        </div>
        <div>
          <label htmlFor="alcohol-productor">제조사</label>
          <input id="alcohol-productor" className="input-area p-2" ref={productorRef} />
        </div>
        <div>
          <label htmlFor="alcohol-desc">설명</label>
          <textarea id="alcohol-desc" className="input-area p-2" ref={descriptionRef} rows={5} />
        </div>
        <div>
          <label htmlFor="alcohol-exp">단종여부</label>
          <select className="input-area p-2" ref={expRef}>
            <option defaultChecked value={'false'}>
              아니오
            </option>
            <option value={'yes'}>예</option>
          </select>
        </div>
        {/* <div>
          <label htmlFor="alcohol-img">이미지</label>
          <div className="input-area flex items-center">
            <input id="alcohol-img" type="file" ref={imageRef} hidden />
            {imageName && <div className="mr-2 text-sm">{imageName}</div>}
            <button type="button" className={`${Styles.BUTTON_DEFAULT} shrink-0`} onClick={handleClickFile}>
              {alcohol ? '수정' : '등록'}
            </button>
          </div>
        </div> */}
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
            {isAdded ? (
              // 술 추가 되었을 때
              <div className="flex">
                <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={addAnotherOne}>
                  계속 추가
                </button>
                <button type="submit" className={`${Styles.BUTTON_DEFAULT}`} onClick={goHome}>
                  홈으로
                </button>
              </div>
            ) : showOneBtn ? (
              // 확인 버튼만 보여줄 때
              <button className="w-full border rounded-md py-1 hover:bg-gray-200" onClick={onCloseModal}>
                확인
              </button>
            ) : (
              // 확인 & 취소 둘 다 보여줄 때
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
