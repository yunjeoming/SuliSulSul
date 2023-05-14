import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockAlcoholsType } from '../../../types/mockAlcohols';
import AlcoholEdit from '../../../components/AlcoholEdit';
import MainLayout from '../../../layout/MainLayout';
import SubHeader from '../../../components/SubHeader';

const AdminAlcoholDetailPage = () => {
  const { id } = useParams();
  const [alcohol, setAlcohol] = useState<MockAlcoholsType | null>(null);

  const getAlcohol = useCallback(() => {
    axios
      .get(`/alcohols.json`)
      .then((res) => {
        const targetAlcohol = res.data.alcohols.find((a: MockAlcoholsType) => a.no === Number(id)) as MockAlcoholsType;
        setAlcohol(targetAlcohol);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    getAlcohol();
    // eslint-disable-next-line
  }, [id]);

  return alcohol ? (
    <>
      <MainLayout>
        <SubHeader headerName={alcohol.name} />
        <div>
          <AlcoholEdit alcohol={alcohol} />
        </div>
      </MainLayout>
    </>
  ) : null;
};

export default AdminAlcoholDetailPage;
