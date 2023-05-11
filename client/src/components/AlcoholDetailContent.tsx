import React, { FC } from 'react';
import Thumbnail from './Thumbnail';
import { MockAlcoholsType } from '../types/mockAlcohols';

type Props = {
  alcohol: MockAlcoholsType;
};

const AlcoholDetailContent: FC<Props> = ({ alcohol }) => {
  return (
    <section className="mb-4">
      <Thumbnail imgSrc="" isCenter />
      <p className="py-4">
        {alcohol.description}
        테스트용 이거 너무 맛있어요.
      </p>
    </section>
  );
};

export default AlcoholDetailContent;
