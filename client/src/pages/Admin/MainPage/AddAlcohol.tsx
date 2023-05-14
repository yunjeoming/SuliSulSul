import React, { useCallback, useState } from 'react';
import AddLayout from '../../../layout/AddLayout';
import AlcoholEdit from '../../../components/AlcoholEdit';

type Props = {
  onClose: () => void;
};

const AddAlcohol: React.FC<Props> = ({ onClose }) => {
  const [saveFunc, setSaveFunc] = useState<{ func: () => void }>({
    func: () => {},
  });
  const onSave = useCallback(() => {
    saveFunc && saveFunc.func();
  }, [saveFunc]);

  return (
    <AddLayout headerText="술 등록" onClose={onClose} onSave={onSave}>
      <div className="p-4">
        <AlcoholEdit onCancel={onClose} setSaveFunc={setSaveFunc} />
      </div>
    </AddLayout>
  );
};

export default AddAlcohol;
