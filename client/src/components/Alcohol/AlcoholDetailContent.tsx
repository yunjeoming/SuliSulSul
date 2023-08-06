import { FC, memo } from 'react';
import Thumbnail from '../Thumbnail';
import { Alcohol } from '../../types/alcohol';
import AlcoholDescription from './AlcoholDescription';

type Props = {
  alcohol: Alcohol;
};

const AlcoholDetailContent: FC<Props> = ({ alcohol }) => {
  return (
    <section className="mb-4">
      <Thumbnail imgSrc="" isCenter />
      <AlcoholDescription detail={alcohol.detail} />
    </section>
  );
};

export default memo(AlcoholDetailContent);
