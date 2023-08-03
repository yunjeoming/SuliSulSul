import { useLocation } from 'react-router-dom';
import AlcoholList from '../../components/Alcohol/AlcoholList';
import { Alcohol } from '../../types/alcohol';
import { useQuery } from '@tanstack/react-query';
import AlcoholAPI from '../../api/alcohol';
import { queryKeys } from '../../queryClient';
import SearchTitle from '../../components/SearchTitle';

const SearchListPage = () => {
  const location = useLocation();
  const { searchWord } = location.state;

  const { data: searchResults = [] } = useQuery<Alcohol[]>({
    queryKey: [queryKeys.ALCOHOL, searchWord],
    queryFn: () => AlcoholAPI.getAlcoholsBySearchWord(searchWord),
  });

  return (
    <>
      <SearchTitle searchWord={searchWord} />
      <AlcoholList alcohols={searchResults} showingType="listType" />
    </>
  );
};

export default SearchListPage;
