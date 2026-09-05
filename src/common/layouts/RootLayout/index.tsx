import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import { DOCK_ITEMS } from "./dockItems";
import { useDockNav } from "./useDockNav";

import type { NavDockItem } from "@/modules/website/Home/components/Dock";

import { Footer } from "@/common/layouts/WebsiteLayout/components/Footer";
import { cn } from "@/common/lib/utils";
import { Dock } from "@/modules/website/Home/components/Dock";

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
      {/* Ambient scanlines — home only */}
      {isHome && (
        <div className="fixed inset-0 pointer-events-none z-0 scanlines-overlay opacity-30" />
      )}

      {/* Dock — fixed, transitions between center and top */}
      <div
        className={cn(
          "fixed left-1/2 z-50 transition-all duration-500 ease-in-out",
          isHome
            ? "w-full md:w-auto -translate-x-1/2 -translate-y-1/2 top-1/2 px-6 md:px-0"
            : "-translate-x-1/2 top-0 w-full max-w-5xl",
        )}
      >
        {isHome ? (
          /* Home: HUD frame around nickname + dock */
          <div className="flex flex-col items-center">
            <div
              className="bg-muted-foreground/50 p-px w-full md:w-auto"
              style={{
                clipPath:
                  "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
              }}
            >
              <div
                className="relative bg-background px-8 py-8 md:px-14 md:py-10 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)",
                }}
              >
                <div className="absolute inset-0 z-10 scanlines-overlay pointer-events-none" />
                {/* HUD header label */}
                <p className="relative z-20 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70 text-center mb-6">
                  ID :: jsalazarv ·{" "}
                  <span className="text-primary animate-pulse">● ONLINE</span>
                </p>

                {/* Nickname */}
                <p
                  className="relative z-20 text-center text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-widest select-none"
                  style={{
                    fontFamily: '"Doto", sans-serif',
                    fontVariationSettings: '"ROND" 100',
                  }}
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

                {/* Dock */}
                <div className="relative z-20">
                  <Dock items={items} activeId={activeId} compact={false} />
                </div>
              </div>
            </div>

            {/* Ambient status line */}
            <p className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/60 uppercase text-center mt-3">
              SYS :: ACTIVE · LOC :: MEX · {new Date().getFullYear()}
            </p>
          </div>
        ) : (
          /* Non-home: HUD top bar */
          <div className="w-full bg-card/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center justify-between md:justify-center">
            {/* Mobile: brand left + hamburger right */}
            <span
              className="md:hidden text-sm font-bold tracking-widest select-none px-2"
              style={{
                fontFamily: '"Doto", sans-serif',
                fontVariationSettings: '"ROND" 100',
              }}
            >
              jsalazarv
            </span>
            <button
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 border border-border/60 hover:border-primary/50 transition-colors duration-200 cursor-pointer focus-visible:outline-none"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
            </button>

            {/* Desktop dock */}
            <div className="hidden md:flex">
              <Dock items={items} activeId={activeId} compact={true} />
            </div>
          </div>
        )}
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
              className="flex items-center justify-center w-10 h-10 border border-border/60 hover:border-primary/50 transition-colors duration-200 cursor-pointer focus-visible:outline-none"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      {/* Page content + footer — only on inner routes */}
      {!isHome && (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pt-28 px-4 md:px-8 pb-8 max-w-3xl mx-auto w-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
