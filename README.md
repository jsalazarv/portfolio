# Portfolio Personal

Portfolio profesional de Juan Salazar, construido con **Astro**, islands de **React 19** y **Tailwind CSS v4**. Incluye un blog cuyo contenido se sirve a través de una capa de CMS desacoplada (`src/lib/cms.ts`).

## Características Principales

- Sitio estático (SSG) con Astro, hidratando solo los componentes interactivos como islands de React (`client:load`)
- View Transitions (`<ClientRouter />`) para navegación client-side entre páginas
- Tema claro/oscuro con persistencia en `localStorage`, aplicado antes del primer paint (sin FOUC) y re-aplicado tras cada transición de página
- Internacionalización (i18next / react-i18next)
- Blog con búsqueda y filtros por categoría, contenido en Markdown
- Formulario de contacto (EmailJS + Cloudflare Turnstile)
- SEO (Open Graph + Twitter Cards) por página

## Stack Tecnológico

- **Astro 7** - Framework principal (SSG, islands, routing basado en archivos)
- **React 19** - Islands interactivos
- **TypeScript 5.9** - Tipado estricto
- **Tailwind CSS v4** - Framework de utilidades CSS
- **i18next** / **react-i18next** - Internacionalización
- **react-markdown** + **remark-gfm** - Renderizado de Markdown del blog
- **EmailJS** - Envío del formulario de contacto
- **Cloudflare Turnstile** - Verificación anti-bot en el formulario de contacto
- **Vitest** - Testing
- **ESLint** + **Prettier** - Linting y formateo

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd portfolio

# Instalar dependencias
npm install

# Copiar variables de entorno y completarlas
cp .env.example .env

# Ejecutar en desarrollo
npm run dev
```

## Scripts Disponibles

```bash
npm run dev           # Servidor de desarrollo (astro dev)
npm run build         # Build de producción (astro build)
npm run preview       # Preview del build de producción
npm run test          # Ejecutar tests (vitest run)
npm run lint          # Ejecutar ESLint
npm run lint:fix      # Corregir errores de ESLint
npm run format        # Formatear código con Prettier
npm run format:check  # Verificar formato
```

## Variables de Entorno

Todas las variables expuestas al cliente usan el prefijo `PUBLIC_*` (requerido por Astro/Vite; `VITE_*` no se usa en este proyecto). Ver `.env.example` para la lista completa y actualizada:

```env
PUBLIC_EMAILJS_SERVICE_ID=
PUBLIC_EMAILJS_TEMPLATE_ID=
PUBLIC_EMAILJS_PUBLIC_KEY=
PUBLIC_TURNSTILE_SITE_KEY=
```

## Estructura del Proyecto

```
src/
├── components/
│   └── react/            # Islands de React (NavShell, About, Projects, Contact,
│                          # BlogSearch, Footer, NotFound, Dock, etc.)
├── common/
│   ├── components/        # Componentes compartidos (SEO, ui/)
│   ├── hooks/              # Hooks compartidos (useTheme, useClickSound, ...)
│   ├── lib/                 # Utilidades (cn, etc.)
│   ├── providers/            # ThemeProvider, SoundProvider, AppProviders
│   └── types/                 # Tipos compartidos (BlogPost, ...)
├── config/                      # Configuración de la app (storage prefix)
├── i18n/                         # Internacionalización
├── layouts/                       # BaseLayout.astro (shell HTML, tema, View Transitions)
├── lib/
│   ├── cms.ts                      # Capa de acceso al contenido del blog
│   └── data/posts.json              # Datos mock del blog
├── pages/                             # Rutas de Astro (file-based routing)
└── global.css                          # Estilos globales
```

## Rutas

- `/` - Home (Portfolio)
- `/about` - Sobre mí
- `/projects` - Proyectos
- `/contact` - Contacto
- `/blog` - Listado de posts
- `/blog/:slug` - Post individual
- `404` - Página no encontrada

No existe un panel de administración en este repositorio: el contenido del blog se gestiona externamente (ver `BLOG_README.md`).

## Deploy

```bash
npm run build
npm run preview   # para verificar el build localmente
```

El proyecto está pensado para desplegarse en Vercel (ver `vercel.json`), pero el output de `astro build` es estático y puede servirse desde cualquier hosting compatible.

## Licencia

Este proyecto es privado y de uso personal.

## Autor

**Juan Salazar** - Desarrollador Full Stack
