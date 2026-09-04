import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

import type { BlogPost } from "@/common/types/blog.types";

import {
  calculateReadingTime,
  formatReadingTime,
} from "@/common/utils/readingTime";

interface PostCardWideProps {
  post: BlogPost;
}

export function PostCardWide({ post }: PostCardWideProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative shrink-0 w-36 h-52 sm:w-40 sm:h-60 rounded-xl overflow-hidden block scroll-snap-align-start snap-start"
    >
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted to-card" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
        <p className="text-white text-sm font-semibold line-clamp-2 leading-tight">
          {post.title}
        </p>
        <div className="flex items-center gap-1.5 text-white/60 text-xs">
          <HugeiconsIcon icon={Clock01Icon} size={11} strokeWidth={1.5} />
          <span>{formatReadingTime(calculateReadingTime(post.content))}</span>
          <span>·</span>
          <span>
            {format(new Date(post.publishedAt || post.createdAt), "dd MMM", {
              locale: es,
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
