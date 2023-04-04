import React from 'react';

type Props = {
  children: JSX.Element;
};

const IconButton = ({ children }: Props) => {
  return <div className="p-3">{children}</div>;
};

export default IconButton;
