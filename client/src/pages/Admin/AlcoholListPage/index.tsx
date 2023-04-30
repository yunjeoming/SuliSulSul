import React, { useCallback, useEffect, useState } from 'react';
import { MockAlcoholsType } from '../../../types/mockAlcohols';
import axios from 'axios';
import AlcoholList from '../../../components/AlcoholList';

const AdminAlcoholListPage = () => {
  const [alcohols, setAlcohols] = useState<MockAlcoholsType[]>([]);

  const getAlcohols = useCallback(() => {
    axios
      .get('/alcohols.json')
      .then((res) => {
        setAlcohols(res.data.alcohols);
      })
      .catch((err) => console.error(err.response));
  }, []);

  useEffect(() => {
    let isMount = true;
    (() => {
      if (isMount) {
        getAlcohols();
      }
    })();
    return () => {
      isMount = false;
    };
  }, [getAlcohols]);
  return <AlcoholList alcohols={alcohols} styles="py-2" isAdmin />;
};

export default AdminAlcoholListPage;
