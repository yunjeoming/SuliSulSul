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
  const { data: alcoholsWithReview } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL, 'main', 'reviews'],
    queryFn: () => AlcoholAPI.getAlcoholsWithManyReviews(),
  });

  const { data: alcoholsWithGrades } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL, 'main', 'grades'],
    queryFn: () => AlcoholAPI.getAlcoholsWithHighGrade(),
  });

  useEffect(() => {
    initSidebar();
  }, [initSidebar]);

  return (
    <div>
      {alcoholsWithReview ? (
        <section className="flex flex-col mt-4 mb-8">
          <span>🍷 리뷰 많은 술</span>
          <SimpleAlcoholList alcohols={alcoholsWithReview} />
        </section>
      ) : null}
      {alcoholsWithGrades ? (
        <section className="flex flex-col mt-4 mb-8">
          <span>🍺 별점 높은 술</span>
          <SimpleAlcoholList alcohols={alcoholsWithGrades} />
        </section>
      ) : null}
    </div>
  );
};

export default HomePage;
