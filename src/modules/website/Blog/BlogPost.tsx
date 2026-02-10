import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { blogService } from "@/common/services/blog.service";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import type { BlogPost as BlogPostType } from "@/common/types/blog.types";
import { BlogPostSkeleton } from "./components/BlogPostSkeleton";
import { RelatedPosts } from "./components/RelatedPosts";
import { SEO } from "@/common/components/SEO";
import {
  calculateReadingTime,
  formatReadingTime,
} from "@/common/utils/readingTime";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const data = await blogService.getPost(slug);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return (
      <div className="mx-auto w-full md:max-w-3xl text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Post no encontrado
        </h2>
        <Link to="/blog">
          <Button>Volver al blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} | Blog`}
        description={post.description}
        image={post.coverImage}
        url={`${window.location.origin}/blog/${post.slug}`}
        type="article"
        publishedTime={post.publishedAt || post.createdAt}
        author={post.author}
        tags={post.tags}
      />

      <article className="mx-auto w-full md:max-w-3xl space-y-8 py-8">
        <Link to="/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al blog
          </Button>
        </Link>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
          />
        )}

        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {post.categories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground">{post.description}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {format(
                  new Date(post.publishedAt || post.createdAt),
                  "dd 'de' MMMM, yyyy",
                  { locale: es },
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {formatReadingTime(calculateReadingTime(post.content))}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-8 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <RelatedPosts currentPost={post} />
      </article>
    </>
  );
}
