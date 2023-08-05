import React, { FC } from 'react';

type Props = {
  headerName: string;
  children?: React.ReactNode;
};

const SubHeaderLayout: FC<Props> = ({ headerName = '', children }) => {
  return (
    <div className="flex justify-between items-center h-10 border-t border-b child border-stone-950">
      <span className="text-2xl flex-grow pl-4">{headerName}</span>
      {children}
    </div>
  );
};

export default SubHeaderLayout;
