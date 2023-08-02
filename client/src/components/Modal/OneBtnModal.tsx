import React from 'react';
import Modal from '.';

type Props = {
  isOpen: boolean;
  content: string;
  onClose: () => void;
};

const OneBtnModal: React.FC<Props> = ({ isOpen, content = '', onClose }) => {
  return isOpen ? (
    <Modal onClose={onClose}>
      <div className="p-6">{content}</div>
      <button className="w-full border-t p-2 hover:bg-gray-200" onClick={onClose}>
        확인
      </button>
    </Modal>
  ) : null;
};

export default OneBtnModal;
