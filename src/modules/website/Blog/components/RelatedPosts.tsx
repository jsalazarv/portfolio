import { useEffect, useState } from "react";
import { blogService } from "@/common/services/blog.service";
import type { BlogPost } from "@/common/types/blog.types";
import { PostCard } from "./PostCard";

interface RelatedPostsProps {
  currentPost: BlogPost;
}

export function RelatedPosts({ currentPost }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      setLoading(true);
      try {
        const response = await blogService.getPosts({ limit: 100 });

        const scored = response.posts
          .filter((post) => post.id !== currentPost.id)
          .map((post) => {
            let score = 0;

            post.categories.forEach((cat) => {
              if (currentPost.categories.includes(cat)) {
                score += 3;
              }
            });

            post.tags.forEach((tag) => {
              if (currentPost.tags.includes(tag)) {
                score += 1;
              }
            });

            return { post, score };
          })
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(({ post }) => post);

        setRelatedPosts(scored);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPost]);

  if (loading || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 pt-12 border-t">
      <h2 className="text-2xl font-bold text-foreground">Posts Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
