# Dock Navigation Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate the dock from center-screen (Home) to top-center (inner pages) on navigation, keeping it permanently visible as a header across all website routes.

**Architecture:** Replace `HomeLayout` + `WebsiteLayout` with a single `RootLayout` that owns the dock permanently. The dock's position is driven by a CSS transition on a `fixed` container: centered vertically on `/`, top-fixed on all other routes. Navigation is intercepted in the dock — `navigate()` is called only after a short delay that lets the animation start, avoiding a hard flash. The `WebsiteLayout` header (`<Header />`) is removed from inner pages since the dock replaces it.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, React Router v7, `useLocation` + `useNavigate`, CSS transitions (`transition-all duration-500`)

**Spec:** `docs/superpowers/specs/2026-08-28-home-redesign.md`

## Global Constraints

- All imports use the `@/` alias
- No `any` or `unknown` types — no `as` casts
- No nested `if` statements — use early returns
- Commit messages in English, no `Co-Authored-By` line
- Author: `jsalazarv <jsalazarv8@gmail.com>` — set via `GIT_COMMITTER_NAME` + `GIT_COMMITTER_EMAIL` + `--author` on every commit
- Branch: `feat/home-redesign` — do not merge or push to `main`
- Desktop-first, mobile grid layout already implemented

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/common/layouts/RootLayout/index.tsx` | Owns the dock permanently; positions it via CSS transition based on current route |
| Create | `src/common/layouts/RootLayout/useDockNav.ts` | Hook that intercepts navigation, triggers transition, then calls `navigate()` |
| Create | `src/common/layouts/RootLayout/dockItems.tsx` | Static dock item definitions (icons + route mapping) |
| Modify | `src/routes/Router.tsx` | Replace `HomeLayout` + website `WebsiteLayout` group with single `RootLayout` group |
| Delete | `src/common/layouts/HomeLayout/index.tsx` | No longer needed — `RootLayout` covers the home route |
| Modify | `src/modules/website/Home/index.tsx` | Remove dock + status bar — owned by `RootLayout` now |

---

### Task 1: useDockNav hook

Intercepts navigation: sets `navigatingTo` state (triggers animation), waits 400ms, then calls `navigate()`. Also derives `isHome` from `useLocation`.

**Files:**
- Create: `src/common/layouts/RootLayout/useDockNav.ts`

**Interfaces:**
- Consumes: `useNavigate`, `useLocation` from `react-router-dom`
- Produces:
```ts
interface UseDockNavReturn {
  isHome: boolean;
  activeId: string;
  navigateTo: (id: string, path: string) => void;
}
export function useDockNav(): UseDockNavReturn
```

- [ ] **Step 1: Create the file**

```ts
// src/common/layouts/RootLayout/useDockNav.ts
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/common/layouts/RootLayout/useDockNav.ts
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add useDockNav hook for animated navigation"
```

---

### Task 2: dockItems definition

Static list of dock items with icons and route paths. Centralizes the item definitions that `RootLayout` will use.

**Files:**
- Create: `src/common/layouts/RootLayout/dockItems.tsx`

**Interfaces:**
- Consumes: `LucideIcon` from `lucide-react`
- Produces:
```ts
export interface DockItemDef {
  id: string;
  icon: LucideIcon;
  label: string;
  path: string;
}
export const DOCK_ITEMS: DockItemDef[]
```

- [ ] **Step 1: Create the file**

```tsx
// src/common/layouts/RootLayout/dockItems.tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/common/layouts/RootLayout/dockItems.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add dock item definitions"
```

---

### Task 3: RootLayout

The core of this feature. Owns the dock with `position: fixed`. Uses `isHome` from `useDockNav` to toggle between two CSS states:

- **Home:** `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` — centered
- **Inner:** `top-6 left-1/2 -translate-x-1/2 translate-y-0` — top-center

`transition-all duration-500` interpolates between these states smoothly. The `<Outlet />` renders the page content below the dock. On home, content area is hidden (the dock IS the home UI). On inner pages, content has `pt-32` to clear the fixed dock.

**Files:**
- Create: `src/common/layouts/RootLayout/index.tsx`

**Interfaces:**
- Consumes:
  - `useDockNav`, `UseDockNavReturn` from `./useDockNav`
  - `DOCK_ITEMS` from `./dockItems`
  - `Dock`, `NavDockItem` from `@/modules/website/Home/components/Dock`
  - `HomeStatusBar` from `@/modules/website/Home/components/HomeStatusBar`
  - `Footer` from `@/common/layouts/WebsiteLayout/components/Footer`
  - `cn` from `@/common/lib/utils`
  - `Outlet` from `react-router-dom`
- Produces: `RootLayout()` — no props

- [ ] **Step 1: Create the file**

```tsx
// src/common/layouts/RootLayout/index.tsx
import { Outlet } from "react-router-dom";

import type { NavDockItem } from "@/modules/website/Home/components/Dock";
import { Dock } from "@/modules/website/Home/components/Dock";
import { HomeStatusBar } from "@/modules/website/Home/components/HomeStatusBar";
import { Footer } from "@/common/layouts/WebsiteLayout/components/Footer";
import { cn } from "@/common/lib/utils";

import { DOCK_ITEMS } from "./dockItems";
import { useDockNav } from "./useDockNav";

export function RootLayout() {
  const { isHome, activeId, navigateTo } = useDockNav();

  const items: NavDockItem[] = DOCK_ITEMS.map((def) => ({
    id: def.id,
    icon: def.icon,
    label: def.label,
    onClick: () => navigateTo(def.id, def.path),
  }));

  return (
    <div className={cn("min-h-screen bg-secondary", !isHome && "bg-background")}>
      {/* Dock — fixed, transitions between center and top */}
      <div
        className={cn(
          "fixed left-1/2 z-50 transition-all duration-500 ease-in-out",
          isHome
            ? "-translate-x-1/2 -translate-y-1/2 top-1/2"
            : "-translate-x-1/2 top-6",
        )}
      >
        <Dock items={items} activeId={activeId} />
      </div>

      {/* Status bar — only on home */}
      {isHome && <HomeStatusBar />}

      {/* Page content + footer — only on inner routes */}
      {!isHome && (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pt-32 px-4 md:px-8 pb-8 max-w-3xl mx-auto w-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: TypeScript error — `Dock` does not accept `activeId` prop yet. This is expected; fix in Task 4.

- [ ] **Step 3: Do NOT commit yet** — Task 4 makes this compile.

---

### Task 4: Dock — accept external activeId

`Dock` currently manages `activeId` internally with `useState`. `RootLayout` needs to control it externally (so the active state reflects the URL). Make `activeId` a controlled prop while keeping backward compatibility via an optional prop.

**Files:**
- Modify: `src/modules/website/Home/components/Dock/index.tsx`

**Interfaces:**
- Consumes: same as before
- Produces:
```ts
interface DockProps {
  items: NavDockItem[];
  activeId: string;          // now required, controlled externally
  defaultActiveId?: string;  // removed — no longer needed
}
```

- [ ] **Step 1: Update Dock to accept controlled activeId**

Replace the full file content:

```tsx
// src/modules/website/Home/components/Dock/index.tsx
import { useRef } from "react";

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
  activeId: string;
}

export function Dock({ items, activeId }: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    e.preventDefault();

    const buttons = Array.from(
      containerRef.current?.querySelectorAll<HTMLButtonElement>("[data-dock-button]") ?? [],
    );

    const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const total = buttons.length;

    const nextIndex =
      e.key === "ArrowRight"
        ? (currentIndex + 1) % total
        : (currentIndex - 1 + total) % total;

    buttons[nextIndex]?.focus();
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 gap-3 px-6 md:flex md:items-center md:gap-8 md:px-0"
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => (
        <DockItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={activeId === item.id}
          onClick={item.onClick}
        />
      ))}
      <DockLanguageItem />
      <DockThemeItem />
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds — `RootLayout` and `Dock` now agree on `activeId`.

- [ ] **Step 3: Commit both RootLayout and Dock together**

```bash
git add \
  src/common/layouts/RootLayout/index.tsx \
  src/common/layouts/RootLayout/useDockNav.ts \
  src/common/layouts/RootLayout/dockItems.tsx \
  src/modules/website/Home/components/Dock/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: add RootLayout with animated dock transition"
```

---

### Task 5: Router + WebsiteLayout + Home cleanup

Wire everything together. `HomeLayout` is deleted. `WebsiteLayout` loses `<Header />`. `Home` page becomes an empty placeholder (the dock is the home UI, rendered by `RootLayout`). The router uses a single `RootLayout` group for all website routes.

**Files:**
- Modify: `src/routes/Router.tsx`
- Modify: `src/modules/website/Home/index.tsx`
- Delete: `src/common/layouts/HomeLayout/index.tsx`

**Interfaces:**
- Consumes: `RootLayout` from `@/common/layouts/RootLayout`

- [ ] **Step 1: Update Router.tsx**

```tsx
// src/routes/Router.tsx
import { createBrowserRouter } from "react-router-dom";

import { AdminLayout } from "@/common/layouts/AdminLayout";
import { RootLayout } from "@/common/layouts/RootLayout";
import { AdminBlog } from "@/modules/admin/Blog";
import { CreatePost } from "@/modules/admin/Blog/CreatePost";
import { EditPost } from "@/modules/admin/Blog/EditPost";
import { Dashboard } from "@/modules/admin/Dashboard";
import { SignIn } from "@/modules/website/auth/SignIn";
import { SignUp } from "@/modules/website/auth/SignUp";
import { Blog } from "@/modules/website/Blog";
import { BlogPost } from "@/modules/website/Blog/BlogPost";
import { NotFound } from "@/modules/website/errors/NotFound";
import { ServerError } from "@/modules/website/errors/ServerError";
import { Home } from "@/modules/website/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ServerError />,
    children: [
      { path: "/", element: <Home /> },
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

- [ ] **Step 2: Simplify Home — remove dock and status bar**

`RootLayout` now owns the dock. Home renders nothing (the dock centered on screen IS the home UI). But we need a valid JSX element as the route element:

```tsx
// src/modules/website/Home/index.tsx
export function Home() {
  return null;
}
```

- [ ] **Step 3: Delete HomeLayout**

```bash
rm src/common/layouts/HomeLayout/index.tsx
rmdir src/common/layouts/HomeLayout
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 5: Start dev server and verify behavior**

```bash
npm run dev
```

Open `http://localhost:5173`. Check:
- `/` → dock centered, status bar at bottom, gray background
- Click "Blog" → dock animates upward to top-center (~400ms), then `/blog` loads with dock as header
- Click "Home" in dock → dock animates back to center, background turns gray
- Dock active item matches current route on page load and after navigation

- [ ] **Step 6: Commit**

```bash
git add \
  src/routes/Router.tsx \
  src/modules/website/Home/index.tsx
git rm src/common/layouts/HomeLayout/index.tsx
GIT_COMMITTER_NAME="jsalazarv" GIT_COMMITTER_EMAIL="jsalazarv8@gmail.com" \
git commit --author="jsalazarv <jsalazarv8@gmail.com>" \
  -m "feat: wire RootLayout into router, remove HomeLayout"
```
