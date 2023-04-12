import React from 'react';

type Props = {
  children: JSX.Element;
  onClick?: () => void;
  styles?: string;
};

const IconButton = ({ children, onClick, styles }: Props) => {
  return (
    <div className={`p-3 cursor-pointer ${styles}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
