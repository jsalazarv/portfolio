import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { PostForm } from "./components/PostForm";

import type { PostFormData } from "./schemas/post.schema";

import { blogService } from "@/common/services/blog.service";

export function CreatePost() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      await blogService.createPost(data);
      toast.success("Post creado exitosamente");
      navigate("/dashboard/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error al crear el post. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Crear Nuevo Post</h1>
        <p className="text-muted-foreground">
          Completa el formulario para crear un nuevo post
        </p>
      </div>
      <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
