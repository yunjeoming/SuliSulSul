import { ReactNode, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const createElement = (id: string) => {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    return targetElement as HTMLDivElement;
  } else {
    const newElement = document.createElement('div');
    newElement.setAttribute('id', id);
    newElement.style.position = 'absolute';
    newElement.style.top = '0';
    newElement.style.left = '0';
    newElement.style.width = '100%';
    newElement.style.height = '100vh';
    newElement.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    newElement.style.zIndex = '11';
    
    newElement.style.display = 'flex';
    newElement.style.justifyContent = 'center';
    newElement.style.alignItems = 'center';
    document.body.appendChild(newElement);
    return newElement;
  }
};

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const targetElement = createElement('modal');
    setModalElement(targetElement);
    return () => {
      targetElement.remove();
    };
  }, []);

  return modalElement ? ReactDOM.createPortal(children, modalElement) : null;
};

export default ModalPortal;
