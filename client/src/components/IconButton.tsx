import React, { SyntheticEvent } from 'react';

type Props = {
  children: JSX.Element;
  onClick?: (e?: SyntheticEvent) => void;
  styles?: string;
};

const IconButton = ({ children, onClick, styles = '' }: Props) => {
  return (
    <div className={`cursor-pointer ${styles}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
