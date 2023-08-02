import { useLocation } from 'react-router-dom';
import AlcoholList from '../../components/Alcohol/AlcoholList';
import MainLayout from '../../layout/MainLayout';
import { Alcohol } from '../../types/alcohol';
import { useQuery } from '@tanstack/react-query';
import AlcoholAPI from '../../api/alcohol';
import { queryKeys } from '../../queryClient';

const SearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;

  const { data: searchResults = [] } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL, searchWord],
    queryFn: () => AlcoholAPI.getAlcoholsBySearchWord(searchWord),
  });

  return (
    <MainLayout>
      <div>
        <div className="mb-4">"{searchWord}" 검색 결과입니다.</div>
        <AlcoholList alcohols={searchResults} showingType="listType" />
      </div>
    </MainLayout>
  );
};

export default SearchListPage;
