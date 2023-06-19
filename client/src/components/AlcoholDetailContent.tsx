import React, { FC } from 'react';
import Thumbnail from './Thumbnail';
import { Alcohol } from '../types/alcohol';

type Props = {
  alcohol: Alcohol;
};

const AlcoholDetailContent: FC<Props> = ({ alcohol }) => {
  return (
    <section className="mb-4">
      <Thumbnail imgSrc="" isCenter />
      <p className="py-4">
        {alcohol.detail}
      </p>
    </section>
  );
};

export default AlcoholDetailContent;
