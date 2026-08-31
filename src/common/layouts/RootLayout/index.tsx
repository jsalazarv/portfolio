import { Outlet } from "react-router-dom";

import type { NavDockItem } from "@/modules/website/Home/components/Dock";
import { Dock } from "@/modules/website/Home/components/Dock";
import { HomeStatusBar } from "@/modules/website/Home/components/HomeStatusBar";
import { Footer } from "@/common/layouts/WebsiteLayout/components/Footer";
import { cn } from "@/common/lib/utils";

import { DOCK_ITEMS } from "./dockItems";
import { useDockNav } from "./useDockNav";

export function RootLayout() {
  const { isHome, activeId, navigateTo } = useDockNav();

  const items: NavDockItem[] = DOCK_ITEMS.map((def) => ({
    id: def.id,
    icon: def.icon,
    label: def.label,
    onClick: () => navigateTo(def.id, def.path),
  }));

  return (
    <div className={cn("min-h-screen bg-secondary", !isHome && "bg-background")}>
      {/* Dock — fixed, transitions between center and top */}
      <div
        className={cn(
          "fixed left-1/2 z-50 transition-all duration-500 ease-in-out",
          isHome
            ? "-translate-x-1/2 -translate-y-1/2 top-1/2"
            : "-translate-x-1/2 top-4 w-full max-w-3xl",
        )}
      >
        <div
          className={cn(
            "transition-all duration-500",
            !isHome &&
              "w-full bg-card/80 backdrop-blur-md rounded-2xl px-4 py-2 flex justify-center",
          )}
        >
          <Dock items={items} activeId={activeId} compact={!isHome} />
        </div>
      </div>

      {/* Status bar — only on home */}
      {isHome && <HomeStatusBar />}

      {/* Page content + footer — only on inner routes */}
      {!isHome && (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pt-32 px-4 md:px-8 pb-8 max-w-3xl mx-auto w-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
