import { FileText, FolderOpen, House, Mail, User } from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface DockItemDef {
  id: string;
  icon: LucideIcon;
  label: string;
  path: string;
}

export const DOCK_ITEMS: DockItemDef[] = [
  { id: "home", icon: House, label: "Home", path: "/" },
  { id: "blog", icon: FileText, label: "Blog", path: "/blog" },
  { id: "about", icon: User, label: "About", path: "/about" },
  { id: "projects", icon: FolderOpen, label: "Projects", path: "/projects" },
  { id: "contact", icon: Mail, label: "Contact", path: "/contact" },
];
