import {
  CheckIcon,
  MonitorIcon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { useTheme } from "@/common/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getCurrentIcon = () => {
    if (theme === "light")
      return <HugeiconsIcon icon={Sun01Icon} size={16} strokeWidth={1.5} />;
    if (theme === "dark")
      return <HugeiconsIcon icon={Moon01Icon} size={16} strokeWidth={1.5} />;
    return <HugeiconsIcon icon={MonitorIcon} size={16} strokeWidth={1.5} />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Cambiar tema">
          {getCurrentIcon()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <HugeiconsIcon icon={MonitorIcon} size={16} strokeWidth={1.5} />
          <span>Sistema</span>
          {theme === "system" && (
            <HugeiconsIcon icon={CheckIcon} size={16} className="ml-auto" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("light")}>
          <HugeiconsIcon icon={Sun01Icon} size={16} strokeWidth={1.5} />
          <span>Claro</span>
          {theme === "light" && (
            <HugeiconsIcon icon={CheckIcon} size={16} className="ml-auto" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <HugeiconsIcon icon={Moon01Icon} size={16} strokeWidth={1.5} />
          <span>Oscuro</span>
          {theme === "dark" && (
            <HugeiconsIcon icon={CheckIcon} size={16} className="ml-auto" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
