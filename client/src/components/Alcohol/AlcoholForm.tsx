import { MutableRefObject, forwardRef, useEffect } from 'react';
import useCategory from '../../hooks/useCategory';
import { RefObjType } from '../../types/common';

type Props = {
  selectedCategory?: string;
};

const AlcoholForm = forwardRef<RefObjType, Props>(({ selectedCategory }, ref) => {
  const { category } = useCategory();
  const { current } = ref as MutableRefObject<RefObjType>;

  useEffect(() => {
    const { categoryNmRef } = current;
    if (categoryNmRef && selectedCategory) {
      categoryNmRef.value = selectedCategory;
    }
  }, [category, selectedCategory, current]);

  return (
    <form className="flex flex-col [&>div]:flex [&>div]:items-center [&>div]:mb-4 [&>div>label]:basis-20 [&>div>label]:shrink-0 [&>div>label+.input-area]:grow">
      <div>
        <label htmlFor="alcohol-name">술 이름</label>
        <input
          id="alcohol-name"
          className="input-area p-2"
          ref={(el) => {
            current.alcoholNmRef = el;
          }}
        />
      </div>
      <div>
        <label htmlFor="alcohol-name">카테고리</label>
        <select
          className="input-area p-2"
          ref={(el) => {
            current.categoryNmRef = el;
          }}
        >
          <option value={'-1'}>선택</option>
          {category?.map((c) => (
            <option key={c.cateNo} value={c.cateNo}>
              {c.cateNm}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="alcohol-vol">도수</label>
        <input
          type="number"
          id="alcohol-vol"
          className="input-area p-2"
          ref={(el) => {
            current.volRef = el;
          }}
        />
      </div>
      <div>
        <label htmlFor="alcohol-desc">설명</label>
        <textarea
          id="alcohol-desc"
          className="input-area p-2"
          ref={(el) => {
            current.descriptionRef = el;
          }}
          rows={5}
        />
      </div>
      <div>
        <label htmlFor="alcohol-exp">단종여부</label>
        <select
          className="input-area p-2"
          ref={(el) => {
            current.expRef = el;
          }}
        >
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
          <button type="button" className={`${StyleConstants.BUTTON_DEFAULT} shrink-0`} onClick={handleClickFile}>
            {alcohol ? '수정' : '등록'}
          </button>
        </div>
      </div> */}
    </form>
  );
});

export default AlcoholForm;
