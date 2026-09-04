import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

import type { BlogPost } from "@/common/types/blog.types";

import { Badge } from "@/common/components/ui/badge";
import { Card } from "@/common/components/ui/card";
import {
  calculateReadingTime,
  formatReadingTime,
} from "@/common/utils/readingTime";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/blog/${post.slug}`}>
      <Card
        padding="compact"
        rounded="large"
        className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      >
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-4 space-y-3">
          <div className="flex gap-2 flex-wrap">
            {post.categories.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>

          <h3 className="text-foreground text-lg font-semibold line-clamp-2">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={Clock01Icon} size={12} strokeWidth={1.5} />
              <span>
                {formatReadingTime(calculateReadingTime(post.content))}
              </span>
            </div>
            <span>
              {format(
                new Date(post.publishedAt || post.createdAt),
                "dd MMM yyyy",
                { locale: es },
              )}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
