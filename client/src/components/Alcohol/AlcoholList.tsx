import { FC, useRef } from 'react';
import AlcoholListItem from './AlcoholListItem';
import { ShowingType } from '../../pages/AlcoholListPage';
import { Alcohol } from '../../types/alcohol';

type AlcoholListType = {
  alcohols: Alcohol[];
  isSimple?: boolean;
  showingType?: ShowingType;
  styles?: string;
  isAdmin?: boolean;
};

const AlcoholList: FC<AlcoholListType> = ({
  alcohols,
  isSimple = false,
  showingType,
  styles = '',
  isAdmin = false,
}) => {
  const isSimpleStyles = isSimple ? 'overflow-auto' : 'flex-wrap justify-evenly';
  const targetRef = useRef<HTMLDivElement>(null);
  return (
    <div className={`flex ${isSimpleStyles} ${styles}`}>
      {alcohols.length ? (
        alcohols.map((al) => (
          <AlcoholListItem
            key={al.alcNo}
            alcohol={al}
            isSimple={isSimple}
            showingType={showingType}
            isAdmin={isAdmin}
          />
        ))
      ) : (
        <div>등록된 술이 없습니다.</div>
      )}
      <div ref={targetRef}></div>
    </div>
  );
};

export default AlcoholList;
