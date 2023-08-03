import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alcohol } from '../../types/alcohol';
import { queryKeys } from '../../queryClient';
import AlcoholAPI from '../../api/alcohol';
import SimpleAlcoholList from '../../components/Alcohol/SimpleAlcoholList';

type Props = {
  initSidebar: () => void;
};

const HomePage: FC<Props> = ({ initSidebar }) => {
  const { data: alcohols } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL],
    queryFn: () => AlcoholAPI.getAlcohols(),
  });

  useEffect(() => {
    initSidebar();
  }, [initSidebar]);

  return (
    <div>
      {alcohols ? (
        <section className="flex flex-col mb-8">
          <span>🍹 리뷰 많은 술</span>
          <SimpleAlcoholList alcohols={alcohols} />
        </section>
      ) : null}
      {alcohols ? (
        <section className="flex flex-col mb-8">
          <span>🍺 별점 높은 술</span>
          <SimpleAlcoholList alcohols={alcohols} />
        </section>
      ) : null}
      {alcohols ? (
        <section className="flex flex-col mb-8">
          <span>🍷 최근 등록된 술</span>
          <SimpleAlcoholList alcohols={alcohols} />
        </section>
      ) : null}
    </div>
  );
};

export default HomePage;
