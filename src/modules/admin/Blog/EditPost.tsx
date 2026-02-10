import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogService } from "@/common/services/blog.service";
import { PostForm } from "./components/PostForm";
import type { BlogPost } from "@/common/types/blog.types";
import type { PostFormData } from "./schemas/post.schema";

export function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const data = await blogService.getPost(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Error al cargar el post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (data: PostFormData) => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      await blogService.updatePost(id, data);
      navigate("/dashboard/blog");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error al actualizar el post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Post no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Editar Post</h1>
        <p className="text-muted-foreground">Actualiza el contenido del post</p>
      </div>
      <PostForm post={post} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
}
