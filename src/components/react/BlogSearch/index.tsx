import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/i18n";

import type { BlogPost } from "@/common/types/blog.types";

import { cn } from "@/common/lib/utils";
import { AppProviders } from "@/common/providers/AppProviders";
import { PostCardWide } from "@/components/react/PostCardWide";
import { SearchBar } from "@/components/react/SearchBar";

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

function CategoryFilter({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
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

function CategoryRow({
  category,
  posts,
}: {
  category: string;
  posts: BlogPost[];
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3 px-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
          cat::
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground">
          {category}
        </span>
        <span className="font-mono text-[9px] text-muted-foreground/40 ml-auto">
          {t("blog.recordCount", {
            count: String(posts.length).padStart(2, "0"),
          })}
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory px-4">
        {posts.map((post) => (
          <PostCardWide key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export interface BlogSearchProps {
  posts: BlogPost[];
}

function BlogSearchInner({ posts }: BlogSearchProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.categories))).sort(),
    [posts],
  );

  const filtered = useMemo(() => filterPosts(posts, search), [posts, search]);
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
      <div className="flex items-center gap-2 px-4 py-4 bg-muted/60 border-b border-border font-mono text-[12px] backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
        <span className="text-primary tracking-widest uppercase">
          [ {t("blog.hud.title")} ]
        </span>
        <span className="ml-auto text-muted-foreground tracking-wider">
          {String(posts.length).padStart(3, "0")} {t("blog.hud.records")}
        </span>
      </div>
      <div className="relative z-20 px-4 py-3 border-b border-border/40">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {t("blog.subtitle")}
        </p>
      </div>

      <div className="relative z-20 px-4 py-3 border-b border-border/40 space-y-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={t("blog.search")}
        />
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

      <div className="relative z-20 py-6 space-y-6">
        {isEmpty ? (
          <div className="py-12 text-center">
            <p className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase">
              {t("blog.empty.title")}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider mt-2">
              {t("blog.empty.subtitle")}
            </p>
          </div>
        ) : (
          visibleCategories
            .filter((cat) => (grouped[cat]?.length ?? 0) > 0)
            .map((cat, i, arr) => (
              <div
                key={cat}
                className={cn(
                  i < arr.length - 1 && "border-b border-border/40 pb-6",
                )}
              >
                <CategoryRow category={cat} posts={grouped[cat]} />
              </div>
            ))
        )}
      </div>

      <div className="relative z-20 flex items-center justify-between px-4 py-1.5 bg-muted/60 border-t border-border font-mono text-[10px] tracking-wider text-muted-foreground/50 uppercase">
        <span>{selectedCategory ?? t("blog.all")}</span>
        <span>
          {String(filtered.length).padStart(3, "0")} {t("blog.hud.records")}
        </span>
      </div>
    </>
  );
}

export function BlogSearch(props: BlogSearchProps) {
  return (
    <AppProviders>
      <BlogSearchInner {...props} />
    </AppProviders>
  );
}
