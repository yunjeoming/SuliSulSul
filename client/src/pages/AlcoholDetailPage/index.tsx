import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MockAlcoholsType } from '../../types/mockAlcohols';
import MainStyle from '../../components/MainStyle';

const AlcoholDetailPage = () => {
  const { id } = useParams();
  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);
  useEffect(() => {
    axios
      .get(`/alcohols.json`)
      .then((res) => {
        const targetAlcohol = res.data.alcohols.find((a: MockAlcoholsType) => a.no === Number(id)) as MockAlcoholsType;
        setAlcohol(targetAlcohol);
      })
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <MainStyle>
      <div className="flex justify-between items-center pl-4 border-t border-b child border-stone-950">
        <span className="text-2xl flex-grow">title</span>
        <span>stars</span>
      </div>
      <section>info</section>
      <section>reviews</section>
    </MainStyle>
  );
};

export default AlcoholDetailPage;
