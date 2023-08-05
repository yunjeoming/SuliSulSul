import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';
import { Alcohol } from '../../types/alcohol';

type Props = {
  alcohol: Alcohol;
};

const SimpleAlcoholItem: React.FC<Props> = ({ alcohol: { alcNo, fileNm, alcNm } }) => {
  return (
    <Link to={`/alcs/${alcNo}`} className={`cursor-pointer`}>
      <div className={`flex flex-col justify-center items-center`}>
        <Thumbnail size="8rem" imgSrc={fileNm} />
        <span className="text-sm text-center">{alcNm}</span>
      </div>
    </Link>
  );
};

export default memo(SimpleAlcoholItem);
