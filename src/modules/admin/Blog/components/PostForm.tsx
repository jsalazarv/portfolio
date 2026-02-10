import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { MarkdownEditor } from "./MarkdownEditor";
import { postSchema, type PostFormData } from "../schemas/post.schema";
import type { BlogPost } from "@/common/types/blog.types";

interface PostFormProps {
  post?: BlogPost;
  onSubmit: (data: PostFormData) => void;
  isLoading?: boolean;
}

export function PostForm({ post, onSubmit, isLoading }: PostFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          coverImage: post.coverImage || "",
          author: post.author,
          status: post.status,
          categories: post.categories,
          tags: post.tags,
        }
      : {
          author: "Juan Salazar",
          status: "draft",
          categories: [],
          tags: [],
          content: "",
        },
  });

  const title = watch("title");
  const content = watch("content");

  useEffect(() => {
    if (title && !post) {
      const slug = slugify(title, { lower: true, strict: true });
      setValue("slug", slug);
    }
  }, [title, setValue, post]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Mi increíble post"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL) *</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="mi-increible-post"
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-background resize-y"
          placeholder="Breve descripción del post..."
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <MarkdownEditor
        value={content || ""}
        onChange={(value) => setValue("content", value)}
        error={errors.content?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="coverImage">Imagen Destacada (URL)</Label>
          <Input
            id="coverImage"
            {...register("coverImage")}
            placeholder="https://example.com/image.jpg"
          />
          {errors.coverImage && (
            <p className="text-sm text-destructive">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Autor *</Label>
          <Input id="author" {...register("author")} />
          {errors.author && (
            <p className="text-sm text-destructive">{errors.author.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="categories">Categorías (separadas por coma) *</Label>
          <Input
            id="categories"
            placeholder="React, TypeScript, Tutorial"
            onChange={(e) => {
              const cats = e.target.value
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean);
              setValue("categories", cats);
            }}
            defaultValue={post?.categories.join(", ")}
          />
          {errors.categories && (
            <p className="text-sm text-destructive">
              {errors.categories.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (separados por coma)</Label>
          <Input
            id="tags"
            placeholder="frontend, web, tutorial"
            onChange={(e) => {
              const tags = e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
              setValue("tags", tags);
            }}
            defaultValue={post?.tags.join(", ")}
          />
          {errors.tags && (
            <p className="text-sm text-destructive">{errors.tags.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Estado *</Label>
        <select
          id="status"
          {...register("status")}
          className="w-full p-2 rounded-lg border border-border bg-background"
        >
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : post ? "Actualizar Post" : "Crear Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
