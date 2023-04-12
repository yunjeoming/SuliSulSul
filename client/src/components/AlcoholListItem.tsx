import React from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import Thumbnail from './Thumbnail';
import { ShowingType } from '../pages/AlcoholListPage';

type Props = {
  alcohol: MockAlcoholsType;
  isSimple?: boolean;
  showingType?: ShowingType;
  handleClickItem?: () => void;
};

const AlcoholListItem = ({ alcohol, isSimple = false, showingType }: Props) => {
  const handleClickItem = () => {
    console.log('click~~~', alcohol.name);
  };

  return isSimple ? (
    <SimpleAlcohol alcohol={alcohol} handleClickItem={handleClickItem} />
  ) : (
    <DetailedAlcohols alcohol={alcohol} handleClickItem={handleClickItem} showingType={showingType} />
  );
};

const SimpleAlcohol = ({ alcohol, handleClickItem }: Props) => {
  const { name, image } = alcohol;

  return (
    <div className="flex flex-col justify-center items-center cursor-pointer" onClick={handleClickItem}>
      <Thumbnail imgSrc={image} />
      <span>{name}</span>
    </div>
  );
};

const DetailedAlcohols = ({ alcohol, handleClickItem, showingType }: Props) => {
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
    <div
      className={`flex justify-center items-center cursor-pointer mb-4 ${styles.container}`}
      onClick={handleClickItem}
    >
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
