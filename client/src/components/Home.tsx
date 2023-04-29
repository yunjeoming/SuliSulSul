import React, { FC, useCallback, useEffect, useState } from 'react';
import { MockAlcoholsType } from '../types/mockAlcohols';
import axios from 'axios';
import Main from './Main';
import AlcoholList from './AlcoholList';

type Props = {
  initSidebar: () => void;
};

const Home: FC<Props> = ({ initSidebar }) => {
  const [bestItemsByCategory, setBestItemsByCategory] = useState<MockAlcoholsType[]>([]);
  const getBestItemsByCategory = useCallback(async () => {
    axios
      .get('/alcohols.json')
      .then((res) => {
        setBestItemsByCategory(res.data.alcohols);
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
    <Main
      isOnlyBody
      headerName=""
      headerChildComponent={<></>}
      bodyComponent={
        <>
          <section className="flex flex-col mb-12">
            <span>카테고리별 인기 아이템</span>
            <AlcoholList alcohols={bestItemsByCategory} isSimple styles="py-2" />
          </section>
          <section className="flex flex-col mb-12">
            <span>추천 아이템</span>
            <AlcoholList alcohols={bestItemsByCategory} isSimple styles="py-2" />
          </section>
        </>
      }
      bodyStyles=""
    />
  );
};

export default Home;
