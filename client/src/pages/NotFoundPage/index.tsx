import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div>
        잘못된 경로입니다. <br />{' '}
        <Link to={`/`} className="text-blue-400 hover:text-blue-600">
          🏠 메인으로 이동
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
