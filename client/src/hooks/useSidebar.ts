import { useCallback, useState } from 'react';
import { SidebarType } from '../types/common';

const useSidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<SidebarType>({
    category: false,
    search: false,
  });

  const initSidebar = useCallback(() => {
    setIsOpenSidebar({
      category: false,
      search: false,
    });
  }, []);

  const clickTargetBtn = useCallback((target: keyof SidebarType) => {
    const thisBtn: keyof SidebarType = target === 'category' ? 'category' : 'search';
    const otherBtn: keyof SidebarType = target === 'category' ? 'search' : 'category';

    setIsOpenSidebar((prev) => ({
      ...prev,
      [`${thisBtn}`]: !prev[`${thisBtn}`],
      [`${otherBtn}`]: false,
    }));
  }, []);

  const closeTargetSidebar = useCallback((target: keyof SidebarType) => {
    setIsOpenSidebar((prev) => ({
      ...prev,
      [`${target}`]: false,
    }));
  }, []);

  return { isOpenSidebar, initSidebar, clickTargetBtn, closeTargetSidebar };
};

export default useSidebar;
