import React, { FC, useEffect } from 'react';
import AlcoholList from './AlcoholList';
import MainLayout from '../layout/MainLayout';
import { Alcohol } from '../types/alcohol';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryClient';
import API from '../api';

type Props = {
  initSidebar: () => void;
};

const Home: FC<Props> = ({ initSidebar }) => {
  const { data: alcohols } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL],
    queryFn: API.getAlcohols,
  });

  useEffect(() => {
    initSidebar();
  }, [initSidebar]);

  return (
    <MainLayout>
      <div>
        {alcohols ? (
          <section className="flex flex-col mb-12">
            <span>카테고리별 인기 아이템</span>
            <AlcoholList alcohols={alcohols} isSimple styles="py-2" />
          </section>
        ) : null}
        {alcohols ? (
          <section className="flex flex-col mb-12">
            <span>추천 아이템</span>
            <AlcoholList alcohols={alcohols} isSimple styles="py-2" />
          </section>
        ) : null}
      </div>
    </MainLayout>
  );
};

export default Home;
