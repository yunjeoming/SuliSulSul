import React, { FC, MouseEvent, useCallback, useEffect, useRef } from 'react';

type Props = {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  gradeRef: React.MutableRefObject<HTMLSpanElement | null>;
  selectedGrade?: number;
};

const DynamicStars: FC<Props> = ({ onClick, selectedGrade, gradeRef }) => {
  const baseRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  const clickStars = (e: MouseEvent<HTMLDivElement>) => {
    if (!baseRef.current || !fillRef.current || !gradeRef.current) return;
    const baseWidth = baseRef.current.getBoundingClientRect().width;
    const offsetX = e.nativeEvent.offsetX;
    const stars = Math.ceil((offsetX / baseWidth) * 10) / 2;
    fillRef.current.style.width = `${(baseWidth / 5) * stars}px`;
    gradeRef.current.innerText = `${stars}점`;
  };

  const gradeStars = useCallback((selectedGrade: number) => {
    if (!baseRef.current || !fillRef.current || !gradeRef.current) return;
    const baseWidth = baseRef.current.getBoundingClientRect().width;
    fillRef.current.style.width = `${(baseWidth / 5) * selectedGrade}px`;
    gradeRef.current.innerText = `${selectedGrade}점`;
  }, [gradeRef]);

  useEffect(() => {
    if (!selectedGrade) return;
    gradeStars(selectedGrade);
  }, [selectedGrade, gradeStars]);

  return (
    <>
      <div className="text-3xl text-gray-300 relative" onClick={clickStars}>
        <div className={`text-yellow-300 absolute top-0 left-0 w-0 overflow-hidden cursor-pointer`} ref={fillRef}>
          <span>★★★★★</span>
        </div>
        <span className="cursor-pointer" ref={baseRef}>
          ★★★★★
        </span>
      </div>
      <span className="text-sm" ref={gradeRef}></span>
    </>
  );
};

export default DynamicStars;
