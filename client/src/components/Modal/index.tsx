import React, { FC, useEffect, useRef } from 'react';
import ModalPortal from '../../ts/Portal';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  hasCloseBtn?: boolean;
};

const Modal: FC<Props> = ({ children, onClose, hasCloseBtn = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (modalRef.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [onClose]);

  return (
    <ModalPortal>
      <div className="relative bg-gray-100 w-72 border rounded-md flex flex-col items-center p-2" ref={modalRef}>
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
