import React, { SyntheticEvent, useRef } from 'react';
import IconButton from '../../../components/IconButton';
import { GoSearch } from 'react-icons/go';
import { AiOutlineHome } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import AdminAlcoholListPage from '../AlcoholListPage';
import AdminAlcoholDetailPage from '../AlcoholDetailPage';

const AdminMainPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
  };

  return (
    <div className="p-2">
      <div className="flex">
        <Link to="/admin" className="flex justify-center items-center p-2">
          <AiOutlineHome />
        </Link>
        <form className="relative" onSubmit={handleSubmit}>
          <input className="w-full rounded-lg py-2 pl-4 pr-10" placeholder="검색어를 입력해주세요." ref={inputRef} />
          <IconButton onClick={handleSubmit} styles="absolute top-0 right-0 p-3">
            <GoSearch />
          </IconButton>
        </form>
        <div>
          <button className="p-2">술 추가</button>
          {/* <button className="p-2">삭제</button> */}
        </div>
      </div>
      <Routes>
        <Route path="" element={<AdminAlcoholListPage />} />
        <Route path="login" element={<AdminAlcoholListPage />} />
        <Route path="alcs/:id" element={<AdminAlcoholDetailPage />} />
        <Route></Route>
      </Routes>
    </div>
  );
};

export default AdminMainPage;
