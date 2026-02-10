import { Menu, Search, Bell, ChevronRight } from "lucide-react";

import { Button } from "@/common/components/ui/button";
import { useSidebar } from "@/common/hooks/useSidebar";

function NotificationButton() {
  return (
    <div className="relative">
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5 text-foreground" />
      </Button>
      <span className="absolute -top-1 -right-1 bg-green-500 text-primary-foreground text-[10px] rounded-full px-1.5 py-0.5 flex items-center justify-center border border-background shadow">
        0
      </span>
    </div>
  );
}

export function Toolbar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="sticky top-0 z-50">
      <div className="flex h-17 items-center justify-between bg-popover text-popover-foreground px-4 border-b border-sidebar-border">
        {/* Left: Hamburger */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight /> : <Menu />}
          </Button>
        </div>
        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <NotificationButton />
        </div>
      </div>
    </div>
  );
}
