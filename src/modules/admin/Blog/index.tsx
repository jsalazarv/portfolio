import {
  Add01Icon,
  Delete01Icon,
  Edit01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import type { BlogPost } from "@/common/types/blog.types";

import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { blogService } from "@/common/services/blog.service";

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await blogService.getPosts({
        status: "all",
        limit: 100,
      });
      setPosts(response.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${title}"?`)) return;

    try {
      await blogService.deletePost(id);
      toast.success(`Post "${title}" eliminado exitosamente`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error al eliminar el post. Intenta nuevamente.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gestión de Blog
          </h1>
          <p className="text-muted-foreground">Administra tus posts del blog</p>
        </div>
        <Link to="/dashboard/blog/new">
          <Button>
            <HugeiconsIcon
              icon={Add01Icon}
              size={16}
              strokeWidth={1.5}
              className="mr-2"
            />
            Nuevo Post
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">Cargando...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="mb-4">No hay posts creados aún</p>
          <Link to="/dashboard/blog/new">
            <Button>Crear primer post</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg text-foreground">
                    {post.title}
                  </h3>
                  <Badge
                    variant={
                      post.status === "published" ? "default" : "secondary"
                    }
                  >
                    {post.status === "published" ? "Publicado" : "Borrador"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    {format(new Date(post.createdAt), "dd MMM yyyy", {
                      locale: es,
                    })}
                  </span>
                  <span>{post.categories.join(", ")}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/dashboard/blog/edit/${post.id}`}>
                  <Button variant="ghost" size="icon" title="Editar">
                    <HugeiconsIcon
                      icon={Edit01Icon}
                      size={16}
                      strokeWidth={1.5}
                    />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id, post.title)}
                  title="Eliminar"
                >
                  <HugeiconsIcon
                    icon={Delete01Icon}
                    size={16}
                    strokeWidth={1.5}
                    className="text-destructive"
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
