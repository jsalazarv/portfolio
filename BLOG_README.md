# Blog - Documentación

El contenido del blog se obtiene a través de `src/lib/cms.ts`, que expone un cliente (`CmsClient`) con `getPosts()` y `getPost(slug)`.

- **Hoy:** el proveedor `mock` (por defecto) lee los posts desde `src/lib/data/posts.json`.
- **Más adelante:** otros proveedores se seleccionan con la variable de entorno `CMS_PROVIDER` (por ejemplo, EmDash CMS). Mientras no exista otro proveedor implementado, cualquier valor distinto de `mock` lanza un error explícito.

No hay panel de administración en este repositorio: la creación/edición de posts se gestiona fuera de él (vía EmDash CMS cuando esté configurado, o editando `posts.json` directamente en el caso del proveedor mock).

## Rutas

- `/blog` - Listado de posts publicados, con búsqueda y filtro por categoría
- `/blog/:slug` - Vista individual de un post

## Campos de un Post (`BlogPost`, en `src/common/types/blog.types.ts`)

| Campo         | Tipo   | Requerido | Descripción                          |
| ------------- | ------ | --------- | ------------------------------------ |
| `title`       | string | si        | Título del post                      |
| `slug`        | string | si        | URL amigable                         |
| `description` | string | si        | Resumen breve                        |
| `content`     | string | si        | Contenido en Markdown                |
| `coverImage`  | string | no        | URL de imagen destacada              |
| `author`      | string | si        | Nombre del autor                     |
| `status`      | enum   | si        | `"draft"` o `"published"` (solo los `published` se listan en `/blog`) |
| `categories`  | array  | si        | Mínimo 1 categoría                   |
| `tags`        | array  | no        | Tags del post                        |
| `publishedAt` | date   | si        | Fecha de publicación                 |
| `createdAt`   | date   | si        | Fecha de creación                    |
| `updatedAt`   | date   | si        | Última actualización                 |

## Markdown

El campo `content` se renderiza con `react-markdown` + `remark-gfm`, soportando: headers, listas, enlaces, imágenes, código (inline y bloques), tablas, blockquotes, strikethrough y task lists.

## Agregar un post (proveedor mock)

Agrega un objeto nuevo a `src/lib/data/posts.json` siguiendo la tabla de campos de arriba, con `status: "published"` para que aparezca en `/blog`.
