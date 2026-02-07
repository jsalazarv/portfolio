import { Home, Users, Settings, NotebookPen } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { useSidebar } from "@/common/hooks/useSidebar";
import { cn } from "@/common/lib/utils";

const MENU_ITEMS = [
  {
    title: "Menú Principal",
    Items: [
      {
        path: "/",
        icon: <Home className="w-5 h-5" />,
        title: "Inicio",
      },
      {
        path: "/customers",
        icon: <Users className="w-5 h-5" />,
        title: "Usuarios",
      },
      {
        path: "/settings",
        icon: <Settings className="w-5 h-5" />,
        title: "Configuración",
      },
    ],
  },
];

export function SideBar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();

  return (
    <>
      {/* Backdrop for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-pinit-primary z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={cn(
          "flex flex-col min-h-screen bg-sidebar text-sidebar-foreground",
          "dark:bg-sidebar dark:text-sidebar-foreground",
          "border-r border-sidebar-border",
          "transition-all duration-300",
          "fixed lg:relative z-50",
          isCollapsed ? "w-20 group hover:w-64" : "w-64",
          // Add transform for mobile slide-in/out
          isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0",
        )}
      >
        {/* Logo/Header */}
        <div
          className={cn(
            "flex items-center justify-center h-17 border-b border-sidebar-border",
            isCollapsed ? "px-2 group-hover:px-6" : "px-6",
          )}
        >
          <div className="flex items-center gap-2">
            <NotebookPen className="w-5 h-5" />
            {!isCollapsed && <span className="text-xl font-bold">Tasks</span>}
          </div>
        </div>
        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 py-6",
            isCollapsed ? "px-2 group-hover:px-4" : "px-4",
          )}
        >
          {MENU_ITEMS.map(({ title, Items }) => (
            <div key={title}>
              {!isCollapsed && (
                <div className="mb-2 text-xs font-semibold uppercase tracking-widest opacity-60 select-none">
                  {title}
                </div>
              )}
              <div
                className={cn(
                  "mb-2 text-xs font-semibold uppercase tracking-widest opacity-60 select-none",
                  isCollapsed ? "hidden group-hover:block" : "hidden",
                )}
              >
                {title}
              </div>
              <ul className="space-y-2">
                {Items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={(e) => {
                        if (location.pathname === item.path) {
                          e.preventDefault();
                        }
                      }}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg transition-colors",
                          "bg-transparent",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                          "font-medium shadow-sm",
                          isCollapsed
                            ? "justify-center px-3 py-3 group-hover:justify-start group-hover:px-4"
                            : "px-4 py-3",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground",
                        )
                      }
                      title={isCollapsed ? item.title : undefined}
                    >
                      {item.icon}
                      <span
                        className={cn(
                          isCollapsed ? "hidden group-hover:inline" : "inline",
                        )}
                      >
                        {item.title}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
