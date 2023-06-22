import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';
import { Alcohol } from '../../types/alcohol';

type Props = {
  alcohol: Alcohol;
  link?: string;
};

const SIMPLE_WRAPPER_STYLES = 'flex flex-col justify-center items-center';

const SimpleAlcoholItem: React.FC<Props> = ({ alcohol, link }) => {
  return link ? (
    <Link to={link} className={`${SIMPLE_WRAPPER_STYLES} cursor-pointer`}>
      <SimpleAlcohol alcohol={alcohol} />
    </Link>
  ) : (
    <SimpleAlcohol alcohol={alcohol} />
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

export default SimpleAlcoholItem;
