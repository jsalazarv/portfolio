import { Check, Monitor, Moon, Sun } from "lucide-react";
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
    if (theme === "light") return <Sun className="size-4" />;
    if (theme === "dark") return <Moon className="size-4" />;
    return <Monitor className="size-4" />;
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
          <Monitor className="size-4" />
          <span>Sistema</span>
          {theme === "system" && <Check className="size-4 ml-auto" />}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="size-4" />
          <span>Claro</span>
          {theme === "light" && <Check className="size-4 ml-auto" />}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="size-4" />
          <span>Oscuro</span>
          {theme === "dark" && <Check className="size-4 ml-auto" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
