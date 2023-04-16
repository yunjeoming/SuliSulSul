import React from 'react';
import { Styles } from '../constants/Styles';

type Props = {
  headerName: string;
  headerChildComponent: JSX.Element;
  bodyComponent: JSX.Element;
};

const Main = ({ headerName, headerChildComponent, bodyComponent }: Props) => {
  return (
    <div className={`flex flex-col ${Styles.MAIN_AREA_HEIGHT}`}>
      <div className="flex justify-between items-center h-10 pl-4 border-t border-b child border-stone-950">
        <span className="text-2xl flex-grow">{headerName}</span>
        {headerChildComponent}
      </div>
      <div className="p-4">{bodyComponent}</div>
    </div>
  );
};

export default Main;
