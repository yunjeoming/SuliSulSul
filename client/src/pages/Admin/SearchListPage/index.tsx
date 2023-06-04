import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AlcoholList from '../../../components/AlcoholList';
import { Alcohol } from '../../../types/alcohol';

const AdminSearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;
  const [searchResults, setSearchResults] = useState<Alcohol[]>([]);

  useEffect(() => {
    if (!searchWord) return;
    const form = new FormData();
    form.append('alcNm', searchWord);
    form.append('expYn', 'false');
    form.append('cateNo', '0');
    axios.post(`/selectAlcList`, form).then((res) => {
      if (res.status.toString().startsWith('2')) {
        setSearchResults(res.data);
      }
    });
  }, [searchWord]);

  return (
    <div className="p-4">
      <div className="mb-4">"{searchWord}"로(으로) 검색한 결과입니다.</div>
      <AlcoholList alcohols={searchResults} showingType="listType" isAdmin />
    </div>
  );
};

export default AdminSearchListPage;
