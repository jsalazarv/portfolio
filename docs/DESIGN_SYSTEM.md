# Sistema de Diseño - Portfolio

## 🎨 Paleta de Colores

### Tokens CSS Variables

- `--background`: Color de fondo principal
- `--foreground`: Color de texto principal
- `--paper`: Fondo de contenido (ligeramente diferente al background)
- `--card`: Fondo de tarjetas
- `--primary`: Color primario de marca
- `--secondary`: Color secundario
- `--muted`: Color apagado para elementos secundarios
- `--accent`: Color de acento para hover states
- `--destructive`: Color para acciones destructivas
- `--border`: Color de bordes

### Uso Recomendado

- Fondos de página: `bg-[var(--paper)]`
- Cards y contenedores: `bg-card`
- Texto principal: `text-foreground`
- Texto secundario: `text-muted-foreground`

---

## 📝 Tipografía

### Stack de Fuentes

- **Sans-serif**: Inter, system-ui, -apple-system, sans-serif
- **Monospace**: Fira Code, Consolas, Monaco, monospace

### Escala Tipográfica

- `text-xs` (12px): Badges pequeños, meta información
- `text-sm` (14px): Texto secundario, descripciones
- `text-base` (16px): Texto principal de párrafos
- `text-lg` (18px): Subtítulos, títulos de cards
- `text-xl` (20px): Títulos de secciones
- `text-2xl` (24px): Títulos destacados
- `text-3xl` (30px): Títulos principales móvil
- `text-4xl` (36px): Títulos principales desktop

---

## 📏 Sistema de Espaciado

### Gaps (Espaciado entre elementos)

- `gap-2` (8px): Icon + Text muy relacionados
- `gap-3` (12px): Grupos de badges/pills
- `gap-4` (16px): Elementos dentro de cards
- `gap-6` (24px): Secciones principales de página
- `gap-8` (32px): Divisiones mayores

### Padding en Cards

- `p-4`: Cards compactos (EducationCard, SkillCard)
- `p-5`: Formularios y cards con contenido medio (ExperienceCard)
- `p-6`: Cards del sistema UI base

---

## 🧩 Componentes UI

### Badge

**Variantes:**

- `default`: Fondo primary, texto contraste
- `secondary`: Fondo secondary
- `destructive`: Fondo destructive (rojo)
- `outline`: Solo borde
- `ghost`: Sin fondo
- `link`: Estilo de enlace

**Props adicionales:**

- `asChild`: Renderizar como elemento hijo (útil para links)

**Uso:**

```tsx
<Badge variant="secondary" className="gap-2">
  <Icon /> <span>Text</span>
</Badge>
```

### Card

**Variantes:**

- `padding`: "compact" | "comfortable" | "default"
- `rounded`: "default" | "large"

**Componentes:**

- `Card`: Contenedor principal
- `CardHeader`: Encabezado con título y acción
- `CardTitle`: Título del card
- `CardDescription`: Descripción secundaria
- `CardContent`: Contenido principal
- `CardFooter`: Pie del card

**Uso:**

```tsx
<Card padding="compact" rounded="large">
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Contenido</CardContent>
</Card>
```

### Button

**Variantes:**

- `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`

**Tamaños:**

- `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

**Props:**

- `asChild`: Renderizar como elemento hijo

**Uso:**

```tsx
<Button variant="outline" size="icon">
  <Icon />
</Button>
```

### Container

**Variantes:**

- `header`: Espaciado específico para headers
- `footer`: Espaciado específico para footers
- `default`: Espaciado general

**Uso:**

```tsx
<Container variant="header">
  <nav>...</nav>
</Container>
```

---

## 🎯 Guías de Uso

### Cuándo usar cada componente

**Badge vs Button:**

- Badge: Información estática o links simples
- Button: Acciones interactivas, formularios

**Card vs div:**

- Card: Contenedores de información con borde y sombra
- div: Agrupaciones simples sin estilo visual

### Reglas de Consistencia

1. **No hardcodear colores hex** excepto para branding de terceros (Adobe, redes sociales)
2. **Usar variables CSS** para todos los colores del tema
3. **No usar `text-white`** directamente, usar `text-primary-foreground`
4. **Aplicar escala semántica de gaps** según jerarquía
5. **Preferir componentes UI** sobre divs custom con estilos inline
