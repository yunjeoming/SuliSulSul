import { FC } from 'react';
import { Alcohol } from '../../types/alcohol';
import SimpleAlcoholItem from './SimpleAlcoholItem';

type Props = {
  alcohols: Alcohol[];
};

const SimpleAlcoholList: FC<Props> = ({ alcohols }) => {
  return (
    <div className={`flex overflow-auto pt-2 pb-4 gap-2`}>
      {alcohols.length ? alcohols.map((al) => <SimpleAlcoholItem key={al.alcNo} alcohol={al} />) : null}
    </div>
  );
};

export default SimpleAlcoholList;
