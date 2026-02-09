import { Outlet } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import type { PropsWithChildren } from "react";

export function WebsiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background flex flex-col gap-4 p-4 md:p-8 overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col min-w-0">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
