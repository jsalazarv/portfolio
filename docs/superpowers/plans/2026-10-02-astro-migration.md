# Migración a Astro — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el stack Vite + React Router SPA del portfolio por Astro, sin perder animaciones, rutas ni características, eliminando el admin/auth (gestionado ahora por EmDash CMS) y dejando el Blog listo para consumir EmDash vía un adapter desacoplado.

**Architecture:** Astro con output estático (SSG). Un `BaseLayout.astro` compartido monta `<ClientRouter />` (View Transitions) y un único island React persistido (`NavShell`, `transition:persist`) que contiene el Dock de navegación animado — sobrevive a cada navegación sin remount. Cada página de contenido (About/Projects/Contact, y una pequeña isla invisible para Home) es su propio island React independiente (`client:load`), prácticamente un puerto 1:1 del componente actual. El Blog es Astro nativo (SSG real) salvo una isla pequeña de búsqueda/filtro en el listado; el post individual no lleva JS de React. Los datos del Blog pasan por un adapter `CmsClient` (mock hoy sobre `posts.json`, EmDash después) para no reescribir las páginas cuando EmDash esté listo.

**Tech Stack:** Astro 5, `@astrojs/react`, React 19 (sin cambios), Tailwind v4 vía `@tailwindcss/vite` (sin cambios), Vitest (nuevo, solo para `lib/cms.ts`).

**Spec:** `docs/superpowers/specs/2026-10-02-astro-migration-design.md`

## Global Constraints

- No se pierden animaciones, rutas ni características existentes (requisito explícito del usuario).
- Sitio 100% estático (SSG), sin adapter SSR.
- Variables de entorno de cliente usan prefijo `PUBLIC_*` (Astro), nunca `VITE_*`.
- `portfolio-api` no se toca.
- `CMS_PROVIDER` (env var, solo build-time/servidor, sin prefijo `PUBLIC_`) selecciona el `CmsClient`; hoy solo existe `"mock"`.
- El Dock de navegación (`NavShell`) debe persistir su DOM/estado entre navegaciones vía `<ClientRouter />` + `transition:persist`, sin remount visible.
- `src/modules/admin/**`, `src/modules/website/auth/**`, `/dashboard*`, `/sign-in`, `/sign-up` se eliminan por completo.
- No se porta código muerto (ver lista completa en el spec, sección "Código muerto detectado"): partials/data viejos de Home, `Terminal`/`Stickers`/`StopSign` de About, `WebsiteLayout`/`Header`/`LanguageToggle`/`ThemeToggle`, `embla-carousel`/`ui/carousel.tsx`, `Blog/mockPosts.ts`, los skeletons de Blog y `ui/Skeleton`.
- Node >=20 (ya declarado en `package.json`).

## Review Focus

- Cambiar idioma desde el Dock en una página que no es Home debe traducir también el contenido de esa página (no solo el Dock) — riesgo de instancias `i18next` no compartidas entre islands. (Task 2, Task 6-8)
- Navegar entre rutas no debe desmontar/remontar visualmente el Dock (sin parpadeo) — riesgo de que `transition:persist`/`transition:name` no matcheen entre páginas. (Task 2)
- `blog/[slug].astro` con un slug inexistente debe responder 404 real en build/deploy, no crashear el build ni servir una página en blanco. (Task 4)
- El formulario de Contact (y el de `DossierModal` en About) deben seguir funcionando con las env vars `PUBLIC_*` en producción — fácil de romper si queda una referencia residual a `VITE_*`. (Task 8, Task 6)
- El 404 debe seguir reflejando el idioma activo (toggle instantáneo) a pesar de montarse dentro de `BaseLayout` como cualquier otra página. (Task 5)

---

### Task 1: Scaffold del proyecto Astro

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Modify: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro` (placeholder, se reemplaza en Task 2)
- Delete (temporalmente fuera del grafo de build, se borran físicamente en Task 9): ninguno todavía — `vite.config.ts`, `index.html`, `tsconfig.app.json`, `tsconfig.node.json` quedan sin usar pero no se tocan aún.

**Interfaces:**
- Produces: comando `npm run dev` → `astro dev`; `npm run build` → `astro build`; `npm run preview` → `astro preview`. Alias `@/*` → `./src/*` disponible en `.astro` y `.ts(x)`.

- [ ] **Step 1: Instalar dependencias de Astro**

```bash
npm install astro @astrojs/react
npm install -D vitest
```

- [ ] **Step 2: Crear `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Reemplazar `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 4: Crear `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 5: Actualizar scripts de `package.json`**

Reemplazar el bloque `"scripts"` existente por:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "test": "vitest run",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

- [ ] **Step 6: Crear placeholder `src/pages/index.astro`**

```astro
---
---
<html lang="es">
  <head><title>jsalazarv</title></head>
  <body>Migración en progreso</body>
</html>
```

(Se reemplaza por completo en el Task 2 — este placeholder solo existe para validar que el toolchain compila.)

- [ ] **Step 7: Verificar que el build de Astro funciona**

Run: `npm run build`
Expected: termina sin errores, genera `dist/index.html`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts src/pages/index.astro
git commit -m "Scaffold Astro toolchain alongside existing Vite app"
```

---

### Task 2: `BaseLayout` + `NavShell` persistido + página Home

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/react/NavShell/index.tsx` (puerto de `src/common/layouts/RootLayout/index.tsx`, sin el bloque `{!isHome && <Outlet/>+Footer}`)
- Create: `src/components/react/NavShell/useDockNav.ts` (reescritura de `src/common/layouts/RootLayout/useDockNav.ts`)
- Create: `src/components/react/NavShell/useDocumentMeta.ts` (puerto simplificado de `src/common/hooks/useDocumentMeta.ts`)
- Move (`git mv`, sin cambios de contenido): `src/common/layouts/RootLayout/dockItems.tsx` → `src/components/react/NavShell/dockItems.tsx`
- Move (`git mv`, sin cambios de contenido): `src/modules/website/Home/components/Dock/` → `src/components/react/Dock/`
- Move (`git mv`, sin cambios de contenido): `src/modules/website/Home/components/DockItem/` → `src/components/react/DockItem/`
- Move (`git mv`, sin cambios de contenido): `src/modules/website/Home/components/DockLanguageItem/` → `src/components/react/DockLanguageItem/`
- Move (`git mv`, sin cambios de contenido): `src/modules/website/Home/components/DockThemeItem/` → `src/components/react/DockThemeItem/`
- Move (`git mv`, sin cambios de contenido): `src/modules/website/Home/components/DockSoundItem/` → `src/components/react/DockSoundItem/`
- Move (`git mv`, sin cambios de contenido): `src/common/layouts/WebsiteLayout/components/Footer/` → `src/components/react/Footer/`
- Move (`git mv`, sin cambios de contenido): `src/modules/website/Home/index.tsx` → `src/components/react/Home/index.tsx`
- Create: `src/pages/index.astro` (reemplaza el placeholder del Task 1)
- Create: `src/common/providers/AppProviders.tsx` (envuelve `ThemeProvider` + `SoundProvider`, hoy están solo en `App.tsx`)

**Interfaces:**
- Consumes: `DOCK_ITEMS` de `dockItems.tsx` (sin cambios de forma); `useTheme`/`useClickSound` existentes sin cambios; `resources` de `src/i18n/resources.ts`.
- Produces:
  - `NavShell({ initialPath: string }): JSX.Element` — default export desde `src/components/react/NavShell/index.tsx`.
  - `BaseLayout.astro` con `Astro.props`: `{ title: string; description: string; image?: string; url: string; type?: "website" | "article" }`, y un `<slot />` para el contenido de cada página.
  - `AppProviders({ children }: PropsWithChildren): JSX.Element` — envoltorio reutilizado por cada island de página en tasks posteriores.

- [ ] **Step 1: Mover los componentes del Dock sin tocar su contenido**

```bash
git mv src/common/layouts/RootLayout/dockItems.tsx src/components/react/NavShell/dockItems.tsx
git mv src/modules/website/Home/components/Dock src/components/react/Dock
git mv src/modules/website/Home/components/DockItem src/components/react/DockItem
git mv src/modules/website/Home/components/DockLanguageItem src/components/react/DockLanguageItem
git mv src/modules/website/Home/components/DockThemeItem src/components/react/DockThemeItem
git mv src/modules/website/Home/components/DockSoundItem src/components/react/DockSoundItem
git mv src/common/layouts/WebsiteLayout/components/Footer src/components/react/Footer
git mv src/modules/website/Home/index.tsx src/components/react/Home/index.tsx
```

Dentro de `src/components/react/Dock/index.tsx`, actualizar únicamente los imports (el resto del archivo no cambia):

```ts
import { DockItem } from "@/components/react/DockItem";
import { DockLanguageItem } from "@/components/react/DockLanguageItem";
import { DockSoundItem } from "@/components/react/DockSoundItem";
import { DockThemeItem } from "@/components/react/DockThemeItem";
```

- [ ] **Step 2: Crear `AppProviders`**

```tsx
// src/common/providers/AppProviders.tsx
import type { PropsWithChildren } from "react";

import "@/i18n";

import { SoundProvider } from "@/common/providers/SoundProvider";
import { ThemeProvider } from "@/common/providers/ThemeProvider";
import config from "@/config";

export function AppProviders({ children }: PropsWithChildren) {
  const themeStorageKey = `${config.storage.prefix}Theme`;
  const soundStorageKey = `${config.storage.prefix}Sound`;

  return (
    <ThemeProvider defaultTheme="system" storageKey={themeStorageKey}>
      <SoundProvider storageKey={soundStorageKey}>{children}</SoundProvider>
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Reescribir el hook de navegación sin React Router**

```ts
// src/components/react/NavShell/useDockNav.ts
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
```

- [ ] **Step 4: Puerto simplificado de `useDocumentMeta`**

El original tenía un mecanismo de "título self-managed" para `/` y `/projects` que duplicaba lo que esos mismos componentes ya hacen con su propio `<SEO>`. Se conserva solo la parte no duplicada: `og:locale` y el `<link rel="canonical">`.

```ts
// src/components/react/NavShell/useDocumentMeta.ts
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LOCALE_MAP: Record<string, string> = { en: "en_US", es: "es_MX" };
const ALTERNATE_LOCALE_MAP: Record<string, string> = {
  en: "es_MX",
  es: "en_US",
};

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

function setCanonical(path: string) {
  const canonical =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
    (() => {
      const link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
      return link;
    })();

  canonical.href = `https://jsalazarv.dev${path}`;
}

export function useDocumentMeta(path: string) {
  const { i18n } = useTranslation();

  useEffect(() => {
    setMeta(
      'meta[property="og:locale"]',
      LOCALE_MAP[i18n.language] ?? "en_US",
    );
    setMeta(
      'meta[property="og:locale:alternate"]',
      ALTERNATE_LOCALE_MAP[i18n.language] ?? "es_MX",
    );
  }, [i18n.language]);

  useEffect(() => {
    setCanonical(path);
  }, [path]);
}
```

- [ ] **Step 5: Crear `NavShell`**

Puerto de `src/common/layouts/RootLayout/index.tsx`: mismo JSX del HUD/Dock/mobile-menu/scanlines, sin el bloque final `{!isHome && (<div>...<Outlet/><Footer/></div>)}` (ese contenido ahora vive en `BaseLayout.astro`), usando `navigate` de Astro en vez de `useNavigate` de React Router.

```tsx
// src/components/react/NavShell/index.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "astro:transitions/client";

import { DOCK_ITEMS } from "./dockItems";
import { useDockNav } from "./useDockNav";
import { useDocumentMeta } from "./useDocumentMeta";

import type { NavDockItem } from "@/components/react/Dock";

import { AppProviders } from "@/common/providers/AppProviders";
import { cn } from "@/common/lib/utils";
import { Dock } from "@/components/react/Dock";

export interface NavShellProps {
  initialPath: string;
}

function NavShellInner({ initialPath }: NavShellProps) {
  const { isHome, activeId, path } = useDockNav(initialPath);
  const { t } = useTranslation();
  useDocumentMeta(path);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items: NavDockItem[] = DOCK_ITEMS.map((def) => ({
    id: def.id,
    icon: def.icon,
    label: t(def.labelKey),
    avatarSrc: def.avatarSrc,
    avatarFallback: def.avatarFallback,
    onClick: () => {
      navigate(def.path);
      setIsMobileMenuOpen(false);
    },
  }));

  return (
    <>
      {isHome && (
        <div className="fixed inset-0 pointer-events-none z-0 scanlines-overlay opacity-30" />
      )}

      <div
        className={cn(
          "fixed left-1/2 z-50 transition-all duration-500 ease-in-out",
          isHome
            ? "w-full md:w-auto -translate-x-1/2 -translate-y-1/2 top-1/2 px-6 md:px-0"
            : "-translate-x-1/2 top-0 w-full max-w-5xl",
        )}
      >
        {isHome ? (
          <div className="flex flex-col items-center">
            <div
              className="bg-muted-foreground/50 p-px w-full md:w-auto"
              style={{
                clipPath:
                  "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
              }}
            >
              <div
                className="relative bg-background overflow-hidden"
                style={{
                  clipPath:
                    "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)",
                }}
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-border font-mono text-[11px] backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                  <span className="text-primary tracking-widest uppercase">
                    [ jsalazarv ]
                  </span>
                  <span className="ml-auto text-muted-foreground tracking-wider uppercase">
                    SYS :: ACTIVE
                  </span>
                </div>

                <div className="relative px-8 py-8 md:px-14 md:py-10">
                  <div className="absolute inset-0 z-10 scanlines-overlay pointer-events-none" />

                  <p
                    className="relative z-20 text-center text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-widest select-none"
                    style={{
                      fontFamily: '"Doto", sans-serif',
                      fontVariationSettings: '"ROND" 100',
                    }}
                  >
                    {"jsalazarv".split("").map((char, i) => (
                      <span
                        key={i}
                        className="glow-letter"
                        style={{ animationDelay: `${i * 0.18}s` }}
                      >
                        {char}
                      </span>
                    ))}
                  </p>

                  <div className="relative z-20">
                    <Dock items={items} activeId={activeId} compact={false} />
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-1.5 bg-muted/60 border-t border-border font-mono text-[10px] text-muted-foreground tracking-wider backdrop-blur-sm">
                  <span>ID::jsalazarv</span>
                  <span className="text-border">|</span>
                  <span>LOC::MEX</span>
                  <span className="text-border">|</span>
                  <span className="text-green-500">● ONLINE</span>
                  <span className="ml-auto">{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-card/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center justify-between md:justify-center">
            <span
              className="md:hidden text-sm font-bold tracking-widest select-none px-2"
              style={{
                fontFamily: '"Doto", sans-serif',
                fontVariationSettings: '"ROND" 100',
              }}
            >
              jsalazarv
            </span>
            <div className="md:hidden relative">
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath:
                    "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)",
                  background:
                    "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
                }}
              />
              <span
                className="absolute inset-[1px]"
                style={{
                  clipPath:
                    "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)",
                  background: "var(--card)",
                }}
              />
              <button
                aria-label="Open menu"
                onClick={() => setIsMobileMenuOpen(true)}
                className="relative z-10 font-mono text-[10px] tracking-widest uppercase text-muted-foreground cursor-pointer focus-visible:outline-none px-3 py-1.5"
              >
                menu
              </button>
            </div>

            <div className="hidden md:flex">
              <Dock items={items} activeId={activeId} compact={true} />
            </div>
          </div>
        )}
      </div>

      {!isHome && isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="w-full flex flex-col gap-4">
              <Dock items={items} activeId={activeId} compact={false} />
              <div className="relative w-full">
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath:
                      "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)",
                    background:
                      "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
                  }}
                />
                <span
                  className="absolute inset-[1px]"
                  style={{
                    clipPath:
                      "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)",
                    background: "var(--card)",
                  }}
                />
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative z-10 w-full font-mono text-[10px] tracking-widest uppercase text-muted-foreground cursor-pointer focus-visible:outline-none px-3 py-1.5 text-center"
                >
                  {t("nav.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function NavShell(props: NavShellProps) {
  return (
    <AppProviders>
      <NavShellInner {...props} />
    </AppProviders>
  );
}
```

- [ ] **Step 6: Crear `BaseLayout.astro`**

Porta el `<head>` de `index.html` (meta/JSON-LD), agrega `<ClientRouter />`, el script de init de tema/idioma pre-paint, monta `NavShell` persistido, y envuelve el `<slot/>` en el `<main>+Footer` solo cuando la página no es Home (igual que hacía `RootLayout`).

```astro
---
import { ClientRouter } from "astro:transitions";

import { NavShell } from "../components/react/NavShell";
import { Footer } from "../components/react/Footer";

import "../global.css";

interface Props {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: "website" | "article";
}

const {
  title,
  description,
  image = "https://jsalazarv.dev/og-image-1200x630.png",
  url,
  type = "website",
} = Astro.props;

const isHome = Astro.url.pathname === "/";
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/favicon.jpeg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Doto:ROND@0..100&display=swap"
      rel="stylesheet"
    />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={url} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="es_MX" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="author" content="Juan Salazar" />
    <meta name="robots" content="index, follow" />
    <meta
      name="theme-color"
      content="#f5f8fa"
      media="(prefers-color-scheme: light)"
    />
    <meta
      name="theme-color"
      content="#090b0b"
      media="(prefers-color-scheme: dark)"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href={url} />
    <title>{title}</title>
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Juan Salazar",
      url: "https://jsalazarv.dev",
      jobTitle: "Fullstack Developer",
      image: "https://jsalazarv.dev/avatar.png",
      sameAs: [
        "https://github.com/jsalazarv",
        "https://linkedin.com/in/jsalazarv",
      ],
    })} />
    <ClientRouter />
    <script is:inline>
      (function () {
        var storedTheme = localStorage.getItem("__PTMngrTheme");
        var theme =
          storedTheme === "light" || storedTheme === "dark"
            ? storedTheme
            : window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light";
        document.documentElement.classList.add(theme);

        var storedLang = localStorage.getItem("lang");
        var browserLang = navigator.language.toLowerCase();
        var lang = storedLang || (browserLang.startsWith("es") ? "es" : "en");
        document.documentElement.lang = lang;
      })();
    </script>
  </head>
  <body>
    <div class="min-h-screen bg-background">
      <div transition:persist transition:name="nav-shell">
        <NavShell client:load initialPath={Astro.url.pathname} />
      </div>

      {isHome ? (
        <slot />
      ) : (
        <div class="flex flex-col min-h-screen">
          <main class="flex-1 pt-28 px-4 md:px-8 pb-4 max-w-3xl mx-auto w-full">
            <slot />
          </main>
          <Footer client:load />
        </div>
      )}
    </div>
  </body>
</html>
```

Nota sobre el `storageKey` de tema en el script inline: `ThemeProvider` usa `` `${config.storage.prefix}Theme` ``, y `src/config/storage.ts` define `prefix: "__PTMngr"` — de ahí el literal `"__PTMngrTheme"` usado arriba. Si ese prefijo cambia en el futuro, este literal debe actualizarse junto con él para seguir evitando el FOUC.

- [ ] **Step 7: Crear `src/pages/index.astro` real**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { Home } from "../components/react/Home";
---
<BaseLayout
  title="jsalazarv"
  description="Portfolio de Juan Salazar, Fullstack Developer especializado en Vue, React y TypeScript."
  url="https://jsalazarv.dev/"
>
  <Home client:load />
</BaseLayout>
```

En `src/components/react/Home/index.tsx`, agregar `import "@/i18n";` como primera línea (el resto del archivo no cambia: solo renderiza `<SEO>`).

- [ ] **Step 8: Build y verificación manual**

Run: `npm run build && npm run preview`
Expected: build sin errores. Abrir `/` manualmente y confirmar que el Dock/HUD se ve y anima igual que en `main` (toggle de idioma/tema/sonido instantáneo).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Add BaseLayout and persistent NavShell island; port Home route"
```

---

### Task 3: Adapter de datos del Blog (`lib/cms.ts`) con TDD

**Files:**
- Move: `src/mocks/data/posts.json` → `src/lib/data/posts.json`
- Create: `src/lib/cms.ts`
- Create: `src/lib/cms.test.ts`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces:
  ```ts
  export interface CmsClient {
    getPosts(): Promise<BlogPost[]>;
    getPost(slug: string): Promise<BlogPost | null>;
  }
  export const mockCmsClient: CmsClient;
  export function createCmsClient(provider?: string): CmsClient;
  export const cms: CmsClient;
  ```
  Usado por las páginas del Blog en el Task 4.

- [ ] **Step 1: Mover los datos**

```bash
git mv src/mocks/data/posts.json src/lib/data/posts.json
```

- [ ] **Step 2: Crear `vitest.config.ts`**

```ts
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 3: Escribir el test (falla primero)**

```ts
// src/lib/cms.test.ts
import { describe, expect, it } from "vitest";

import { createCmsClient, mockCmsClient } from "./cms";

describe("mockCmsClient", () => {
  it("returns only published posts sorted by publishedAt desc", async () => {
    const posts = await mockCmsClient.getPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.status === "published")).toBe(true);
    for (let i = 1; i < posts.length; i++) {
      expect(
        new Date(posts[i - 1].publishedAt).getTime(),
      ).toBeGreaterThanOrEqual(new Date(posts[i].publishedAt).getTime());
    }
  });

  it("returns a post by slug", async () => {
    const posts = await mockCmsClient.getPosts();
    const target = posts[0];

    const found = await mockCmsClient.getPost(target.slug);

    expect(found?.slug).toBe(target.slug);
  });

  it("returns null for an unknown slug", async () => {
    const found = await mockCmsClient.getPost("no-existe-este-slug");

    expect(found).toBeNull();
  });
});

describe("createCmsClient", () => {
  it("returns the mock client for the mock provider", () => {
    expect(createCmsClient("mock")).toBe(mockCmsClient);
  });

  it("throws for an unimplemented provider", () => {
    expect(() => createCmsClient("emdash")).toThrow(/emdash/i);
  });
});
```

- [ ] **Step 4: Ejecutar y confirmar que falla**

Run: `npx vitest run src/lib/cms.test.ts`
Expected: FAIL — `Cannot find module './cms'`.

- [ ] **Step 5: Implementar `lib/cms.ts`**

```ts
// src/lib/cms.ts
import postsData from "./data/posts.json";

import type { BlogPost } from "@/common/types/blog.types";

export interface CmsClient {
  getPosts(): Promise<BlogPost[]>;
  getPost(slug: string): Promise<BlogPost | null>;
}

function sortByPublishedDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export const mockCmsClient: CmsClient = {
  async getPosts() {
    const posts = postsData as BlogPost[];
    return sortByPublishedDateDesc(
      posts.filter((post) => post.status === "published"),
    );
  },
  async getPost(slug) {
    const posts = postsData as BlogPost[];
    return (
      posts.find(
        (post) => post.slug === slug && post.status === "published",
      ) ?? null
    );
  },
};

export function createCmsClient(
  provider: string = import.meta.env.CMS_PROVIDER ?? "mock",
): CmsClient {
  if (provider === "mock") return mockCmsClient;
  throw new Error(
    `Unknown CMS_PROVIDER "${provider}". Only "mock" is implemented until EmDash is configured.`,
  );
}

export const cms: CmsClient = createCmsClient();
```

- [ ] **Step 6: Ejecutar y confirmar que pasa**

Run: `npx vitest run src/lib/cms.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 7: Commit**

```bash
git add src/lib vitest.config.ts
git commit -m "Add CMS adapter for Blog data with Vitest coverage"
```

---

### Task 4: Páginas del Blog (listado + detalle) en Astro nativo

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/components/react/BlogSearch/index.tsx` (puerto de la lógica interactiva de `src/modules/website/Blog/index.tsx`)
- Move (sin cambios de contenido salvo el import de `react-router-dom` → `<a>`): `src/modules/website/Blog/components/PostCardWide.tsx` → `src/components/react/PostCardWide.tsx`
- Move (idem): `src/modules/website/Blog/components/PostCard.tsx` → `src/components/react/PostCard.tsx`
- Move (sin cambios): `src/common/utils/readingTime.ts` queda donde está, se sigue usando.
- Move (sin cambios): `src/modules/website/Blog/components/SearchBar.tsx` → `src/components/react/SearchBar.tsx`
- Delete: `src/modules/website/Blog/mockPosts.ts` (código muerto, ver Global Constraints)
- Delete: `src/modules/website/Blog/index.tsx`, `src/modules/website/Blog/BlogPost.tsx`, `src/modules/website/Blog/components/RelatedPosts.tsx` (reemplazados por `blog/index.astro`, `blog/[slug].astro` y `BlogSearch`; su lógica ya quedó portada en los Steps siguientes)

**Interfaces:**
- Consumes: `cms.getPosts()` / `cms.getPost(slug)` del Task 3.
- Produces: ruta `/blog` y `/blog/:slug` funcionando con los mismos textos de `resources.ts` para labels (`blog.*`).

- [ ] **Step 1: Mover `PostCard`/`PostCardWide` y quitar su dependencia de React Router**

```bash
git mv src/modules/website/Blog/components/PostCardWide.tsx src/components/react/PostCardWide.tsx
git mv src/modules/website/Blog/components/PostCard.tsx src/components/react/PostCard.tsx
git mv src/modules/website/Blog/components/SearchBar.tsx src/components/react/SearchBar.tsx
```

En ambos archivos, reemplazar:

```tsx
import { Link } from "react-router-dom";
```

por nada (se elimina el import), y cambiar:

```tsx
<Link to={`/blog/${post.slug}`} ...>
```

por:

```tsx
<a href={`/blog/${post.slug}`} ...>
```

(cerrando con `</a>` en vez de `</Link>`; el resto del JSX y las clases no cambian).

- [ ] **Step 2: Crear la isla de búsqueda/filtro del listado**

Puerto de la lógica de `src/modules/website/Blog/index.tsx` (funciones `groupByCategory`, `filterPosts`, componentes `CategoryFilter`/`CategoryRow` y el estado de `search`/`selectedCategory`), ahora recibiendo los posts ya resueltos como prop en vez de `MOCK_POSTS`:

```tsx
// src/components/react/BlogSearch/index.tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/i18n";

import type { BlogPost } from "@/common/types/blog.types";

import { cn } from "@/common/lib/utils";
import { PostCardWide } from "@/components/react/PostCardWide";
import { SearchBar } from "@/components/react/SearchBar";

function groupByCategory(posts: BlogPost[]): Record<string, BlogPost[]> {
  return posts.reduce<Record<string, BlogPost[]>>((acc, post) => {
    post.categories.forEach((cat) => {
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(post);
    });
    return acc;
  }, {});
}

function filterPosts(posts: BlogPost[], search: string): BlogPost[] {
  if (!search.trim()) return posts;
  const term = search.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      post.categories.some((cat) => cat.toLowerCase().includes(term)),
  );
}

const CLIP_BEVEL_OUTER =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

function CategoryFilter({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isHighlighted = isActive || isHovered;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isActive ? (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: CLIP_BEVEL_OUTER, background: "var(--primary)" }}
        />
      ) : (
        <span
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-200",
            isHighlighted ? "opacity-100" : "opacity-0",
          )}
        >
          <span
            className="absolute inset-0"
            style={{
              clipPath: CLIP_BEVEL_OUTER,
              background:
                "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
            }}
          />
          <span
            className="absolute inset-[1px] bg-background"
            style={{ clipPath: CLIP_BEVEL_INNER }}
          />
        </span>
      )}
      <button
        onClick={onClick}
        className={cn(
          "relative z-10 font-mono text-[10px] tracking-widest uppercase px-3 py-1 cursor-pointer transition-colors duration-200 focus-visible:outline-none",
          isActive
            ? "text-primary-foreground"
            : isHighlighted
              ? "text-foreground"
              : "text-muted-foreground",
        )}
      >
        {label}
      </button>
    </div>
  );
}

function CategoryRow({
  category,
  posts,
}: {
  category: string;
  posts: BlogPost[];
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3 px-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
          cat::
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground">
          {category}
        </span>
        <span className="font-mono text-[9px] text-muted-foreground/40 ml-auto">
          {t("blog.recordCount", {
            count: String(posts.length).padStart(2, "0"),
          })}
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory px-4">
        {posts.map((post) => (
          <PostCardWide key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export interface BlogSearchProps {
  posts: BlogPost[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );

  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.categories))).sort(),
    [posts],
  );

  const filtered = useMemo(() => filterPosts(posts, search), [posts, search]);
  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  const visibleCategories = useMemo(
    () =>
      selectedCategory
        ? categories.filter((c) => c === selectedCategory)
        : categories,
    [categories, selectedCategory],
  );

  const isEmpty = filtered.length === 0;

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-4 bg-muted/60 border-b border-border font-mono text-[12px] backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
        <span className="text-primary tracking-widest uppercase">
          [ {t("blog.hud.title")} ]
        </span>
        <span className="ml-auto text-muted-foreground tracking-wider">
          {String(posts.length).padStart(3, "0")} {t("blog.hud.records")}
        </span>
      </div>
      <div className="relative z-20 px-4 py-3 border-b border-border/40">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {t("blog.subtitle")}
        </p>
      </div>

      <div className="relative z-20 px-4 py-3 border-b border-border/40 space-y-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={t("blog.search")}
        />
        <div className="flex gap-2 flex-wrap">
          <CategoryFilter
            label={t("blog.all")}
            isActive={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          />
          {categories.map((cat) => (
            <CategoryFilter
              key={cat}
              label={cat}
              isActive={selectedCategory === cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 py-6 space-y-6">
        {isEmpty ? (
          <div className="py-12 text-center">
            <p className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase">
              {t("blog.empty.title")}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider mt-2">
              {t("blog.empty.subtitle")}
            </p>
          </div>
        ) : (
          visibleCategories
            .filter((cat) => (grouped[cat]?.length ?? 0) > 0)
            .map((cat, i, arr) => (
              <div
                key={cat}
                className={cn(
                  i < arr.length - 1 && "border-b border-border/40 pb-6",
                )}
              >
                <CategoryRow category={cat} posts={grouped[cat]} />
              </div>
            ))
        )}
      </div>

      <div className="relative z-20 flex items-center justify-between px-4 py-1.5 bg-muted/60 border-t border-border font-mono text-[10px] tracking-wider text-muted-foreground/50 uppercase">
        <span>{selectedCategory ?? t("blog.all")}</span>
        <span>
          {String(filtered.length).padStart(3, "0")} {t("blog.hud.records")}
        </span>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Crear `src/pages/blog/index.astro`**

El header/subtítulo HUD de `Blog/index.tsx` que no depende de estado (título, contador total) se porta directo a markup Astro; solo la parte de búsqueda/filtro/listado es la isla.

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { BlogSearch } from "../../components/react/BlogSearch";
import { cms } from "../../lib/cms";

const posts = await cms.getPosts();
---
<BaseLayout
  title="Blog | Juan Salazar"
  description="Artículos sobre desarrollo web, clean code, React, TypeScript y experiencias como desarrollador freelance"
  url="https://jsalazarv.dev/blog"
>
  <div class="-mt-8">
    <div
      class="bg-muted-foreground/50 p-px"
      style="clip-path: polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px);"
    >
      <div
        class="relative bg-background overflow-hidden px-2"
        style="clip-path: polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px);"
      >
        <div class="absolute inset-0 scanlines-overlay pointer-events-none z-10" />

        <BlogSearch client:load posts={posts} />
      </div>
    </div>
  </div>
</BaseLayout>
```

Todo el texto visible (header, contador, subtítulo, búsqueda, filtros, resultados) vive dentro de `BlogSearch` — la única isla de esta página — precisamente para que siga siendo 100% reactivo al toggle de idioma del Dock, igual que hoy. El `.astro` solo aporta el marco HUD decorativo (los `div` con `clip-path`, sin texto).

- [ ] **Step 4: Crear `src/pages/blog/[slug].astro`**

Posts relacionados calculados en build time con el mismo scoring de `RelatedPosts.tsx`. Markdown renderizado con `react-markdown` sin `client:*`.

```astro
---
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import BaseLayout from "../../layouts/BaseLayout.astro";
import { PostCard } from "../../components/react/PostCard";
import { cms } from "../../lib/cms";
import { calculateReadingTime, formatReadingTime } from "../../common/utils/readingTime";

export async function getStaticPaths() {
  const posts = await cms.getPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;

const allPosts = await cms.getPosts();
const relatedPosts = allPosts
  .filter((p) => p.id !== post.id)
  .map((p) => {
    let score = 0;
    p.categories.forEach((cat) => {
      if (post.categories.includes(cat)) score += 3;
    });
    p.tags.forEach((tag) => {
      if (post.tags.includes(tag)) score += 1;
    });
    return { post: p, score };
  })
  .filter(({ score }) => score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 2)
  .map(({ post: p }) => p);
---
<BaseLayout
  title={`${post.title} | Blog`}
  description={post.description}
  image={post.coverImage}
  url={`https://jsalazarv.dev/blog/${post.slug}`}
  type="article"
>
  <article class="mx-auto w-full md:max-w-3xl space-y-8 py-8">
    <a href="/blog" class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
      ← Volver al blog
    </a>

    {post.coverImage && (
      <img
        src={post.coverImage}
        alt={post.title}
        class="w-full h-64 md:h-96 object-cover rounded-2xl"
      />
    )}

    <div class="space-y-4">
      <div class="flex gap-2 flex-wrap">
        {post.categories.map((cat: string) => (
          <span class="text-xs rounded-full bg-secondary px-2.5 py-0.5">{cat}</span>
        ))}
      </div>

      <h1 class="text-4xl md:text-5xl font-bold text-foreground">{post.title}</h1>
      <p class="text-lg text-muted-foreground">{post.description}</p>

      <div class="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{post.author}</span>
        <span>
          {format(new Date(post.publishedAt || post.createdAt), "dd 'de' MMMM, yyyy", { locale: es })}
        </span>
        <span>{formatReadingTime(calculateReadingTime(post.content))}</span>
      </div>
    </div>

    <div class="prose prose-gray dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    </div>

    {post.tags.length > 0 && (
      <div class="flex gap-2 flex-wrap pt-8 border-t border-border">
        <span class="text-sm font-medium text-muted-foreground">Tags:</span>
        {post.tags.map((tag: string) => (
          <span class="text-xs rounded-full border px-2.5 py-0.5">#{tag}</span>
        ))}
      </div>
    )}

    {relatedPosts.length > 0 && (
      <section class="space-y-6 pt-12 border-t">
        <h2 class="text-2xl font-bold text-foreground">Posts Relacionados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.map((related) => (
            <PostCard post={related} />
          ))}
        </div>
      </section>
    )}
  </article>
</BaseLayout>
```

- [ ] **Step 5: Borrar el código del Blog ya reemplazado**

```bash
git rm src/modules/website/Blog/mockPosts.ts
git rm src/modules/website/Blog/components/PostCardSkeleton.tsx
git rm src/modules/website/Blog/components/BlogPostSkeleton.tsx
git rm src/modules/website/Blog/components/PostCardWideSkeleton.tsx
git rm src/modules/website/Blog/components/RelatedPosts.tsx
git rm src/modules/website/Blog/index.tsx
git rm src/modules/website/Blog/BlogPost.tsx
```

Con esto `src/modules/website/Blog/` queda vacío (todo lo que seguía vivo ya se movió en los Steps 1-2); eliminar también la carpeta vacía. Confirmar primero con `grep -rln "modules/website/Blog" src` que ningún archivo restante importa algo de ahí.

- [ ] **Step 6: Build y verificación manual**

Run: `npm run build && npm run preview`
Expected: `/blog` lista los posts de `posts.json` agrupados por categoría, la búsqueda y el filtro funcionan sin recargar; `/blog/<slug>` renderiza el Markdown y, si aplica, posts relacionados; una URL `/blog/slug-inexistente` responde 404 (verificar con `curl -I`).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add static Blog pages backed by the CMS adapter"
```

---

### Task 5: Página 404

**Files:**
- Create: `src/pages/404.astro`
- Move (ajustando el contenido): `src/modules/website/errors/NotFound/index.tsx` → `src/components/react/NotFound/index.tsx`
- Move (sin cambios): `src/common/layouts/ErrorLayout/index.tsx` → `src/components/react/ErrorLayout/index.tsx`, quitando la rama `standalone` (nunca se usa en `true`) y sus imports de `profile`/`portfolioLinks`.

**Interfaces:**
- Produces: `NotFound(): JSX.Element` montable como `client:load` dentro de `BaseLayout`.

- [ ] **Step 1: Mover y simplificar `ErrorLayout`**

```bash
git mv src/common/layouts/ErrorLayout src/components/react/ErrorLayout
```

En `src/components/react/ErrorLayout/index.tsx`, eliminar el parámetro `standalone`, la rama `if (standalone) { ... }` completa, y los imports `portfolioLinks`/`profile` que esa rama usaba. El componente queda solo con el `errorContent` (icono, badge, título, descripción, children) envuelto en el `<div>` de animación de entrada.

- [ ] **Step 2: Mover y adaptar `NotFound`**

```bash
git mv src/modules/website/errors/NotFound src/components/react/NotFound
```

En `src/components/react/NotFound/index.tsx`:
- Agregar `import "@/i18n";` como primera línea.
- Quitar el import de `react-router-dom` y usar `<a href="/">`/`</a>` en vez de `<Link to="/">`.
- Eliminar por completo el segundo `<Button>` ("volver al dashboard"), ya que `/dashboard` no existe más.

```tsx
import {
  Home01Icon,
  SearchRemoveIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";

import "@/i18n";

import { Button } from "@/common/components/ui/button";
import { ErrorLayout } from "@/components/react/ErrorLayout";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <ErrorLayout
      icon={
        <HugeiconsIcon
          icon={SearchRemoveIcon}
          size={96}
          strokeWidth={1.5}
          className="text-muted-foreground/40"
        />
      }
      errorCode="404"
      title={t("errors.notFound.title")}
      description={t("errors.notFound.description")}
    >
      <Button asChild size="lg" className="w-full sm:w-auto">
        <a href="/">
          <HugeiconsIcon icon={Home01Icon} size={16} strokeWidth={1.5} />
          {t("errors.notFound.backHome")}
        </a>
      </Button>
    </ErrorLayout>
  );
}
```

- [ ] **Step 3: Crear `src/pages/404.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { NotFound } from "../components/react/NotFound";
---
<BaseLayout
  title="404 | jsalazarv"
  description="Página no encontrada."
  url="https://jsalazarv.dev/404"
>
  <NotFound client:load />
</BaseLayout>
```

- [ ] **Step 4: Build y verificación manual**

Run: `npm run build && npm run preview`
Expected: visitar una ruta inexistente muestra la página 404 con el Dock y el botón "volver al home"; cambiar idioma la traduce instantáneamente.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add 404 page as a React island inside BaseLayout"
```

---

### Task 6: Página About

**Files:**
- Move: `src/modules/website/About/index.tsx` → `src/components/react/About/index.tsx`
- Move: `src/modules/website/About/DossierModal.tsx` → `src/components/react/About/DossierModal.tsx`
- Delete: `src/modules/website/About/Terminal.tsx`, `Stickers.tsx`, `StopSign.tsx` (código muerto, no importados por nadie)
- Create: `src/pages/about.astro`

**Interfaces:**
- Produces: `About(): JSX.Element`, montable `client:load`.

- [ ] **Step 1: Mover y borrar código muerto**

```bash
git mv src/modules/website/About/index.tsx src/components/react/About/index.tsx
git mv src/modules/website/About/DossierModal.tsx src/components/react/About/DossierModal.tsx
git rm src/modules/website/About/Terminal.tsx
git rm src/modules/website/About/Stickers.tsx
git rm src/modules/website/About/StopSign.tsx
```

- [ ] **Step 2: Agregar el side-effect import de i18n**

En `src/components/react/About/index.tsx`, agregar `import "@/i18n";` como primera línea. El resto del archivo no cambia (el import `./DossierModal` sigue siendo válido tras el `git mv` porque ambos archivos se movieron juntos al mismo directorio).

- [ ] **Step 3: Renombrar las env vars de `DossierModal`**

En `src/components/react/About/DossierModal.tsx`, reemplazar:

```ts
import.meta.env.VITE_EMAILJS_SERVICE_ID
import.meta.env.VITE_EMAILJS_TEMPLATE_ID
import.meta.env.VITE_EMAILJS_PUBLIC_KEY
import.meta.env.VITE_TURNSTILE_SITE_KEY
```

por:

```ts
import.meta.env.PUBLIC_EMAILJS_SERVICE_ID
import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID
import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
```

(Confirmado: `DossierModal.tsx` usa exactamente los mismos cuatro nombres de variable que `Contact` — `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_TURNSTILE_SITE_KEY`.)

- [ ] **Step 4: Crear `src/pages/about.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { About } from "../components/react/About";
---
<BaseLayout
  title="About | jsalazarv"
  description="Learn about Juan Salazar's background, skills, and experience as a Fullstack Developer."
  url="https://jsalazarv.dev/about"
>
  <About client:load />
</BaseLayout>
```

- [ ] **Step 5: Build y verificación manual**

Run: `npm run build && npm run preview`
Expected: `/about` reproduce la secuencia HUD, el modal de dossier abre y su formulario (EmailJS + Turnstile) funciona contra `.env` local con las nuevas keys `PUBLIC_*`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Port About page to an Astro island"
```

---

### Task 7: Página Projects

**Files:**
- Move: `src/modules/website/Projects/index.tsx` → `src/components/react/Projects/index.tsx`
- Move: `src/modules/website/Projects/components/ProjectCard.tsx` → `src/components/react/Projects/ProjectCard.tsx`
- Move: `src/modules/website/Projects/data/projects.ts` → `src/components/react/Projects/data.ts`
- Move: `src/modules/website/Projects/types.ts` → `src/components/react/Projects/types.ts`
- Create: `src/pages/projects.astro`

**Interfaces:**
- Produces: `Projects(): JSX.Element`, montable `client:load`.

- [ ] **Step 1: Mover archivos**

```bash
git mv src/modules/website/Projects/index.tsx src/components/react/Projects/index.tsx
git mv src/modules/website/Projects/components/ProjectCard.tsx src/components/react/Projects/ProjectCard.tsx
git mv src/modules/website/Projects/data/projects.ts src/components/react/Projects/data.ts
git mv src/modules/website/Projects/types.ts src/components/react/Projects/types.ts
```

- [ ] **Step 2: Ajustar imports internos**

En `src/components/react/Projects/index.tsx`, agregar `import "@/i18n";` como primera línea y actualizar:

```ts
import { ProjectCard } from "./components/ProjectCard";
import { PROJECTS } from "./data/projects";
```

a:

```ts
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "./data";
```

En `ProjectCard.tsx`, el import `import type { Project } from "../types";` apuntaba a `Projects/types.ts` cuando `ProjectCard.tsx` vivía en `Projects/components/`. Tras el `git mv` ambos archivos quedan como hermanos directos dentro de `Projects/`, así que ese import debe cambiar a `from "./types"` (con `../types` quedaría apuntando fuera del directorio y rompería el build).

- [ ] **Step 3: Crear `src/pages/projects.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { Projects } from "../components/react/Projects";
---
<BaseLayout
  title="Projects | jsalazarv"
  description="Explore the projects built by Juan Salazar, a Fullstack Developer specialized in React and TypeScript."
  url="https://jsalazarv.dev/projects"
>
  <Projects client:load />
</BaseLayout>
```

(`title`/`description` copiados literal de `resources.ts` → `en.translation.seo.pages.projects`.)

- [ ] **Step 4: Build y verificación manual**

Run: `npm run build && npm run preview`
Expected: `/projects` muestra el grid de tarjetas con los dos proyectos (Poctapoc, Portics) y sus links externos.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Port Projects page to an Astro island"
```

---

### Task 8: Página Contact

**Files:**
- Move: `src/modules/website/Contact/index.tsx` → `src/components/react/Contact/index.tsx`
- Create: `src/pages/contact.astro`

**Interfaces:**
- Produces: `Contact(): JSX.Element`, montable `client:load`.

- [ ] **Step 1: Mover el archivo**

```bash
git mv src/modules/website/Contact/index.tsx src/components/react/Contact/index.tsx
```

- [ ] **Step 2: Agregar side-effect import y renombrar env vars**

Agregar `import "@/i18n";` como primera línea. Reemplazar:

```ts
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;
```

por:

```ts
const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY as string;
const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string;
```

- [ ] **Step 3: Actualizar `.env.example`**

Renombrar en `.env.example` las cuatro variables `VITE_*` → `PUBLIC_*` (mismo nombre de sufijo).

- [ ] **Step 4: Crear `src/pages/contact.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { Contact } from "../components/react/Contact";
---
<BaseLayout
  title="Contact | jsalazarv"
  description="Get in touch with Juan Salazar. Available for freelance projects and collaborations."
  url="https://jsalazarv.dev/contact"
>
  <Contact client:load />
</BaseLayout>
```

(`title`/`description` copiados literal de `resources.ts` → `en.translation.seo.pages.contact`.)

- [ ] **Step 5: Build y verificación manual**

Run: `npm run build && npm run preview`
Expected: `/contact` valida el formulario, el Turnstile widget carga con `PUBLIC_TURNSTILE_SITE_KEY`, y el envío real contra EmailJS funciona con una `.env` configurada.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Port Contact page to an Astro island"
```

---

### Task 9: Limpieza de código legacy y dependencias

**Files:**
- Delete: `src/modules/admin/`, `src/modules/website/auth/`, `src/common/layouts/AdminLayout/`
- Delete: `src/modules/website/Home/partials/`, `src/modules/website/Home/components/{SkillCard,ExperienceCard,ToolBadge,EducationCard}.tsx`, `src/modules/website/Home/components/HomeStatusBar/`
- Delete: `src/modules/website/Home/data/{details,interests,education,experience,portfolio}.*` (conservar `profile.ts` — moverlo, ver abajo)
- Delete: `src/common/layouts/WebsiteLayout/` (ya sin `Footer`, movido en Task 2), `src/common/components/LanguageToggle.tsx`, `src/common/components/ThemeToggle/`
- Delete: `src/common/components/ui/carousel.tsx`, `src/common/components/ui/Skeleton/` (sus 3 únicos consumidores —`PostCardSkeleton`, `BlogPostSkeleton`, `PostCardWideSkeleton`— ya se borraron en el Task 4)
- Delete: `src/common/services/blog.service.ts` (reemplazado por `src/lib/cms.ts`). `src/common/types/blog.types.ts` se conserva sin cambios — sigue siendo el tipo que usa `cms.ts`.
- Delete: `src/mocks/` completo (browser.ts, handlers/), `public/mockServiceWorker.js`
- Delete: `src/routes/`, `src/common/layouts/RootLayout/` (ya reemplazado por `NavShell`), `src/modules/website/errors/ServerError/` (solo lo usaba `Router.tsx` como `errorElement`; el spec descarta una página 500 dinámica para un sitio 100% estático), `src/App.tsx`, `src/main.tsx`, `index.html`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `src/vite-env.d.ts`
- Move: `src/modules/website/Home/data/profile.ts` → `src/components/react/Footer/profile.ts` (único consumidor restante)
- Modify: `src/components/react/Footer/index.tsx` (actualizar import de `profile`)
- Modify: `package.json` (quitar dependencias no usadas)
- Modify: `vercel.json`
- Delete: carpetas vacías resultantes (`src/modules/`, si queda vacía)

- [ ] **Step 1: Verificar que no quedan referencias antes de borrar**

```bash
grep -rn "react-router" src --include="*.tsx" --include="*.ts"
grep -rn "from \"@/modules" src --include="*.tsx" --include="*.ts"
grep -rn "blogService\|@/mocks" src --include="*.tsx" --include="*.ts"
```

Expected: sin resultados (si aparece algo, resolverlo antes de continuar — probablemente un import que quedó apuntando a la ruta vieja de algún Task anterior).

- [ ] **Step 2: Mover `profile.ts` y actualizar su único consumidor**

```bash
git mv src/modules/website/Home/data/profile.ts src/components/react/Footer/profile.ts
```

En `src/components/react/Footer/index.tsx`, actualizar:

```ts
import { profile } from "@/modules/website/Home/data/profile";
```

a:

```ts
import { profile } from "./profile";
```

- [ ] **Step 3: Borrar módulos y archivos legacy**

```bash
git rm -r src/modules/admin
git rm -r src/modules/website/auth
git rm -r src/common/layouts/AdminLayout
git rm -r src/modules/website/Home/partials
git rm src/modules/website/Home/components/SkillCard.tsx
git rm src/modules/website/Home/components/ExperienceCard.tsx
git rm src/modules/website/Home/components/ToolBadge.tsx
git rm src/modules/website/Home/components/EducationCard.tsx
git rm -r src/modules/website/Home/components/HomeStatusBar
git rm src/modules/website/Home/data/details.tsx
git rm src/modules/website/Home/data/interests.tsx
git rm src/modules/website/Home/data/education.ts
git rm src/modules/website/Home/data/experience.ts
git rm src/modules/website/Home/data/portfolio.tsx
git rm src/modules/website/Home/data/skills.ts
git rm -r src/common/layouts/WebsiteLayout
git rm src/common/components/LanguageToggle.tsx
git rm -r src/common/components/ThemeToggle
git rm src/common/components/ui/carousel.tsx
git rm -r src/common/components/ui/Skeleton
git rm src/common/services/blog.service.ts
git rm -r src/mocks
git rm public/mockServiceWorker.js
git rm -r src/routes
git rm -r src/common/layouts/RootLayout
git rm -r src/modules/website/errors/ServerError
git rm src/App.tsx
git rm src/main.tsx
git rm index.html
git rm vite.config.ts
git rm tsconfig.app.json
git rm tsconfig.node.json
git rm src/vite-env.d.ts
```

Si alguna de estas carpetas quedó vacía después de mover sus últimos archivos en tasks previos (p. ej. `src/modules/website/Home`, `src/modules/website/Projects`, `src/modules/website/Contact`, `src/modules/website/Blog`, `src/modules/website/errors`, `src/modules/website`, `src/modules`, `src/common/layouts` — ya sin `RootLayout`/`WebsiteLayout`/`AdminLayout`/`ErrorLayout`, todos movidos o borrados), eliminarla también.

- [ ] **Step 4: Quitar dependencias no usadas de `package.json`**

```bash
npm uninstall react-router react-router-dom msw vite @vitejs/plugin-react embla-carousel embla-carousel-react
```

Revisar también el bloque `"msw": { "workerDirectory": ["public"] }` en `package.json` y eliminarlo.

- [ ] **Step 5: Actualizar `vercel.json`**

```json
{}
```

(Astro con output estático no necesita el rewrite SPA; si Vercel requiere un archivo vacío válido, usar `{}` o eliminar `vercel.json` por completo si el proyecto detecta Astro automáticamente — verificar con la documentación de Vercel para Astro antes de decidir cuál de las dos opciones aplicar.)

- [ ] **Step 6: Typecheck y build completos**

Run: `npx astro check && npm run build`
Expected: sin errores de TypeScript ni de build. Si `astro check` reporta imports rotos hacia rutas borradas, corregirlos.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Remove admin/auth modules, dead code, and the legacy Vite/React Router scaffolding"
```

---

### Task 10: Verificación final end-to-end

**Files:** ninguno (solo verificación manual, sin cambios de código salvo fixes puntuales que surjan).

- [ ] **Step 1: Build limpio**

Run: `rm -rf dist node_modules/.astro && npm run build`
Expected: build exitoso sin warnings de islands huérfanas.

- [ ] **Step 2: Levantar preview y recorrer cada ruta**

Run: `npm run preview`

Verificar manualmente (navegador):
- `/` — HUD del Dock se ve y anima; toggle de idioma/tema/sonido instantáneo, sin FOUC ni reload.
- Navegar `/` → `/about` → `/projects` → `/contact` → `/blog` y de vuelta — el Dock persiste su posición/transición sin parpadeo visible en ningún salto (confirma `transition:persist`).
- Cambiar idioma desde el Dock estando en `/about` (no en Home) y confirmar que el contenido de About también se traduce al instante, no solo el Dock (confirma el singleton de `i18next` compartido entre islands).
- `/about` — secuencia HUD completa, `DossierModal` abre y su formulario de EmailJS/Turnstile funciona.
- `/projects` — grid de tarjetas con links externos correctos.
- `/contact` — validación de campos, envío real contra EmailJS, Turnstile.
- `/blog` — búsqueda y filtro por categoría sin reload; `/blog/<slug>` — Markdown renderizado, posts relacionados cuando aplica.
- Ruta inexistente — 404 con Dock, texto traducible, botón "volver al home".

- [ ] **Step 3: Comparar peso de JS contra `main`**

Run (en ambas ramas): `npm run build` y revisar el tamaño de `dist/_astro/*.js` (Astro) vs. el bundle de `dist/assets/*.js` en `main`.
Expected: reducción notable en `/blog/[slug]` y `/404` (sin JS de framework o solo el island puntual) frente al bundle único actual que carga toda la SPA en cualquier ruta.

- [ ] **Step 4: Confirmar que `portfolio-api` sigue sin tocarse**

Run: `git -C ../portfolio-api status`
Expected: sin cambios (el repo está fuera de alcance de esta migración).

- [ ] **Step 5: Commit final (si hubo fixes en este task)**

```bash
git add -A
git commit -m "Fix issues found during end-to-end verification"
```

(Si no hubo fixes, no hay commit en este task — la verificación fue limpia.)
