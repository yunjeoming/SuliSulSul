import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AlcoholList from '../../../components/AlcoholList';
import { Alcohol } from '../../../types/alcohol';

const AdminAlcoholListPage = () => {
  const [alcohols, setAlcohols] = useState<Alcohol[]>([]);

  const getAlcohols = useCallback(() => {
    axios
      .get(`/selectAlcList`)
      .then((res) => {
        setAlcohols(res.data);
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
