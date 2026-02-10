import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder 100 caracteres"),

  slug: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres")
    .max(100, "El slug no puede exceder 100 caracteres")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug inválido. Usa solo letras minúsculas, números y guiones",
    ),

  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(300, "La descripción no puede exceder 300 caracteres"),

  content: z.string().min(50, "El contenido debe tener al menos 50 caracteres"),

  coverImage: z.string().url("URL inválida").optional().or(z.literal("")),

  author: z
    .string()
    .min(2, "El nombre del autor debe tener al menos 2 caracteres"),

  status: z.enum(["draft", "published"]),

  categories: z.array(z.string()).min(1, "Selecciona al menos una categoría"),

  tags: z.array(z.string()).max(10, "Máximo 10 tags permitidos"),
});

export type PostFormData = z.infer<typeof postSchema>;
