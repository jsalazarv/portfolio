import { Outlet } from 'react-router-dom';

import { SideBar } from './components/SideBar';
import { Toolbar } from './components/Toolbar';

import type { PropsWithChildren, ReactNode } from 'react';

import { SidebarProvider } from '@/common/providers/SidebarProvider';

interface AdminLayoutProps extends PropsWithChildren {
  panel?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh overflow-hidden">
        <SideBar />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Toolbar />
          <div className="grow [&>*:first-child]:scroll-mt-16">{children || <Outlet />}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
