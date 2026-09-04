import type { BlogPost } from "@/common/types/blog.types";

const now = new Date().toISOString();

function makePost(
  id: string,
  title: string,
  description: string,
  categories: string[],
  coverImage?: string,
): BlogPost {
  return {
    id,
    title,
    slug: id,
    description,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(
      30,
    ),
    categories,
    tags: [],
    author: "Juan Salazar",
    status: "published",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    coverImage,
  };
}

const covers = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80",
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=600&q=80",
  "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
];

export const MOCK_POSTS: BlogPost[] = [
  // React
  makePost(
    "r1",
    "Dominando React Server Components en 2024",
    "Todo lo que necesitas saber sobre RSC y cómo cambian el modelo mental de React.",
    ["React", "Next.js"],
    covers[0],
  ),
  makePost(
    "r2",
    "useTransition y Concurrent Features",
    "Cómo usar las APIs concurrentes de React para mejorar la experiencia de usuario.",
    ["React"],
    covers[1],
  ),
  makePost(
    "r3",
    "Patrones avanzados con Custom Hooks",
    "Aprende a encapsular lógica compleja en hooks reutilizables y testeables.",
    ["React"],
    covers[2],
  ),
  makePost(
    "r4",
    "Context API vs Zustand vs Jotai",
    "Comparativa honesta de las soluciones de estado global en el ecosistema React.",
    ["React"],
    covers[3],
  ),
  makePost(
    "r5",
    "Optimización de re-renders con memo y useMemo",
    "Guía práctica para evitar renders innecesarios sin sacrificar legibilidad.",
    ["React"],
    covers[4],
  ),
  makePost(
    "r6",
    "Testing en React con Vitest y Testing Library",
    "Setup moderno para testear componentes React de forma efectiva.",
    ["React", "Testing"],
    covers[5],
  ),

  // TypeScript
  makePost(
    "t1",
    "TypeScript 5.4 — Novedades que importan",
    "Las features más relevantes del último release y cuándo usarlas.",
    ["TypeScript"],
    covers[6],
  ),
  makePost(
    "t2",
    "Tipos condicionales avanzados",
    "Cómo usar infer, conditional types y template literals para tipado preciso.",
    ["TypeScript"],
    covers[7],
  ),
  makePost(
    "t3",
    "Zod para validación y tipado en runtime",
    "Validación de datos externos con inferencia automática de tipos TypeScript.",
    ["TypeScript"],
    covers[0],
  ),
  makePost(
    "t4",
    "Monorepos con TypeScript y Turborepo",
    "Estructura y configuración de monorepos tipados para proyectos grandes.",
    ["TypeScript"],
    covers[1],
  ),
  makePost(
    "t5",
    "Strict mode — por qué deberías activarlo hoy",
    "Los beneficios reales de usar TypeScript en modo estricto desde el primer día.",
    ["TypeScript"],
    covers[2],
  ),

  // Clean Code
  makePost(
    "c1",
    "SOLID en TypeScript — ejemplos reales",
    "Los cinco principios aplicados a código TypeScript del mundo real, sin abstracciones vacías.",
    ["Clean Code"],
    covers[3],
  ),
  makePost(
    "c2",
    "Early returns y la pirámide de doom",
    "Cómo los retornos tempranos reducen la complejidad ciclomática y mejoran la lectura.",
    ["Clean Code"],
    covers[4],
  ),
  makePost(
    "c3",
    "Naming — el arte de nombrar bien",
    "Variables, funciones y clases que se explican solas. Sin comentarios innecesarios.",
    ["Clean Code"],
    covers[5],
  ),
  makePost(
    "c4",
    "DRY vs WET — cuándo duplicar está bien",
    "El principio DRY mal aplicado genera acoplamientos que no quieres. Aprende la diferencia.",
    ["Clean Code"],
    covers[6],
  ),
  makePost(
    "c5",
    "Refactoring sin romper nada",
    "Técnicas de refactoring incremental con cobertura de tests como red de seguridad.",
    ["Clean Code"],
    covers[7],
  ),

  // Next.js
  makePost(
    "n1",
    "App Router — el nuevo paradigma de Next.js",
    "Layouts, Server Components y Suspense en el App Router de Next.js 14.",
    ["Next.js"],
    covers[0],
  ),
  makePost(
    "n2",
    "Edge Runtime y middleware en Next.js",
    "Cuándo y cómo usar el Edge Runtime para reducir latencia en APIs.",
    ["Next.js"],
    covers[1],
  ),
  makePost(
    "n3",
    "Optimización de imágenes con next/image",
    "Todo sobre el componente de imágenes: formatos, lazy loading y placeholders.",
    ["Next.js"],
    covers[2],
  ),
  makePost(
    "n4",
    "Autenticación con NextAuth v5",
    "Setup completo de autenticación con providers OAuth y credenciales propias.",
    ["Next.js"],
    covers[3],
  ),

  // Testing
  makePost(
    "te1",
    "Testing piramidal — no todo son E2E",
    "Por qué la mayoría de tu suite debería ser unitaria, y cómo estructurarla.",
    ["Testing"],
    covers[4],
  ),
  makePost(
    "te2",
    "Playwright para E2E en proyectos reales",
    "Setup, estrategias de selectores y CI para tests E2E con Playwright.",
    ["Testing"],
    covers[5],
  ),
  makePost(
    "te3",
    "Mocks vs stubs vs spies — la diferencia importa",
    "Cuándo usar cada tipo de test double y cómo evitar el over-mocking.",
    ["Testing"],
    covers[6],
  ),
];
