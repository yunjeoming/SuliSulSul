import React from 'react';
import { useParams } from 'react-router-dom';

const AlcoholDetailPage = () => {
  const { id } = useParams();
  return <div>{id} - AlcoholDetailPage</div>;
};

export default AlcoholDetailPage;
