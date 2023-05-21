import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AlcoholList from '../../components/AlcoholList';
import MainLayout from '../../layout/MainLayout';
import { Alcohol } from '../../types/alcohol';

const SearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;
  const [searchResults, setSearchResults] = useState<Alcohol[]>([]);

  useEffect(() => {
    // 추후 searchWord를 넣어 검색하도록 수정
    axios.get(`/selectAlcList?alcNm=${searchWord}`).then((res) => {
      // const results = res.data.results;
      // setSearchResults(results);
      setSearchResults(res.data.alcoholsByCategory);
    });
  });

  return (
    <MainLayout>
      <div>
        <div className="mb-4">"{searchWord}"로 검색한 결과입니다.</div>
        <AlcoholList alcohols={searchResults} showingType="listType" />
      </div>
    </MainLayout>
  );
};

export default SearchListPage;
