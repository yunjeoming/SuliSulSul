import React, { FC } from 'react';
import { ShowingType } from '../pages/AlcoholListPage';
import { Alcohol } from '../types/alcohol';
import SimpleAlcoholItem from './SimpleAlcoholItem';
import DetailedAlcoholItem from './DetailedAlcoholItem';

type Props = {
  alcohol: Alcohol;
  isSimple?: boolean;
  showingType?: ShowingType;
  isNotLink?: boolean;
  isAdmin?: boolean;
};

const AlcoholListItem: FC<Props> = ({ alcohol, isSimple = false, showingType, isNotLink = false, isAdmin = false }) => {
  const link = isNotLink ? undefined : isAdmin ? `/admin/alcs/${alcohol.alcNo}` : `/alcs/${alcohol.alcNo}`;

  return isSimple ? (
    <SimpleAlcoholItem alcohol={alcohol} link={link} />
  ) : (
    <DetailedAlcoholItem alcohol={alcohol} showingType={showingType} link={link} />
  );
};

export default AlcoholListItem;
