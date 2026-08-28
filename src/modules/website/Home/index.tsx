import { FileText, FolderOpen, House, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { NavDockItem } from "@/modules/website/Home/components/Dock";

import { Dock } from "@/modules/website/Home/components/Dock";
import { HomeStatusBar } from "@/modules/website/Home/components/HomeStatusBar";

const NAV_ITEMS: Omit<NavDockItem, "onClick">[] = [
  { id: "home", icon: House, label: "Home" },
  { id: "blog", icon: FileText, label: "Blog" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: FolderOpen, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function Home() {
  const navigate = useNavigate();

  const items: NavDockItem[] = NAV_ITEMS.map((item) => ({
    ...item,
    onClick: () => navigate(item.id === "home" ? "/" : `/${item.id}`),
  }));

  return (
    <div className="h-full flex items-center justify-center pb-14">
      <Dock items={items} defaultActiveId="home" />
      <HomeStatusBar />
    </div>
  );
}
