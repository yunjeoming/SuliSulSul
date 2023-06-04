import React, { FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AlcoholList from './AlcoholList';
import MainLayout from '../layout/MainLayout';
import { Alcohol } from '../types/alcohol';

type Props = {
  initSidebar: () => void;
};

const Home: FC<Props> = ({ initSidebar }) => {
  const [bestItemsByCategory, setBestItemsByCategory] = useState<Alcohol[]>([]);
  const getBestItemsByCategory = useCallback(async () => {
    axios
      .get(`/selectAlcList`)
      .then((res) => {
        setBestItemsByCategory(res.data);
        // setBestItemsByCategory(res.data.alcohols);
      })
      .catch((err) => console.error(err.response));
  }, []);

  useEffect(() => {
    let isMount = true;
    (async () => {
      initSidebar();
      if (isMount) {
        await getBestItemsByCategory();
      }
    })();
    return () => {
      isMount = false;
    };
  }, [getBestItemsByCategory, initSidebar]);

  return (
    <MainLayout>
      <div>
        <section className="flex flex-col mb-12">
          <span>카테고리별 인기 아이템</span>
          <AlcoholList alcohols={bestItemsByCategory} isSimple styles="py-2" />
        </section>
        <section className="flex flex-col mb-12">
          <span>추천 아이템</span>
          <AlcoholList alcohols={bestItemsByCategory} isSimple styles="py-2" />
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
