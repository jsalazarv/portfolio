import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { NavDockItem } from "@/modules/website/Home/components/Dock";
import { Dock } from "@/modules/website/Home/components/Dock";
import { Footer } from "@/common/layouts/WebsiteLayout/components/Footer";
import { cn } from "@/common/lib/utils";

import { DOCK_ITEMS } from "./dockItems";
import { useDockNav } from "./useDockNav";

export function RootLayout() {
  const { isHome, activeId, navigateTo } = useDockNav();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items: NavDockItem[] = DOCK_ITEMS.map((def) => ({
    id: def.id,
    icon: def.icon,
    label: t(def.labelKey),
    avatarSrc: def.avatarSrc,
    avatarFallback: def.avatarFallback,
    onClick: () => {
      navigateTo(def.id, def.path);
      setIsMobileMenuOpen(false);
    },
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Dock — fixed, transitions between center and top */}
      <div
        className={cn(
          "fixed left-1/2 z-50 transition-all duration-500 ease-in-out",
          isHome
            ? "w-full md:w-auto -translate-x-1/2 -translate-y-1/2 top-1/2"
            : "-translate-x-1/2 top-4 w-full max-w-3xl",
        )}
      >
        {isHome && (
          <p
            className="text-center text-5xl font-bold text-foreground mb-6 tracking-widest select-none"
            style={{ fontFamily: '"Doto", sans-serif', fontVariationSettings: '"ROND" 100' }}
          >
            {"jsalazarv".split("").map((char, i) => (
              <span
                key={i}
                className="glow-letter"
                style={{ animationDelay: `${i * 0.18}s` }}
              >
                {char}
              </span>
            ))}
          </p>
        )}
        <div
          className={cn(
            "transition-all duration-500",
            !isHome &&
              "w-full bg-card/80 backdrop-blur-md rounded-full px-3 py-4 flex items-center justify-between md:justify-center",
          )}
        >
          {/* Mobile: brand left + hamburger right — only on non-home routes */}
          {!isHome && (
            <>
              <span
                className="md:hidden text-sm font-bold tracking-widest select-none px-2"
                style={{ fontFamily: '"Doto", sans-serif', fontVariationSettings: '"ROND" 100' }}
              >
                jsalazarv
              </span>
              <button
                aria-label="Open menu"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-card transition-colors duration-200 cursor-pointer focus-visible:outline-none"
              >
                <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Compact dock — hidden on mobile for non-home routes */}
          <div className={cn(!isHome && "hidden md:flex")}>
            <Dock items={items} activeId={activeId} compact={!isHome} />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay — non-home only */}
      {!isHome && isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
            <Dock items={items} activeId={activeId} compact={false} />
            <button
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted transition-colors duration-200 cursor-pointer focus-visible:outline-none"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

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
