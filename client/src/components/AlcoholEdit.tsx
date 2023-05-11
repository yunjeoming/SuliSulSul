import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import { Category } from '../types/alcohol';
import { CategoryUtils } from '../utils/Category';
import useInput from '../hooks/useInput';
import { Styles } from '../constants/Styles';
import Thumbnail from './Thumbnail';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

type Props = {
  alcohol: MockAlcoholsType;
};
const AlcoholEdit: FC<Props> = ({ alcohol }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category[]>([]);
  const [alcoholName, onChangeAlcoholName] = useInput(alcohol.name);
  const [categoryName, onChangeCategoryName] = useInput(alcohol.categoryName);
  const [imageName, setImageName] = useState(alcohol.image);
  const [description, onChangeDescription] = useInput(alcohol.description);
  const [modal, setModal] = useState({
    content: '',
    isOpenModal: false,
  });
  const { content, isOpenModal } = modal;
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const categoryData = await CategoryUtils.getCategory();
      categoryData && setCategory(categoryData);
    })();
  }, []);

  const handleClickFile = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const onChangeImageName = useCallback((e: ChangeEvent) => {
    const fileInput = e.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      const { name } = fileInput.files[0];
      setImageName(name);
    }
  }, []);

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log('제출');

    // 변경사항 저장
    // axios.get(``).then((data) => {
    // }).catch((err) => console.dir(err))
  }, []);

  const onCloseModal = useCallback(() => {
    setModal((state) => ({
      ...state,
      isOpenModal: false,
    }));
  }, []);

  const handleClickCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickSave = useCallback(() => {
    setModal({
      content: '해당 내용을 수정하시겠습니까?',
      // content: '해당 내용을 등록하시겠습니까?',
      isOpenModal: true,
    });
  }, []);

  return (
    <>
      <Thumbnail imgSrc="" isCenter styles="mb-4" />
      <form className="flex flex-col [&>div]:flex [&>div]:items-center [&>div]:mb-4 [&>div>label]:basis-20 [&>div>label]:shrink-0 [&>div>label+.input-area]:grow">
        <div>
          <label htmlFor="alcohol-name">술 이름</label>
          <input id="alcohol-name" className="input-area p-2" value={alcoholName} onChange={onChangeAlcoholName} />
        </div>
        <div>
          <label htmlFor="alcohol-name">카테고리</label>
          <select className="input-area p-2" onChange={onChangeCategoryName} value={categoryName || 0}>
            <option value={0}>선택</option>
            {category.map((c, idx) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alcohol-img">이미지</label>
          <div className="input-area flex items-center">
            <input id="alcohol-img" type="file" ref={fileRef} hidden onChange={onChangeImageName} />
            {imageName && <div className="mr-2 text-sm">{imageName}</div>}
            <button type="button" className={`${Styles.BUTTON_DEFAULT} shrink-0`} onClick={handleClickFile}>
              변경
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="alcohol-desc">설명</label>
          <textarea
            id="alcohol-desc"
            className="input-area p-2"
            value={description}
            onChange={onChangeDescription}
            rows={5}
          />
        </div>
        <div className="flex justify-end">
          <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={handleClickCancel}>
            취소
          </button>
          <button type="button" className={`${Styles.BUTTON_DEFAULT}`} onClick={handleClickSave}>
            확인
          </button>
        </div>
        {isOpenModal && (
          <Modal
            children={
              <div className="flex flex-col items-center p-2">
                <div className="p-4">{content}</div>
                <div className="flex">
                  <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={onCloseModal}>
                    취소
                  </button>
                  <button type="submit" className={`${Styles.BUTTON_DEFAULT}`} onClick={onSubmit}>
                    확인
                  </button>
                </div>
              </div>
            }
            onClose={onCloseModal}
          />
        )}
      </form>
    </>
  );
};

export default AlcoholEdit;
