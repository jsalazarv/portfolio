import { useEffect, useState } from "react";

function pathToId(pathname: string): string {
  if (pathname === "/") return "home";
  return pathname.replace(/^\//, "").split("/")[0];
}

export interface UseDockNavReturn {
  isHome: boolean;
  activeId: string;
  path: string;
}

export function useDockNav(initialPath: string): UseDockNavReturn {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const handlePageLoad = () => setPath(window.location.pathname);
    document.addEventListener("astro:page-load", handlePageLoad);
    return () =>
      document.removeEventListener("astro:page-load", handlePageLoad);
  }, []);

  return { isHome: path === "/", activeId: pathToId(path), path };
}
