import { FC, Fragment, useRef } from 'react';
import useShowMore from '../../hooks/useShowMore';

type Props = {
  detail?: string;
};

const AlcoholDescription: FC<Props> = ({ detail }) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const {
    state: { showMore, isMoreBtn },
    handleShowMoreClick,
  } = useShowMore(contentRef);

  if (!detail) {
    return null;
  }

  const lines = detail.split('\n');
  return (
    <>
      <p ref={contentRef} className={`py-4 overflow-hidden ${showMore && isMoreBtn ? 'max-h-52' : 'max-h-none'}`}>
        {lines.map((line, index) => (
          <Fragment key={line + index}>
            {line}
            <br />
          </Fragment>
        ))}
      </p>
      {showMore && (
        <div onClick={handleShowMoreClick} className="w-full text-sm text-center text-stone-500 cursor-pointer p-2">
          {isMoreBtn ? '더보기' : '접기'}
        </div>
      )}
    </>
  );
};

export default AlcoholDescription;
