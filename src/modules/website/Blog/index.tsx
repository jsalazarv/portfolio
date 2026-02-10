import { useState, useEffect } from "react";
import { blogService } from "@/common/services/blog.service";
import type { BlogPost } from "@/common/types/blog.types";
import { PostCard } from "./components/PostCard";
import { PostCardSkeleton } from "./components/PostCardSkeleton";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";
import { CategoryFilter } from "./components/CategoryFilter";
import { SEO } from "@/common/components/SEO";

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await blogService.getPosts({
          page: currentPage,
          limit: 9,
          search,
          category: selectedCategory || undefined,
        });

        setPosts(response.posts);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, search, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await blogService.getPosts({ limit: 100 });
        const categories = new Set<string>();
        response.posts.forEach((post) => {
          post.categories.forEach((cat) => categories.add(cat));
        });
        setAvailableCategories(Array.from(categories).sort());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  return (
    <>
      <SEO
        title="Blog | Juan Salazar"
        description="Artículos sobre desarrollo web, clean code, React, TypeScript y experiencias como desarrollador freelance"
        url={`${window.location.origin}/blog`}
        type="website"
      />

      <div className="mx-auto w-full md:max-w-5xl space-y-8 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Blog</h1>
          <p className="text-muted-foreground">
            Artículos sobre desarrollo web, clean code y experiencias
          </p>
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={availableCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No se encontraron posts
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
}
