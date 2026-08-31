import {
  BellIcon,
  ChevronRightIcon,
  Menu01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/common/components/ui/button";
import { useSidebar } from "@/common/hooks/useSidebar";

function NotificationButton() {
  return (
    <div className="relative">
      <Button variant="ghost" size="icon">
        <HugeiconsIcon icon={BellIcon} size={20} strokeWidth={1.5} className="text-foreground" />
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
            {isCollapsed
              ? <HugeiconsIcon icon={ChevronRightIcon} size={20} strokeWidth={1.5} />
              : <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
            }
          </Button>
        </div>
        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={Search01Icon} size={20} strokeWidth={1.5} />
          </Button>
          <NotificationButton />
        </div>
      </div>
    </div>
  );
}
