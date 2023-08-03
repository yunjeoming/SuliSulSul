import React from 'react';
import Thumbnail from '../Thumbnail';
import { ShowingType } from '../../pages/AlcoholListPage';
import { Link } from 'react-router-dom';
import { Alcohol } from '../../types/alcohol';

type Props = {
  alcohol: Alcohol;
  isSimple?: boolean;
  showingType?: ShowingType;
  link?: string;
};

const DETAILED_WRAPPER_STYLES = 'flex justify-center items-center';

const DetailedAlcoholItem: React.FC<Props> = ({ alcohol, showingType, link }: Props) => {
  return link ? (
    <Link
      to={link}
      className={`${DETAILED_WRAPPER_STYLES} cursor-pointer ${showingType === 'listType' ? 'w-full' : 'flex-col'}`}
    >
      <DetailedAlcohol alcohol={alcohol} showingType={showingType} />
    </Link>
  ) : (
    <DetailedAlcohol alcohol={alcohol} showingType={showingType} />
  );
};

const DetailedAlcohol = ({ alcohol, showingType }: Props) => {
  const { alcNm, fileNm: image, avgGrade, detail } = alcohol;

  const styles =
    showingType === 'listType'
      ? {
          container: 'w-full',
          thumbnail: '',
          thumbnailSize: window.innerWidth > 374 ? '7rem' : '5rem',
          info: 'w-full',
          desc: 'max-h-40',
        }
      : {
          container: 'flex-col',
          thumbnail: '',
          thumbnailSize: '9rem',
          info: 'flex flex-col items-center justify-center',
          desc: '',
        };

  const truncateDesc = (desc: string, num: number) => {
    return desc.length > num ? desc.slice(0, num) + '...' : desc;
  };

  return (
    <div className={`${DETAILED_WRAPPER_STYLES} ${styles.container}`}>
      <Thumbnail imgSrc={image} size={styles.thumbnailSize} styles={`shrink-0 mr-1 ${styles.thumbnail}`} />
      <div className={styles.info}>
        <span className={`${showingType === 'listType' && 'mr-2'}`}>{alcNm}</span>
        {typeof avgGrade === 'number' && (
          <span className="text-sm">
            <span className="text-yellow-300">★</span>
            <span> {avgGrade}</span>
          </span>
        )}
        {showingType === 'listType' && detail ? (
          <div className={`text-sm text-slate-500 h-full mt-1 ${styles.desc}`}>{truncateDesc(detail, 65)}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DetailedAlcoholItem;
