import React from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import Thumbnail from './Thumbnail';
import { ShowingType } from '../pages/AlcoholListPage';
import { Link } from 'react-router-dom';

type Props = {
  alcohol: MockAlcoholsType;
  isSimple?: boolean;
  showingType?: ShowingType;
};

const AlcoholListItem = ({ alcohol, isSimple = false, showingType }: Props) => {
  return isSimple ? (
    <SimpleAlcohol alcohol={alcohol} />
  ) : (
    <DetailedAlcohols alcohol={alcohol} showingType={showingType} />
  );
};

const SimpleAlcohol = ({ alcohol }: Props) => {
  const { name, image } = alcohol;

  return (
    <Link to={`/alcs/${alcohol.no}`} className="flex flex-col justify-center items-center cursor-pointer">
      <Thumbnail imgSrc={image} />
      <span>{name}</span>
    </Link>
  );
};

const DetailedAlcohols = ({ alcohol, showingType }: Props) => {
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
    <Link
      to={`/alcs/${alcohol.no}`}
      className={`flex justify-center items-center cursor-pointer mb-4 ${styles.container}`}
    >
      <Thumbnail imgSrc={image} size={styles.thumbnailSize} styles={`shrink-0 mr-1 ${styles.thumbnail}`} />
      <div className={styles.info}>
        <span className={`${showingType === 'listType' && 'mr-2'}`}>{name}</span>
        {grade && <span className="text-sm">⭐️ {grade}</span>}
        {showingType === 'listType' && description ? (
          <div className={`text-sm text-slate-500 h-full mt-1 ${styles.desc}`}>{truncateDesc(description, 65)}</div>
        ) : null}
      </div>
    </Link>
  );
};

export default AlcoholListItem;
