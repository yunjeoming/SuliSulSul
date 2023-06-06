import React, { FC, SyntheticEvent } from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: (e?: SyntheticEvent) => void;
  styles?: string;
  disabled?: boolean;
};

const IconButton: FC<Props> = ({ children, onClick, styles = '', disabled = false }) => {
  return (
    <button
      className={`${disabled ? 'cursor-default hover:text-stone-400' : 'cursor-pointer'} ${styles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IconButton;
