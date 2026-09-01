import { http, HttpResponse } from "msw";

import postsData from "../data/posts.json";

import type { BlogPost } from "@/common/types/blog.types";

let posts: BlogPost[] = JSON.parse(JSON.stringify(postsData));

export const blogHandlers = [
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "9");
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";
    const status = url.searchParams.get("status") || "published";

    let filtered = posts;

    if (status !== "all") {
      filtered = filtered.filter((p) => p.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower),
      );
    }

    if (category) {
      filtered = filtered.filter((p) => p.categories.includes(category));
    }

    filtered = filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return HttpResponse.json({
      posts: paginated,
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    });
  }),

  http.get("/api/posts/:slug", ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  http.post("/api/posts", async ({ request }) => {
    const newPost = (await request.json()) as Partial<BlogPost>;

    const post: BlogPost = {
      ...(newPost as BlogPost),
      id: String(posts.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt:
        newPost.status === "published" ? new Date().toISOString() : "",
    };

    posts.push(post);

    return HttpResponse.json(post, { status: 201 });
  }),

  http.put("/api/posts/:id", async ({ params, request }) => {
    const index = posts.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updates = (await request.json()) as Partial<BlogPost>;

    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      publishedAt:
        updates.status === "published" && !posts[index].publishedAt
          ? new Date().toISOString()
          : posts[index].publishedAt,
    };

    return HttpResponse.json(posts[index]);
  }),

  http.delete("/api/posts/:id", ({ params }) => {
    const index = posts.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    posts.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
