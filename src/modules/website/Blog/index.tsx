import { useState, useEffect } from "react";
import { blogService } from "@/common/services/blog.service";
import type { BlogPost } from "@/common/types/blog.types";
import { PostCard } from "./components/PostCard";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await blogService.getPosts({
          page: currentPage,
          limit: 9,
          search,
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
  }, [currentPage, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="mx-auto w-full md:max-w-5xl space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Blog</h1>
        <p className="text-muted-foreground">
          Artículos sobre desarrollo web, clean code y experiencias
        </p>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12">
          Cargando...
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
  );
}
