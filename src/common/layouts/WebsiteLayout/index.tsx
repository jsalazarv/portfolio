import { Outlet } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import type { PropsWithChildren } from "react";

export function WebsiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background flex flex-col gap-4 p-4 md:p-8">
      <Header />
      <main className="flex-1 flex flex-col">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}
