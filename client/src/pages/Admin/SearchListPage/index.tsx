import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import AlcoholAPI from '../../../api/alcohol';
import AlcoholList from '../../../components/Alcohol/AlcoholList';
import { Alcohol } from '../../../types/alcohol';
import { queryKeys } from '../../../queryClient';

const AdminSearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;

  const { data: searchResults = [] } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL, searchWord],
    queryFn: () => AlcoholAPI.getAlcoholsBySearchWord(searchWord),
  });

  return (
    <div className="p-4">
      <div className="mb-4">"{searchWord}" 검색 결과입니다.</div>
      <AlcoholList alcohols={searchResults} showingType="listType" isAdmin />
    </div>
  );
};

export default AdminSearchListPage;
