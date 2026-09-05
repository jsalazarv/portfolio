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

const CLIP_BEVEL =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";

export function PostCardWide({ post }: PostCardWideProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative shrink-0 w-36 h-52 sm:w-40 sm:h-60 overflow-hidden block snap-start"
      style={{ clipPath: CLIP_BEVEL }}
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

      {/* Scan line — aparece en hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="scan-line" />
      </div>

      {/* Targeting corners */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-primary/70 pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-primary/70 pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-primary/70 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
        <p className="text-white text-xs font-mono tracking-wide line-clamp-2 leading-tight uppercase">
          {post.title}
        </p>
        <div className="flex items-center gap-1.5 text-white/50 font-mono text-[9px] tracking-wider">
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
