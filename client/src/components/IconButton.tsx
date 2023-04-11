import React from 'react';

type Props = {
  children: JSX.Element;
  onClick?: () => void;
};

const IconButton = ({ children, onClick }: Props) => {
  return (
    <div className="p-3 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
