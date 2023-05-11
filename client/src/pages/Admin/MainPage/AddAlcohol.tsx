import React, { FC, useCallback } from 'react';
import AddLayout from '../../../layout/AddLayout';
import axios from 'axios';

type Props = {
  onClose: () => void;
};

const AddAlcohol: FC<Props> = ({ onClose }) => {
  const onSave = useCallback(() => {
    axios
      .get(``)
      .then((data) => {
        // data
      })
      .catch((err) => console.dir(err));
  }, []);
  return (
    <AddLayout headerText="술 등록" onClose={onClose} onSave={onSave}>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
    </AddLayout>
  );
};

export default AddAlcohol;
