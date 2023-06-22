import React, { useCallback, useEffect, useRef, useState } from 'react';
import AddLayout from '../../../layout/AddLayout';
import AlcoholAddForm from '../../../components/Alcohol/AlcoholAddForm';

type Props = {
  onClose: () => void;
};

const AddAlcohol: React.FC<Props> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [saveFunc, setSaveFunc] = useState<{ func: () => void }>({
    func: () => {},
  });
  const onSave = useCallback(() => {
    saveFunc && saveFunc.func();
  }, [saveFunc]);

  useEffect(() => {
    const parentElem = ref.current?.parentElement;
    if (!parentElem) return;
    parentElem.style.overflow = 'hidden';
    return () => {
      parentElem.style.overflow = 'auto';
    };
  }, []);

  return (
    <AddLayout headerText="술 등록" onClose={onClose} onSave={onSave} ref={ref}>
      <div className="p-4">
        <AlcoholAddForm onCancel={onClose} setSaveFunc={setSaveFunc} />
      </div>
    </AddLayout>
  );
};

export default AddAlcohol;
