import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { PostCardWide } from "./components/PostCardWide";
import { SearchBar } from "./components/SearchBar";
import { MOCK_POSTS } from "./mockPosts";

import type { BlogPost } from "@/common/types/blog.types";

import { SEO } from "@/common/components/SEO";
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

const CLIP_BEVEL_OUTER =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

interface CategoryFilterProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function CategoryFilter({ label, isActive, onClick }: CategoryFilterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isHighlighted = isActive || isHovered;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isActive ? (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: CLIP_BEVEL_OUTER, background: "var(--primary)" }}
        />
      ) : (
        <span
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-200",
            isHighlighted ? "opacity-100" : "opacity-0",
          )}
        >
          <span
            className="absolute inset-0"
            style={{
              clipPath: CLIP_BEVEL_OUTER,
              background:
                "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
            }}
          />
          <span
            className="absolute inset-[1px] bg-background"
            style={{ clipPath: CLIP_BEVEL_INNER }}
          />
        </span>
      )}
      <button
        onClick={onClick}
        className={cn(
          "relative z-10 font-mono text-[10px] tracking-widest uppercase px-3 py-1 cursor-pointer transition-colors duration-200 focus-visible:outline-none",
          isActive
            ? "text-primary-foreground"
            : isHighlighted
              ? "text-foreground"
              : "text-muted-foreground",
        )}
      >
        {label}
      </button>
    </div>
  );
}

interface CategoryRowProps {
  category: string;
  posts: BlogPost[];
}

function CategoryRow({ category, posts }: CategoryRowProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
          cat::
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground">
          {category}
        </span>
        <span className="font-mono text-[9px] text-muted-foreground/40 ml-auto">
          {t("blog.recordCount", { count: String(posts.length).padStart(2, "0") })}
        </span>
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
  const { t } = useTranslation();
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
        {/* HUD Header */}
        <div className="-mt-8">
          <div
            className="bg-muted-foreground/50 p-px"
            style={{
              clipPath:
                "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
            }}
          >
            <div
              className="relative bg-background overflow-hidden"
              style={{
                clipPath:
                  "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)",
              }}
            >
              <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10" />
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60 border-b border-border">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="font-mono text-xs text-primary tracking-widest uppercase">
                  [ {t("blog.hud.title")} ]
                </span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground tracking-wider">
                  {String(MOCK_POSTS.length).padStart(3, "0")} {t("blog.hud.records")}
                </span>
              </div>
              <div className="relative z-20 px-4 py-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                  {t("blog.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search + category filters */}
        <div className="space-y-3">
          <SearchBar value={search} onChange={setSearch} placeholder={t("blog.search")} />
          <div className="flex gap-2 flex-wrap">
            <CategoryFilter
              label={t("blog.all")}
              isActive={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map((cat) => (
              <CategoryFilter
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
              />
            ))}
          </div>
        </div>

        {/* Content */}
        {isEmpty ? (
          <div className="py-16 text-center">
            <p className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase">
              {t("blog.empty.title")}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider mt-2">
              {t("blog.empty.subtitle")}
            </p>
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
