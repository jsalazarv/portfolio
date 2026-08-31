import {
  BashIcon,
  FileTextIcon,
  Home01Icon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

import type { IconSvgElement } from "@hugeicons/react";

export interface DockItemDef {
  id: string;
  icon: IconSvgElement;
  label: string;
  path: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export const DOCK_ITEMS: DockItemDef[] = [
  { id: "home", icon: Home01Icon, label: "Home", path: "/" },
  { id: "blog", icon: FileTextIcon, label: "Blog", path: "/blog" },
  { id: "about", icon: UserIcon, label: "About", path: "/about", avatarSrc: "/avatar.jpg", avatarFallback: "JS" },
  { id: "projects", icon: BashIcon, label: "Projects", path: "/projects" },
  { id: "contact", icon: Mail01Icon, label: "Contact", path: "/contact" },
];
