import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { blogService } from "@/common/services/blog.service";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import type { BlogPost } from "@/common/types/blog.types";

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
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error al eliminar el post");
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
            <Plus className="h-4 w-4 mr-2" />
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
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id, post.title)}
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
