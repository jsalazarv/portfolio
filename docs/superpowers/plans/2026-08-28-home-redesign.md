# Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Home page with a full-screen dock UI — centered circular icon buttons, active item scales with label, fixed status bar at bottom.

**Architecture:** The `/` route is extracted from `WebsiteLayout` and given its own `HomeLayout` (no header/footer, full-screen gray background). The dock renders 7 items: 5 nav links + language and theme toggles. Language/theme items use `DropdownMenu` with a custom circular trigger, reusing existing hooks (`useTheme`, `useTranslation`) directly.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, lucide-react v1, React Router v7, Radix UI DropdownMenu, `cn()` utility from `@/common/lib/utils`

**Spec:** `docs/superpowers/specs/2026-08-28-home-redesign.md`

## Global Constraints

- All imports use the `@/` alias (e.g. `@/common/lib/utils`)
- No `any` or `unknown` types
- No nested `if` statements — use early returns
- Commit messages in English, no `Co-Authored-By` line
- Author: `jsalazarv <jsalazarv8@gmail.com>` — set via `GIT_COMMITTER_NAME` + `GIT_COMMITTER_EMAIL` + `--author` on every commit
- This is the `feat/home-redesign` branch — do not merge or push to `main`
- Desktop-first, no mobile layout required for this exploration

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/common/layouts/HomeLayout/index.tsx` | Full-screen wrapper with `<Outlet />`, no header/footer |
| Create | `src/modules/website/Home/components/DockItem/index.tsx` | Single circular nav button with active/inactive visual states |
| Create | `src/modules/website/Home/components/DockLanguageItem/index.tsx` | Language dropdown styled as dock circle |
| Create | `src/modules/website/Home/components/DockThemeItem/index.tsx` | Theme dropdown styled as dock circle |
| Create | `src/modules/website/Home/components/Dock/index.tsx` | Horizontal row of dock items with hover tracking |
| Create | `src/modules/website/Home/components/HomeStatusBar/index.tsx` | Fixed bottom bar — avatar, name, real-time clock |
| Modify | `src/modules/website/Home/index.tsx` | Replace old sections with Dock + HomeStatusBar |
| Modify | `src/routes/Router.tsx` | Extract `/` into its own `HomeLayout` route group |

---

### Task 1: HomeLayout

**Files:**
- Create: `src/common/layouts/HomeLayout/index.tsx`

**Interfaces:**
- Produces: `HomeLayout` — React component, no props, renders `<Outlet />`

- [ ] **Step 1: Create the file**

```tsx
// src/common/layouts/HomeLayout/index.tsx
import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-secondary">
      <Outlet />
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/common/layouts/HomeLayout/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add HomeLayout for full-screen home route"
```

---

### Task 2: DockItem

**Files:**
- Create: `src/modules/website/Home/components/DockItem/index.tsx`

**Interfaces:**
- Consumes: `cn` from `@/common/lib/utils`, `LucideIcon` from `lucide-react`
- Produces:
```ts
interface DockItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}
export function DockItem(props: DockItemProps): JSX.Element
```

- [ ] **Step 1: Create the file**

```tsx
// src/modules/website/Home/components/DockItem/index.tsx
import type { LucideIcon } from "lucide-react";

import { cn } from "@/common/lib/utils";

interface DockItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function DockItem({ icon: Icon, label, isActive, onClick }: DockItemProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        aria-label={label}
        className={cn(
          "w-16 h-16 rounded-full border border-border flex items-center justify-center transition-all duration-200 cursor-pointer",
          isActive
            ? "bg-white shadow-md scale-125"
            : "bg-white/60 shadow-sm hover:scale-125 hover:bg-white/80 hover:shadow-md",
        )}
      >
        <Icon size={24} strokeWidth={1.5} />
      </button>
      <span
        className={cn(
          "text-sm font-medium text-foreground transition-opacity duration-200",
          isActive ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/modules/website/Home/components/DockItem/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add DockItem circular button component"
```

---

### Task 3: DockLanguageItem and DockThemeItem

These utility items reuse existing hooks/logic (`useTranslation`, `useTheme`) but render as dock-styled circles using `DropdownMenu` with a custom trigger. No nested `<button>` inside `<button>` — `DropdownMenuTrigger` renders the circle directly via `asChild`.

**Files:**
- Create: `src/modules/website/Home/components/DockLanguageItem/index.tsx`
- Create: `src/modules/website/Home/components/DockThemeItem/index.tsx`

**Interfaces:**
- Consumes:
  - `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` from `@/common/components/ui/dropdown-menu`
  - `useTheme` from `@/common/hooks/useTheme`
  - `useTranslation` from `react-i18next`
  - `cn` from `@/common/lib/utils`
- Produces:
  - `DockLanguageItem()` — no props
  - `DockThemeItem()` — no props

- [ ] **Step 1: Create DockLanguageItem**

```tsx
// src/modules/website/Home/components/DockLanguageItem/index.tsx
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { cn } from "@/common/lib/utils";

const LANGS = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

const DOCK_CIRCLE_CLASSES =
  "w-16 h-16 rounded-full border border-border bg-white/60 shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-125 hover:bg-white/80 hover:shadow-md";

export function DockLanguageItem() {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "es").slice(0, 2);

  const setLang = (code: string) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="Language" className={cn(DOCK_CIRCLE_CLASSES)}>
            <Globe size={24} strokeWidth={1.5} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top">
          {LANGS.map((lang) => (
            <DropdownMenuItem key={lang.code} onClick={() => setLang(lang.code)}>
              <span>{lang.label}</span>
              {current === lang.code && <Check className="size-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="opacity-0 pointer-events-none text-sm font-medium">Language</span>
    </div>
  );
}
```

- [ ] **Step 2: Create DockThemeItem**

```tsx
// src/modules/website/Home/components/DockThemeItem/index.tsx
import { Check, Monitor, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { useTheme } from "@/common/hooks/useTheme";
import { cn } from "@/common/lib/utils";

const THEMES = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

const DOCK_CIRCLE_CLASSES =
  "w-16 h-16 rounded-full border border-border bg-white/60 shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-125 hover:bg-white/80 hover:shadow-md";

function getCurrentIcon(theme: string) {
  if (theme === "light") return <Sun size={24} strokeWidth={1.5} />;
  if (theme === "dark") return <Moon size={24} strokeWidth={1.5} />;
  return <Monitor size={24} strokeWidth={1.5} />;
}

export function DockThemeItem() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="Theme" className={cn(DOCK_CIRCLE_CLASSES)}>
            {getCurrentIcon(theme)}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top">
          {THEMES.map(({ value, label, icon: Icon }) => (
            <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
              <Icon className="size-4" />
              <span>{label}</span>
              {theme === value && <Check className="size-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="opacity-0 pointer-events-none text-sm font-medium">Theme</span>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/modules/website/Home/components/DockLanguageItem/index.tsx \
        src/modules/website/Home/components/DockThemeItem/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add DockLanguageItem and DockThemeItem utility components"
```

---

### Task 4: Dock

**Files:**
- Create: `src/modules/website/Home/components/Dock/index.tsx`

**Interfaces:**
- Consumes: `DockItem` from `../DockItem`, `DockLanguageItem` from `../DockLanguageItem`, `DockThemeItem` from `../DockThemeItem`, `LucideIcon` from `lucide-react`
- Produces:
```ts
interface NavDockItem {
  id: string;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface DockProps {
  items: NavDockItem[];
}

export function Dock(props: DockProps): JSX.Element
```

- [ ] **Step 1: Create the file**

```tsx
// src/modules/website/Home/components/Dock/index.tsx
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

import { DockItem } from "@/modules/website/Home/components/DockItem";
import { DockLanguageItem } from "@/modules/website/Home/components/DockLanguageItem";
import { DockThemeItem } from "@/modules/website/Home/components/DockThemeItem";

export interface NavDockItem {
  id: string;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface DockProps {
  items: NavDockItem[];
  defaultActiveId?: string;
}

export function Dock({ items, defaultActiveId }: DockProps) {
  const [activeId, setActiveId] = useState(defaultActiveId ?? items[0]?.id ?? "");

  return (
    <div className="flex flex-col items-center gap-0">
      <div className="flex items-center gap-4">
        {items.map((item) => (
          <DockItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeId === item.id}
            onClick={() => {
              setActiveId(item.id);
              item.onClick();
            }}
          />
        ))}
        <DockLanguageItem />
        <DockThemeItem />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/modules/website/Home/components/Dock/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add Dock container component"
```

---

### Task 5: HomeStatusBar

**Files:**
- Create: `src/modules/website/Home/components/HomeStatusBar/index.tsx`

**Interfaces:**
- Produces: `HomeStatusBar()` — no props

- [ ] **Step 1: Create the file**

```tsx
// src/modules/website/Home/components/HomeStatusBar/index.tsx
import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function HomeStatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date())), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 px-6 flex items-center justify-between border-t border-border bg-secondary">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-background select-none">JS</span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">Juan S.</span>
      </div>
      <span className="text-sm font-medium text-muted-foreground tabular-nums">
        {time}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/modules/website/Home/components/HomeStatusBar/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add HomeStatusBar with real-time clock"
```

---

### Task 6: Home page

Replace the current Home sections with the dock UI. Wire `Dock` + `HomeStatusBar`, define the 5 nav items.

**Files:**
- Modify: `src/modules/website/Home/index.tsx`

**Interfaces:**
- Consumes:
  - `Dock` + `NavDockItem` from `./components/Dock`
  - `HomeStatusBar` from `./components/HomeStatusBar`
  - `House`, `FileText`, `User`, `FolderOpen`, `Mail` from `lucide-react`
  - `useNavigate` from `react-router-dom`

- [ ] **Step 1: Rewrite the file**

```tsx
// src/modules/website/Home/index.tsx
import { FileText, FolderOpen, House, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Dock } from "@/modules/website/Home/components/Dock";
import type { NavDockItem } from "@/modules/website/Home/components/Dock";
import { HomeStatusBar } from "@/modules/website/Home/components/HomeStatusBar";

const NAV_ITEMS: NavDockItem[] = [
  { id: "home", icon: House, label: "Home", onClick: () => {} },
  { id: "blog", icon: FileText, label: "Blog", onClick: () => {} },
  { id: "about", icon: User, label: "About", onClick: () => {} },
  { id: "projects", icon: FolderOpen, label: "Projects", onClick: () => {} },
  { id: "contact", icon: Mail, label: "Contact", onClick: () => {} },
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173`. Expected:
- Gray full-screen background
- Centered horizontal dock with 7 circle buttons
- Hovering a nav item scales it up and shows label below
- Language and Theme items open dropdowns upward (`side="top"`)
- Status bar fixed at bottom with `JS` avatar, `Juan S.` name, current time

- [ ] **Step 4: Commit**

```bash
git add src/modules/website/Home/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: replace Home page with dock UI"
```

---

### Task 7: Router update

Extract `/` from `WebsiteLayout` and give it its own `HomeLayout` route group.

**Files:**
- Modify: `src/routes/Router.tsx`

- [ ] **Step 1: Update the router**

Replace the first route group (currently has `WebsiteLayout` wrapping `/`, `/blog`, `/blog/:slug`, `*`) with two separate groups:

```tsx
// src/routes/Router.tsx
import { createBrowserRouter } from "react-router-dom";

import { AdminLayout } from "@/common/layouts/AdminLayout";
import { HomeLayout } from "@/common/layouts/HomeLayout";
import { WebsiteLayout } from "@/common/layouts/WebsiteLayout";
import { Dashboard } from "@/modules/admin/Dashboard";
import { AdminBlog } from "@/modules/admin/Blog";
import { CreatePost } from "@/modules/admin/Blog/CreatePost";
import { EditPost } from "@/modules/admin/Blog/EditPost";
import { SignIn } from "@/modules/website/auth/SignIn";
import { SignUp } from "@/modules/website/auth/SignUp";
import { Home } from "@/modules/website/Home";
import { Blog } from "@/modules/website/Blog";
import { BlogPost } from "@/modules/website/Blog/BlogPost";
import { NotFound } from "@/modules/website/errors/NotFound";
import { ServerError } from "@/modules/website/errors/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ServerError />,
    children: [
      { path: "/", element: <Home /> },
    ],
  },
  {
    path: "/",
    element: <WebsiteLayout />,
    errorElement: <ServerError />,
    children: [
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogPost /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <ServerError />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <ServerError />,
  },
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <ServerError />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/blog", element: <AdminBlog /> },
      { path: "/dashboard/blog/new", element: <CreatePost /> },
      { path: "/dashboard/blog/edit/:id", element: <EditPost /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Start dev server and verify routing**

```bash
npm run dev
```

- `/` → dock UI, no header/footer
- `/blog` → Blog page with header/footer intact
- Clicking a dock nav item navigates to the correct route

- [ ] **Step 4: Commit**

```bash
git add src/routes/Router.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: extract home route into HomeLayout, isolate from WebsiteLayout"
```
