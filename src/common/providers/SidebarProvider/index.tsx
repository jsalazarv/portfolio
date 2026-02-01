import { useState, useEffect } from 'react';

import { SidebarContext } from './context';

import type { PropsWithChildren } from 'react';

import config from '@/config';

export function SidebarProvider({ children }: PropsWithChildren) {
  const cookieName = `${config.storage.prefix}SidebarCollapsed`;
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem(cookieName);
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(cookieName, JSON.stringify(isCollapsed));
  }, [isCollapsed, cookieName]);

  const toggleSidebar = () => {
    setIsCollapsed((prev: boolean) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
