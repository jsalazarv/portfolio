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
  labelKey: string;
  path: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export const DOCK_ITEMS: DockItemDef[] = [
  {
    id: "about",
    icon: UserIcon,
    labelKey: "nav.about",
    path: "/about",
    avatarSrc: "/avatar.jpg",
    avatarFallback: "JS",
  },
  { id: "home", icon: Home01Icon, labelKey: "nav.home", path: "/" },
  { id: "blog", icon: FileTextIcon, labelKey: "nav.blog", path: "/blog" },
  {
    id: "projects",
    icon: BashIcon,
    labelKey: "nav.projects",
    path: "/projects",
  },
  {
    id: "contact",
    icon: Mail01Icon,
    labelKey: "nav.contact",
    path: "/contact",
  },
];
