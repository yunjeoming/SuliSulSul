import React from 'react';

type Props = {
  children: JSX.Element;
};

const IconButton = ({ children }: Props) => {
  const handleClick = () => {

  }
  return <div className="p-3 cursor-pointer" onClick={handleClick}>{children}</div>;
};

export default IconButton;
