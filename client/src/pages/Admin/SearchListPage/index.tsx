import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MockAlcoholsType } from '../../../types/mockAlcohols';
import axios from 'axios';
import AlcoholList from '../../../components/AlcoholList';

const AdminSearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;
  const [searchResults, setSearchResults] = useState<MockAlcoholsType[]>([]);

  useEffect(() => {
    // 추후 searchWord를 넣어 검색하도록 수정
    axios.get(`/alcoholsByCategory.json`).then((res) => {
      // const results = res.data.results;
      // setSearchResults(results);
      setSearchResults(res.data.alcoholsByCategory);
    });
  }, [searchWord]);

  return (
    <div className='p-4'>
      <div className="mb-4">"{searchWord}"로 검색한 결과입니다.</div>
      <AlcoholList alcohols={searchResults} showingType="listType" isAdmin />
    </div>
  );
};

export default AdminSearchListPage;
