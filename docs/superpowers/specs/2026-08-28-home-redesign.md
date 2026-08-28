# Home Redesign — Design Spec

**Date:** 2026-08-28
**Scope:** Home page only (`/`). All other routes remain unchanged.
**Branch:** `feat/home-redesign`

---

## Overview

Replace the current Home page with a full-screen dock UI. The page shows a centered horizontal row of circular icon buttons. The active/hovered item scales up and displays a label below. A fixed status bar sits at the bottom of the viewport.

The Home route gets its own layout — no header, no footer from `WebsiteLayout`.

---

## Layout

```
┌─────────────────────────────────────────┐
│                                         │
│         (empty space — top half)        │
│                                         │
│   ○  ◉  ○  ○  ○  ○  ○   ← Dock        │
│         Active label                    │
│                                         │
│         (empty space — bottom half)     │
│                                         │
├─────────────────────────────────────────┤
│ 👤 Juan S.                      13:00  │
└─────────────────────────────────────────┘
```

- Full viewport (`h-screen w-screen overflow-hidden`)
- Background: light gray (`oklch(0.96 0 0)` — matches current `--secondary`)
- Dock + label block: centered both vertically and horizontally
- Status bar: fixed to bottom, full width, height ~56px

---

## Components

### `HomeLayout`
- Wraps the Home page with no header/footer
- Applies full-screen background
- Used exclusively by the `/` route

### `Dock`
- Horizontal flex row, `gap-4`, centered
- Renders a list of `DockItem` components
- Tracks `activeId` state (defaults to `"home"`)

### `DockItem`
Props: `id`, `icon`, `label`, `onClick`, `isActive`

- Circle button: `w-16 h-16` (inactive) / `w-20 h-20` (active)
- Background: `bg-white/60` inactive → `bg-white` active
- Border: `1px solid` with `border-border`
- Shadow: `shadow-sm` inactive → `shadow-md` active
- Scale transition: `transition-all duration-200`
- Icon size: 24px (inactive) / 28px (active)
- Label: renders below the active item only, `text-sm font-medium`

### `HomeStatusBar`
- Fixed bottom bar, `h-14`, `px-6`
- Background: same gray as page, `border-t border-border`
- Left: avatar circle (`w-8 h-8`, initials `JS` or photo) + name `Juan S.`
- Right: real-time clock, updates every 60 seconds via `useEffect`

---

## Dock Items

| ID | Icon (lucide-react) | Label | Action |
|---|---|---|---|
| `home` | `House` | Home | `navigate("/")` |
| `blog` | `FileText` | Blog | `navigate("/blog")` |
| `about` | `User` | About | `navigate("/about")` |
| `projects` | `FolderOpen` | Projects | `navigate("/projects")` |
| `contact` | `Mail` | Contact | `navigate("/contact")` |
| `language` | `Globe` | Language | Opens language dropdown |
| `theme` | `Sun` / `Moon` | Theme | Opens theme dropdown |

Navigation items set `activeId` on hover and navigate on click.
Language and Theme items open their respective dropdowns (reuse existing `LanguageToggle` and `ThemeToggle` logic) — they do not set `activeId`.

---

## Routing Change

In `Router.tsx`, the `/` route switches from `WebsiteLayout` to `HomeLayout`:

```
/ → HomeLayout → Home
/blog → WebsiteLayout → Blog
/about → WebsiteLayout → About
/projects → WebsiteLayout → Projects
/contact → WebsiteLayout → Contact
```

---

## Files to Create

```
src/
├── common/layouts/
│   └── HomeLayout/
│       └── index.tsx
└── modules/website/
    └── Home/
        ├── index.tsx              (page, replaces current Home)
        ├── components/
        │   ├── Dock/
        │   │   └── index.tsx
        │   ├── DockItem/
        │   │   └── index.tsx
        │   └── HomeStatusBar/
        │       └── index.tsx
```

## Files to Modify

- `src/routes/Router.tsx` — switch `/` to use `HomeLayout`

---

## Out of Scope

- Mobile/responsive layout (desktop-first for this exploration)
- Animations between dock sections
- Any changes to Blog, About, Projects, Contact pages
- Admin module
