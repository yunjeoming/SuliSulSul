import React from 'react';
import Main from '../../components/Main';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Main
      isOnlyBody
      headerName=""
      headerChildComponent={<></>}
      bodyComponent={
        <div>
          잘못된 경로입니다. <br />{' '}
          <Link to={`/`} className="text-blue-400 hover:text-blue-600">
            🏠 메인으로 이동
          </Link>
        </div>
      }
    />
  );
};

export default NotFoundPage;
