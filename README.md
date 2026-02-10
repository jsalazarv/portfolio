# Portfolio Personal con Sistema de Blog

Portfolio profesional desarrollado con **React 19**, **TypeScript** y **Tailwind CSS v4**, que incluye un sistema completo de blog con panel de administración.

## 🚀 Características Principales

### 📄 Portfolio

- Secciones: Header, Experiencia, Educación, Habilidades, Proyectos, Detalles
- Diseño responsivo con componentes reutilizables
- Sistema de diseño consistente (Design System documentado)
- Tema claro/oscuro con persistencia
- Internacionalización (i18next)

### 📝 Sistema de Blog

- **Blog Público:**
  - Listado de posts con paginación (6 posts por página)
  - Búsqueda en tiempo real por título/descripción
  - Filtros por categorías
  - Vista individual de posts con Markdown
  - Posts relacionados basados en categorías y tags
  - Tiempo de lectura estimado
  - Loading skeletons para mejor UX
  - SEO optimizado (Open Graph + Twitter Cards)

- **Panel de Administración:**
  - CRUD completo de posts (Crear, Leer, Actualizar, Eliminar)
  - Editor Markdown con preview en tiempo real
  - Validación de formularios con Zod
  - Generación automática de slug
  - Toast notifications para feedback de acciones
  - Gestión de categorías, tags e imágenes de portada
  - Estados: Borrador/Publicado

## 🛠️ Stack Tecnológico

### Core

- **React 19** - Biblioteca UI
- **TypeScript 5.9** - Tipado estricto
- **Vite 7** - Build tool y dev server
- **React Router 7** - Enrutamiento

### Estilos

- **Tailwind CSS v4** - Framework de utilidades CSS
- **CVA** (Class Variance Authority) - Gestión de variantes
- **Lucide React** - Iconos

### Formularios y Validación

- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### Blog

- **react-markdown** - Renderizado de Markdown
- **remark-gfm** - GitHub Flavored Markdown
- **rehype-raw** / **rehype-sanitize** - Procesamiento HTML seguro
- **date-fns** - Formateo de fechas
- **slugify** - Generación de URLs

### UX/UI

- **Sonner** - Toast notifications
- **Radix UI** - Componentes accesibles sin estilos
- **Embla Carousel** - Carruseles

### Desarrollo

- **MSW** (Mock Service Worker) - Mock de API REST
- **ESLint** + **Prettier** - Linting y formateo
- **TypeScript ESLint** - Reglas específicas de TS

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd Portfolio

# Instalar dependencias
npm install

# Inicializar MSW (si es necesario)
npx msw init public/ --save

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run format       # Formatear código con Prettier
npm run format:check # Verificar formato
```

## 📁 Estructura del Proyecto

```
src/
├── common/
│   ├── components/
│   │   ├── ui/              # Componentes base (Button, Card, Badge, Skeleton, etc.)
│   │   └── SEO/             # Componente SEO para meta tags
│   ├── layouts/             # Layouts (Website, Admin, Error)
│   ├── lib/                 # Utilidades (cn, etc.)
│   ├── providers/           # Providers (Theme)
│   ├── services/            # API clients (blog.service.ts)
│   ├── types/               # TypeScript interfaces compartidas
│   └── utils/               # Utilidades (readingTime, etc.)
│
├── modules/
│   ├── website/
│   │   ├── Home/            # Página principal del portfolio
│   │   ├── Blog/            # Blog público
│   │   │   ├── components/  # PostCard, SearchBar, Pagination, Filters, etc.
│   │   │   ├── index.tsx    # Listado de posts
│   │   │   └── BlogPost.tsx # Vista individual
│   │   ├── auth/            # SignIn, SignUp
│   │   └── errors/          # NotFound, ServerError
│   │
│   └── admin/
│       ├── Dashboard/       # Dashboard principal
│       └── Blog/            # Gestión de blog
│           ├── components/  # PostForm, MarkdownEditor
│           ├── schemas/     # Esquemas de validación Zod
│           ├── index.tsx    # Listado admin
│           ├── CreatePost.tsx
│           └── EditPost.tsx
│
├── mocks/                   # Mock Service Worker
│   ├── data/                # posts.json
│   ├── handlers/            # blog.handlers.ts
│   └── browser.ts           # Configuración MSW
│
├── i18n/                    # Internacionalización
├── routes/                  # Configuración de rutas
├── global.css               # Estilos globales + prose para Markdown
└── main.tsx                 # Entry point
```

## 🎨 Sistema de Diseño

El proyecto implementa un sistema de diseño consistente documentado en `docs/DESIGN_SYSTEM.md`:

- **Fuente:** Inter (Google Fonts)
- **Espaciado:** gap-2 (8px), gap-3 (12px), gap-4 (16px), gap-6 (24px)
- **Colores:** Variables CSS semánticas (primary, secondary, muted, etc.)
- **Componentes:** Card, Badge, Button con variantes usando CVA
- **Container:** max-w-3xl para consistencia visual

## 🔄 API Mock (MSW)

El proyecto usa **Mock Service Worker** para simular una API REST en desarrollo:

- **GET** `/api/posts` - Listar posts (con paginación, búsqueda, filtros)
- **GET** `/api/posts/:slug` - Obtener post por slug
- **POST** `/api/posts` - Crear post
- **PUT** `/api/posts/:id` - Actualizar post
- **DELETE** `/api/posts/:id` - Eliminar post

Los datos se almacenan en memoria (se resetean al recargar).

## 🌐 Rutas

### Públicas

- `/` - Home (Portfolio)
- `/blog` - Listado de posts
- `/blog/:slug` - Post individual
- `/sign-in` - Iniciar sesión
- `/sign-up` - Registrarse

### Admin (Dashboard)

- `/dashboard` - Dashboard principal
- `/dashboard/blog` - Gestión de posts
- `/dashboard/blog/new` - Crear post
- `/dashboard/blog/edit/:id` - Editar post

## 🚀 Deploy

Para desplegar el proyecto en producción:

1. **Build:**

   ```bash
   npm run build
   ```

2. **Configurar Backend Real:**
   - Reemplazar MSW con API real
   - Actualizar `src/common/services/blog.service.ts`
   - Implementar autenticación

3. **Variables de Entorno:**

   ```env
   VITE_API_URL=https://api.tudominio.com
   ```

4. **Opciones de Hosting:**
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## 📝 Próximas Mejoras

- [ ] Integración con backend real (Express/FastAPI)
- [ ] Autenticación y autorización
- [ ] Upload de imágenes a CDN
- [ ] Comentarios en posts
- [ ] Búsqueda avanzada con Algolia
- [ ] Code splitting para optimizar bundle
- [ ] Modo offline con Service Worker
- [ ] Blog multiidioma

## 📄 Licencia

Este proyecto es privado y de uso personal.

## 👨‍💻 Autor

**Juan Salazar** - Desarrollador Full Stack

---

**Última actualización:** Febrero 2026
