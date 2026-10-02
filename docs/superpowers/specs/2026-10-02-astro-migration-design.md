# Migración a Astro — Design Spec

**Date:** 2026-10-02
**Scope:** Todo el proyecto `portfolio` (Vite + React SPA → Astro). Incluye eliminación del módulo admin/auth y preparación de la capa de datos del Blog para consumir EmDash CMS más adelante. `portfolio-api` queda fuera de alcance.
**Branch:** `migration/astro`

---

## Contexto y motivación

El admin del blog se gestionará en EmDash CMS en lugar de `src/modules/admin` + `portfolio-api`. Al desaparecer el admin, el sitio público deja de necesitar autenticación propia, y la mayor parte del proyecto pasa a ser contenido público (Home, About, Projects, Contact, Blog) — el caso de uso donde Astro aporta valor real (menos JS, mejor SEO, build estático) sin sacrificar nada de lo que hoy funciona.

**Requisito no negociable del usuario:** no perder animaciones, rutas ni características existentes durante la migración.

EmDash CMS todavía no está configurado — se configurará en paralelo. La capa de datos del blog debe quedar desacoplada para no requerir reescritura cuando EmDash esté listo.

---

## Decisión arquitectónica central: granularidad de las islas

Hoy el idioma (`react-i18next`), el tema y el sonido se resuelven 100% en cliente, con toggle instantáneo sin reload y sin prefijo de idioma en la URL. Páginas como Home son en la práctica una mini-aplicación (dock de toggles, animaciones, modales).

Se evaluaron tres enfoques:

1. **Shell estático + islas grandes en páginas app-like (elegido).** Astro resuelve rutas/`<head>`/SEO; Home/About/Projects/Contact se montan como un único React island cada una (`client:load`), prácticamente idénticas a hoy. El Blog sí se vuelve Astro puro (SSG real). Cumple el requisito de cero pérdida de features.
2. **Astro-nativo con reload en cambio de idioma.** Máxima reducción de JS, pero el toggle de idioma pasa a recargar la página — viola el requisito de no perder características.
3. **i18n con rutas por idioma (`/en`, `/es`).** Full estático y SEO-friendly por idioma, pero cambia el esquema de URLs — viola el requisito de no perder rutas.

Se descartan 2 y 3 por violar requisitos explícitos del usuario. Se adopta el enfoque 1.

---

## Estructura del proyecto

```
src/
  pages/
    index.astro            → Home (sin contenido propio: lo único visible en "/" hoy es el HUD del NavShell; no requiere isla de contenido adicional)
    about.astro             → About (isla React completa)
    projects.astro           → Projects (isla React completa)
    contact.astro            → Contact (isla React completa)
    blog/
      index.astro            → listado, SSG, lee lib/cms.ts en build time
      [slug].astro            → post individual, SSG vía getStaticPaths
    404.astro               → NotFound nativo Astro, sin JS
  layouts/
    BaseLayout.astro         → <html>/<head>/SEO, <ClientRouter />, NavShell island persistido, Footer
  components/react/
    NavShell/                → Dock de navegación persistido entre páginas (ver sección dedicada abajo)
    [resto]                  → todo lo que hoy vive en modules/website/* + common/components (contenido migrado casi sin cambios)
  lib/
    cms.ts                  → adapter de datos del blog (mock hoy, EmDash después)
  i18n/, common/hooks, common/lib, common/types, common/services → se mantienen con cambios mínimos
```

### Se elimina por completo

- `src/modules/admin/**` (Dashboard, Blog admin CRUD)
- `src/modules/website/auth/**` (SignIn, SignUp)
- `src/common/layouts/AdminLayout`
- Rutas `/sign-in`, `/sign-up`, `/dashboard`, `/dashboard/blog*`
- Dependencias `react-router`, `react-router-dom` (Astro resuelve ruteo por archivos; la navegación persistente del Dock usa `<ClientRouter />` de `astro:transitions`, ver sección dedicada)
- Uso de `portfolio-api` como backend (el repo en sí no se toca, queda fuera de alcance)

### Mapeo de rutas (idéntico al actual)

`/`, `/about`, `/projects`, `/contact`, `/blog`, `/blog/:slug`, catch-all 404. Sin prefijos de idioma.

### Código muerto detectado (no se porta, se elimina)

Al auditar qué se usa realmente antes de portarlo, se encontró código sin ninguna referencia en la app actual (sobrevivió al rediseño de `docs/superpowers/plans/2026-08-31-dock-navigation-transition.md`, que reemplazó el contenido anterior de Home por el HUD actual):

- `src/modules/website/Home/partials/**` (`HeaderSection`, `ExperienceSection`, `SkillsEducationSection`, `DetailsSection`, `PortfolioSection`) y los componentes que solo ellos usaban: `SkillCard`, `ExperienceCard`, `EducationCard`, `ToolBadge`, `HomeStatusBar`.
- `src/modules/website/Home/data/{details,interests,education,experience,portfolio}.*` (se conserva `profile.ts`, usado por `Footer`).
- `src/modules/website/About/{Terminal,Stickers,StopSign}.tsx` (ni siquiera los importa `About/index.tsx`, que solo usa `DossierModal`).
- `src/common/layouts/WebsiteLayout/index.tsx` y su `components/Header` (nunca montados; el router actual usa `RootLayout`, no `WebsiteLayout` — solo se reutiliza `WebsiteLayout/components/Footer`).
- `src/common/components/LanguageToggle.tsx` y `ThemeToggle/` (solo los usaba el `Header` muerto; el Dock tiene sus propios `DockLanguageItem`/`DockThemeItem`).
- `embla-carousel`/`embla-carousel-react` y `src/common/components/ui/carousel.tsx` (solo los usaba `ExperienceSection`, ya muerto). Projects no usa carousel — es un grid de tarjetas.
- `src/modules/website/Blog/mockPosts.ts` (datos Lorem-ipsum hardcodeados que hoy alimentan el listado del Blog en vez de `posts.json`/`blogService` — una inconsistencia existente entre listado y detalle que esta migración corrige al unificar ambos sobre `cms.ts`).
- `src/modules/website/Blog/components/{PostCardSkeleton,BlogPostSkeleton,PostCardWideSkeleton}.tsx` y `src/common/components/ui/Skeleton/` (solo tienen sentido con fetch en cliente; en SSG los datos ya están resueltos en build time, nunca hay estado de carga).

---

## Navegación persistente (Dock) entre páginas

**Hallazgo (post-aprobación del diseño inicial):** `src/common/layouts/RootLayout` no es un simple header/footer — contiene el **Dock de navegación animado** (`useDockNav` + `Dock`) que vive en *todas* las rutas y anima (500ms ease-in-out) entre su posición centrada (Home) y la barra superior (resto de rutas) **sin remount**, apoyándose en el ruteo client-side de React Router. `WebsiteLayout`/`Header` es código muerto (solo su `Footer` se reutiliza). Esta transición animada es una feature nombrada explícitamente (ver `docs/superpowers/plans/2026-08-31-dock-navigation-transition.md`) y el enfoque original de "una isla independiente por página" la rompía: en Astro cada página es un documento separado, así que navegar `/` → `/about` sería una recarga completa que desmonta y remonta el Dock, perdiendo la animación.

**Corrección:** se usa `<ClientRouter />` de `astro:transitions` en `BaseLayout.astro`, que intercepta la navegación entre páginas Astro (fetch + DOM diff en vez de recarga completa). El Dock se extrae a un componente `NavShell` (puerto directo de `RootLayout` + `Dock` + `useDockNav`) y se monta **una sola vez en `BaseLayout.astro`**, fuera de cada página individual, con:

```astro
<div transition:persist transition:name="nav-shell">
  <NavShell client:load activePath={Astro.url.pathname} />
</div>
```

`transition:persist` le dice a Astro que no destruya ese nodo del DOM (ni su isla React hidratada) al navegar — el mismo elemento persiste entre páginas porque vive en el layout compartido por todas.

**Cambios respecto al `useDockNav` actual:**
- Ya no usa `useNavigate`/`useLocation` de React Router (no existen fuera de una SPA). En su lugar, los items del Dock son `<a href="...">` normales — `<ClientRouter />` ya intercepta esos clics y hace la transición.
- Para recalcular `isHome`/`activeId` tras cada navegación (ya que el island persiste y no se re-monta), escucha el evento `astro:page-load` (se dispara después de cada transición, incluida la carga inicial) y relee `window.location.pathname`.

**Riesgo documentado — sincronización de i18n entre islas:** con `i18next` inicializado "dentro de cada isla" (ver sección siguiente), `NavShell` y la isla de contenido de la página (Home/About/etc.) son islas separadas. Que `i18n.changeLanguage()` en el Dock actualice instantáneamente el texto de la página depende de que Vite/Astro deduplique el módulo `src/i18n/index.ts` en un chunk compartido entre ambas islas (comportamiento esperado de su bundler basado en ESM, pero no un contrato explícito de Astro). Se añade una verificación manual explícita para esto en la sección de Verificación.

---

## Capa de datos del Blog (CMS adapter)

Hoy `blogService.getPost/getPosts` ya abstrae el origen de datos (MSW → `src/mocks/data/posts.json`). Se preserva exactamente ese contrato, movido a build-time:

```ts
export interface CmsClient {
  getPosts(): Promise<BlogPost[]>;
  getPost(slug: string): Promise<BlogPost | null>;
}
```

- **Ahora:** `mockCmsClient` lee `src/mocks/data/posts.json` directamente (import estático; MSW deja de ser necesario para esto, ya que en build time no hay un `fetch` de navegador que interceptar).
- **Cuando EmDash esté listo:** `emdashCmsClient` implementa la misma interfaz contra la API/SDK de EmDash. El cliente activo se selecciona por env var (`CMS_PROVIDER=mock|emdash`). Las páginas `.astro` no cambian.
- `blog/[slug].astro` usa `getStaticPaths()` llamando a `cms.getPosts()` para generar todos los slugs en build.
- Renderizado de Markdown: se mantiene `react-markdown` + `remark-gfm` + `rehype-sanitize`/`rehype-raw`, pero se usa en `blog/[slug].astro` **sin directiva `client:*`** — Astro lo renderiza a HTML en build time y no envía su JS al navegador. `blog/[slug].astro` queda así con cero JS de React (los "posts relacionados" también se calculan en build time con `cms.getPosts()`, replicando el scoring por categorías/tags que hoy corre en el cliente en `RelatedPosts`).
- `blog/index.astro` (el listado) **sí** necesita una isla pequeña (`BlogSearch`, `client:load`): hoy el buscador y el filtro por categoría son 100% client-side sobre el array de posts ya cargado (sin red). Esa isla recibe el array completo de posts (ya resuelto en build time vía `cms.getPosts()`) como prop serializable y reproduce exactamente esa lógica de búsqueda/filtro/agrupado — es la única isla del Blog.
- Publicar contenido nuevo en EmDash requiere rebuild/redeploy (webhook EmDash → Vercel). Queda anotado como trabajo futuro, fuera de esta migración.

---

## Estado global de cliente (idioma, tema, sonido)

- Un script inline en `BaseLayout.astro` resuelve idioma (`localStorage` → `navigator.language` → fallback `es`) y tema antes del primer paint, igual que hoy corre en `main.tsx`/`i18n/index.ts`, para evitar FOUC.
- `i18next`/`react-i18next` se inicializa **dentro de cada isla React** (`NavShell`, Home, About, Projects, Contact) importando el mismo módulo singleton `src/i18n/index.ts` — cada isla monta su propio provider, pero todas comparten la misma instancia de `i18next` (ver riesgo documentado en la sección de Navegación persistente). El toggle sigue siendo instantáneo, sin reload, igual que ahora.
- `useTheme`, `useClickSound` y los componentes `DockThemeItem`, `DockSoundItem`, `DockLanguageItem` se portan sin cambios de lógica, ahora viviendo dentro de `NavShell` (no duplicados por página).

---

## Animaciones, estilos y assets

- Toda la animación es CSS/Tailwind (`tw-animate-css` + 3 `@keyframes` en `global.css`), sin librería JS de animación → `global.css`, `tailwind.config.ts` y el plugin `@tailwindcss/vite` se copian sin cambios (Astro soporta plugins de Vite nativamente).
- Componentes UI (Radix `dropdown-menu`/`label`/`separator`, `button`/`badge`/`input` estilo shadcn, `HugeiconsIcon`) se mantienen sin modificación, viviendo dentro de las islas React. (`embla-carousel`/`ui/carousel.tsx` no se portan: solo los consumía `Home/partials/ExperienceSection`, código muerto no referenciado por ninguna ruta actual — ver hallazgo de código muerto abajo.)
- `public/` (sonidos, imágenes, `favicon`, `sitemap.xml`, `robots.txt`, `og-image`) se copia tal cual — Astro sirve `public/` igual que Vite.

---

## Manejo de errores

- `404.astro` reemplaza `NotFound`, montando `ErrorLayout` como isla React (`client:load`) igual que el resto de páginas de contenido — se descarta una versión 100% sin JS para esta ruta porque necesitaría reinventar el toggle de idioma con un mecanismo aparte (fuera de `react-i18next`), lo cual viola YAGNI y arriesga inconsistencia con el resto del sitio. La ganancia de Astro aquí es menor (ya no es una ruta resuelta por el router cliente, es una página 404 real servida por Vercel) aunque no sea cero-JS.
- No existe ya un `errorElement` por ruta de React Router. Un error en build-time (p. ej. falla el fetch a EmDash al generar `blog/*`) debe **fallar el build explícitamente** — fail fast: se detiene el build y se ve en el deploy de Vercel, en vez de servir una página rota en producción.
- Errores runtime dentro de una isla (p. ej. el formulario de Contact fallando con EmailJS/Turnstile) se manejan con el propio estado `SubmitState` del componente — no cambia respecto a hoy.
- No se replica una página "500" dinámica: en un sitio SSG no hay un servidor real que la dispare en runtime. Se documenta esta diferencia explícitamente para que no se lea como un olvido.

---

## Build y deploy (Vercel)

- `vercel.json` pierde el rewrite SPA (`/(.*) → /index.html`): Astro con output estático genera archivos reales por ruta.
- Se usa el output estático por defecto de Astro — sin adapter SSR, consistente con la decisión de "SSG con rebuild" para el Blog.
- Variables de entorno de cliente se renombran de `VITE_*` a `PUBLIC_*` (`PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, `PUBLIC_EMAILJS_PUBLIC_KEY`, `PUBLIC_TURNSTILE_SITE_KEY`).
- Webhook de EmDash → redeploy en Vercel para refrescar el blog: trabajo futuro, fuera de esta migración.

---

## Verificación (no implementación)

- `astro build` sin errores ni warnings de islas.
- Smoke test manual de cada ruta: Home (dock idioma/tema/sonido + animaciones), About (secuencia HUD + DossierModal, incluyendo su propio envío EmailJS/Turnstile), Projects (grid de tarjetas), Contact (validación + envío EmailJS + Turnstile), Blog (listado con búsqueda/filtro + post individual con Markdown), 404.
- Confirmar que cambiar idioma/tema no provoca FOUC ni reload, comparando contra el comportamiento actual en `main`.
- Navegar entre todas las rutas y confirmar que el Dock anima su transición centrado↔barra-superior sin remount visible (parpadeo), igual que en `main`.
- Con el Dock en una página (ej. `/about`) y la página de contenido en otra, cambiar idioma desde `DockLanguageItem` y confirmar que el texto de la isla de contenido (no solo el Dock) se traduce instantáneamente — valida el supuesto de módulo `i18next` compartido entre islas.
- Comparar peso de JS / Lighthouse antes vs. después, en particular para Blog y 404 (donde se espera la mayor reducción).

---

## Fuera de alcance

- Cualquier cambio al repo `portfolio-api` (queda intacto; se decide después si se archiva).
- Configuración real de EmDash CMS (se asume interfaz `CmsClient` estable; el cliente real se implementa cuando EmDash esté disponible).
- Webhook de rebuild automático al publicar contenido en EmDash.
- Rutas o SSR dinámico: todo el sitio es estático (SSG), por decisión explícita del usuario.
