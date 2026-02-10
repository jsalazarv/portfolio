import type {
  BlogPost,
  BlogListParams,
  BlogListResponse,
} from "@/common/types/blog.types";

const API_BASE = "/api";

export const blogService = {
  async getPosts(params: BlogListParams = {}): Promise<BlogListResponse> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);
    if (params.category) searchParams.set("category", params.category);
    if (params.tag) searchParams.set("tag", params.tag);
    if (params.status) searchParams.set("status", params.status);

    const response = await fetch(`${API_BASE}/posts?${searchParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  },

  async getPost(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/posts/${slug}`);

    if (!response.ok) {
      throw new Error("Post not found");
    }

    return response.json();
  },

  async createPost(post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return response.json();
  },

  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    return response.json();
  },

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  },
};
