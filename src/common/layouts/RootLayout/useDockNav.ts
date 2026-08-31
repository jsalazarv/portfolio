import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TRANSITION_DELAY_MS = 400;

function pathToId(pathname: string): string {
  if (pathname === "/") return "home";
  return pathname.replace(/^\//, "").split("/")[0];
}

export interface UseDockNavReturn {
  isHome: boolean;
  activeId: string;
  navigateTo: (id: string, path: string) => void;
}

export function useDockNav(): UseDockNavReturn {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState(() => pathToId(pathname));

  useEffect(() => {
    setActiveId(pathToId(pathname));
  }, [pathname]);

  const isHome = pathname === "/";

  const navigateTo = useCallback(
    (id: string, path: string) => {
      setActiveId(id);
      setTimeout(() => navigate(path), TRANSITION_DELAY_MS);
    },
    [navigate],
  );

  return { isHome, activeId, navigateTo };
}
