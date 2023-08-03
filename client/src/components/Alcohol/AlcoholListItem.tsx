import { FC } from 'react';
import { ShowingType } from '../../pages/AlcoholListPage';
import { Alcohol } from '../../types/alcohol';
import DetailedAlcoholItem from './DetailedAlcoholItem';

type Props = {
  alcohol: Alcohol;
  showingType?: ShowingType;
  isNotLink?: boolean;
  isAdmin?: boolean;
};

const AlcoholListItem: FC<Props> = ({ alcohol, showingType, isNotLink = false, isAdmin = false }) => {
  const link = isNotLink ? undefined : isAdmin ? `/admin/alcs/${alcohol.alcNo}` : `/alcs/${alcohol.alcNo}`;

  return <DetailedAlcoholItem alcohol={alcohol} showingType={showingType} link={link} />;
};

export default AlcoholListItem;
