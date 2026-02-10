export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  categories: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: "draft" | "published" | "all";
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}
