import { useState, useMemo } from "react";

import { PostCardWide } from "./components/PostCardWide";
import { SearchBar } from "./components/SearchBar";
import { MOCK_POSTS } from "./mockPosts";

import type { BlogPost } from "@/common/types/blog.types";

import { SEO } from "@/common/components/SEO";
import { Badge } from "@/common/components/ui/badge";
import { cn } from "@/common/lib/utils";

function groupByCategory(posts: BlogPost[]): Record<string, BlogPost[]> {
  return posts.reduce<Record<string, BlogPost[]>>((acc, post) => {
    post.categories.forEach((cat) => {
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(post);
    });
    return acc;
  }, {});
}

function filterPosts(posts: BlogPost[], search: string): BlogPost[] {
  if (!search.trim()) return posts;
  const term = search.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      post.categories.some((cat) => cat.toLowerCase().includes(term)),
  );
}

interface CategoryRowProps {
  category: string;
  posts: BlogPost[];
}

function CategoryRow({ category, posts }: CategoryRowProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="w-1 h-4 bg-primary rounded-full shrink-0" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {category}
        </h2>
        <span className="text-xs text-muted-foreground">{posts.length}</span>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {posts.map((post) => (
          <PostCardWide key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export function Blog() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(MOCK_POSTS.flatMap((p) => p.categories))).sort(),
    [],
  );

  const filtered = useMemo(() => filterPosts(MOCK_POSTS, search), [search]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  const visibleCategories = useMemo(
    () =>
      selectedCategory
        ? categories.filter((c) => c === selectedCategory)
        : categories,
    [categories, selectedCategory],
  );

  const isEmpty = filtered.length === 0;

  return (
    <>
      <SEO
        title="Blog | Juan Salazar"
        description="Artículos sobre desarrollo web, clean code, React, TypeScript y experiencias como desarrollador freelance"
        url={`${window.location.origin}/blog`}
        type="website"
      />

      <div className="w-full space-y-8 py-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            Blog<span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Artículos sobre desarrollo web, clean code y experiencias
          </p>
        </div>

        {/* Search + category pills */}
        <div className="space-y-3">
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={cn(
                  "cursor-pointer",
                  selectedCategory === cat &&
                    "bg-primary text-primary-foreground",
                )}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content */}
        {isEmpty ? (
          <div className="text-center text-muted-foreground py-16">
            No se encontraron posts
          </div>
        ) : (
          <div className="space-y-8">
            {visibleCategories
              .filter((cat) => (grouped[cat]?.length ?? 0) > 0)
              .map((cat) => (
                <CategoryRow key={cat} category={cat} posts={grouped[cat]} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
