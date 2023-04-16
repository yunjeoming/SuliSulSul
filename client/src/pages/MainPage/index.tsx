import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { MockAlcoholsType } from '../../types/mockAlcohols';
import AlcoholList from '../../components/AlcoholList';
import Main from '../../components/Main';

const MainPage = () => {
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
      if (isMount) {
        await getBestItemsByCategory();
      }
    })();
    return () => {
      isMount = false;
    };
  }, [getBestItemsByCategory]);

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

export default MainPage;
