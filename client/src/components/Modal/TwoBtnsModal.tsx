import React, { MouseEventHandler } from 'react';
import Modal from '.';

type Props = {
  content: string;
  onClose: () => void;
  onLeftFn: () => void;
  onRightFn: MouseEventHandler<HTMLButtonElement>;
  closeBtnName?: string;
  okBtnName?: string;
  isOpen: boolean;
};

const TwoBtnsModal: React.FC<Props> = ({
  content = '',
  onClose,
  onLeftFn,
  onRightFn,
  closeBtnName = '취소',
  okBtnName = '확인',
  isOpen,
}) => {
  const lines = content.split('\n');
  return isOpen ? (
    <Modal onClose={onClose}>
      <div className="p-6">
        {lines.map((line, index) => (
          <React.Fragment key={line + index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      <div className="w-full flex justify-end border-t">
        <button className="p-2 w-1/2 border-r hover:bg-gray-200" onClick={onLeftFn}>
          {closeBtnName}
        </button>
        <button className="p-2 w-1/2 hover:bg-gray-200" onClick={onRightFn}>
          {okBtnName}
        </button>
      </div>
    </Modal>
  ) : null;
};

export default TwoBtnsModal;
