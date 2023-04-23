import React, { FC } from 'react';
import ModalPortal from '../ts/Portal';

type Props = {
  children: JSX.Element;
  onClose: () => void;
  hasCloseBtn?: boolean;
};

const Modal: FC<Props> = ({ children, onClose, hasCloseBtn = false }) => {
  return (
    <ModalPortal>
      <div className="relative bg-gray-100 w-72 border rounded-md">
        {hasCloseBtn && (
          <button className="absolute top-2 right-2 hover:text-gray-500" onClick={onClose}>
            X
          </button>
        )}
        {children}
      </div>
    </ModalPortal>
  );
};

export default Modal;
