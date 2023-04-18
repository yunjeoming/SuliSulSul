import React from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import Thumbnail from './Thumbnail';
import { ShowingType } from '../pages/AlcoholListPage';
import { Link } from 'react-router-dom';

type Props = {
  alcohol: MockAlcoholsType;
  isSimple?: boolean;
  showingType?: ShowingType;
  isNotLink?: boolean;
};

const SIMPLE_WRAPPER_STYLES = 'flex flex-col justify-center items-center';
const DETAILED_WRAPPER_STYLES = 'flex justify-center items-center py-2';

const AlcoholListItem = ({ alcohol, isSimple = false, showingType, isNotLink = false }: Props) => {
  return isSimple ? (
    isNotLink ? (
      <SimpleAlcohol alcohol={alcohol} />
    ) : (
      <Link to={`/alcs/${alcohol.no}`} className={`${SIMPLE_WRAPPER_STYLES} cursor-pointer`}>
        <SimpleAlcohol alcohol={alcohol} />
      </Link>
    )
  ) : isNotLink ? (
    <DetailedAlcohol alcohol={alcohol} showingType={showingType} isNotLink={isNotLink} />
  ) : (
    <Link
      to={`/alcs/${alcohol.no}`}
      className={`${DETAILED_WRAPPER_STYLES} cursor-pointer ${showingType === 'listType' ? 'w-full' : 'flex-col'}`}
    >
      <DetailedAlcohol alcohol={alcohol} showingType={showingType} isNotLink={isNotLink} />
    </Link>
  );
};

const SimpleAlcohol = ({ alcohol }: Props) => {
  const { name, image } = alcohol;

  return (
    <div className={`${SIMPLE_WRAPPER_STYLES}`}>
      <Thumbnail imgSrc={image} />
      <span>{name}</span>
    </div>
  );
};

const DetailedAlcohol = ({ alcohol, showingType }: Props) => {
  const { name, image, grade, description } = alcohol;

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
        <span className={`${showingType === 'listType' && 'mr-2'}`}>{name}</span>
        {grade && <span className="text-sm">⭐️ {grade}</span>}
        {showingType === 'listType' && description ? (
          <div className={`text-sm text-slate-500 h-full mt-1 ${styles.desc}`}>{truncateDesc(description, 65)}</div>
        ) : null}
      </div>
    </div>
  );
};

export default AlcoholListItem;
