import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { LanguageToggle } from "@/common/components/LanguageToggle";
import { ThemeToggle } from "@/common/components/ThemeToggle";
import { cn } from "@/common/lib/utils";
import { useTranslation } from "react-i18next";

const NAV_ITEMS = [
  { path: "/", labelKey: "nav.home" },
  { path: "/about", labelKey: "nav.about" },
  { path: "/projects", labelKey: "nav.projects" },
  { path: "/contact", labelKey: "nav.contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto max-w-3xl bg-card border border-border rounded-2xl px-4 md:px-8 mt-5 mb-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
          >
            JS
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </nav>

            {/* Theme Toggle - Desktop */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border hover:border-foreground/40 transition-colors text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors hover:text-foreground px-2 py-1",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}

              {/* Theme Toggle - Mobile */}
              <div className="px-2 pt-2 border-t border-border">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("header.theme")}
                  </span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center gap-2 pt-3 justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("header.language")}
                  </span>
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
