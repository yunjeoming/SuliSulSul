import React from 'react';
import Modal from '.';

type Props = {
  content: string;
  onClose: () => void;
};

const OneBtnModal: React.FC<Props> = ({ content = '', onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="p-4">{content}</div>
      <button className="w-full border rounded-md py-1 hover:bg-gray-200" onClick={onClose}>
        확인
      </button>
    </Modal>
  );
};

export default OneBtnModal;
