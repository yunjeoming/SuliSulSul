import React, { FC } from 'react';
import Thumbnail from './Thumbnail';
import { ShowingType } from '../pages/AlcoholListPage';
import { Link } from 'react-router-dom';
import { Alcohol } from '../types/alcohol';

type Props = {
  alcohol: Alcohol;
  isSimple?: boolean;
  showingType?: ShowingType;
  isNotLink?: boolean;
  isAdmin?: boolean;
};

const SIMPLE_WRAPPER_STYLES = 'flex flex-col justify-center items-center';
const DETAILED_WRAPPER_STYLES = 'flex justify-center items-center py-2';

const AlcoholListItem: FC<Props> = ({ alcohol, isSimple = false, showingType, isNotLink = false, isAdmin = false }) => {
  const link = isAdmin ? `/admin/alcs/${alcohol.alcNo}` : `/alcs/${alcohol.alcNo}`;
  return isSimple ? (
    isNotLink ? (
      <SimpleAlcohol alcohol={alcohol} />
    ) : (
      <Link to={link} className={`${SIMPLE_WRAPPER_STYLES} cursor-pointer`}>
        <SimpleAlcohol alcohol={alcohol} />
      </Link>
    )
  ) : isNotLink ? (
    <DetailedAlcohol alcohol={alcohol} showingType={showingType} isNotLink={isNotLink} />
  ) : (
    <Link
      to={link}
      className={`${DETAILED_WRAPPER_STYLES} cursor-pointer ${showingType === 'listType' ? 'w-full' : 'flex-col'}`}
    >
      <DetailedAlcohol alcohol={alcohol} showingType={showingType} isNotLink={isNotLink} />
    </Link>
  );
};

const SimpleAlcohol = ({ alcohol }: Props) => {
  const { alcNm, fileNm: image } = alcohol;

  return (
    <div className={`${SIMPLE_WRAPPER_STYLES}`}>
      <Thumbnail imgSrc={image} />
      <span>{alcNm}</span>
    </div>
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
        {avgGrade && (
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

export default AlcoholListItem;
