import { ReactNode, useLayoutEffect, useState } from 'react';

const createElement = (elementId: string) => {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    const newElement = document.createElement('div');
    newElement.setAttribute('class', elementId);
    document.body.appendChild(newElement);
    return newElement;
  }
  return targetElement;
};

const Portal = ({ children }: { children: ReactNode }) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const newElement = createElement('portal');
    setPortalElement(newElement);
    return () => {
      newElement.remove();
    };
  }, []);

  return portalElement ? ReactDom.createPortal(children, portalElement) : null;
};

export default Portal;
