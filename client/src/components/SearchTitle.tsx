import { FC } from 'react';

type Props = {
  searchWord: string;
};
const SearchTitle: FC<Props> = ({ searchWord }) => {
  return <div className="p-4 pb-0">"{searchWord}" 검색 결과입니다.</div>;
};

export default SearchTitle;
