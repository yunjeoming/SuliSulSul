import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AlcoholEdit from '../../../components/AlcoholEdit';
import MainLayout from '../../../layout/MainLayout';
import SubHeader from '../../../components/SubHeader';
import { Alcohol } from '../../../types/alcohol';

const AdminAlcoholDetailPage = () => {
  const { no } = useParams();
  const [alcohol, setAlcohol] = useState<Alcohol | null>(null);

  const getAlcohol = useCallback(() => {
    if (!no) return;
    const form = new FormData();
    form.append('alcNo', no);

    axios
      .post(`/selectAlcDetail`, form)
      .then((res) => {
        if (res.data) {
          setAlcohol(res.data.alcData);
        }
      })
      .catch((err) => console.error(err));
  }, [no]);

  useEffect(() => {
    getAlcohol();
    // eslint-disable-next-line
  }, [no]);

  return alcohol ? (
    <>
      <MainLayout>
        <SubHeader headerName={alcohol.alcNm} />
        <div>
          <AlcoholEdit alcohol={alcohol} />
        </div>
      </MainLayout>
    </>
  ) : null;
};

export default AdminAlcoholDetailPage;
