import React from 'react';
import { useParams } from 'react-router-dom';

const AdminAlcoholDetailPage = () => {
  const { id } = useParams();
  return <div>{id} - AdminAlcoholDetailPage</div>;
};

export default AdminAlcoholDetailPage;
