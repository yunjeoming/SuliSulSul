import { FC, memo, useRef } from 'react';
import Thumbnail from '../Thumbnail';
import { Alcohol } from '../../types/alcohol';
import useShowMore from '../../hooks/useShowMore';

type Props = {
  alcohol: Alcohol;
};

const AlcoholDetailContent: FC<Props> = ({ alcohol }) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const {
    state: { showMore, isMoreBtn },
    handleShowMoreClick,
  } = useShowMore(contentRef);

  return (
    <section className="mb-4">
      <Thumbnail imgSrc="" isCenter />
      <p ref={contentRef} className={`py-4 overflow-hidden ${showMore && isMoreBtn ? 'max-h-52' : 'max-h-none'}`}>
        {alcohol.detail}
      </p>
      {showMore && (
        <div onClick={handleShowMoreClick} className="w-full text-sm text-center text-stone-500 cursor-pointer p-2">
          {isMoreBtn ? '더보기' : '접기'}
        </div>
      )}
    </section>
  );
};

export default memo(AlcoholDetailContent);
