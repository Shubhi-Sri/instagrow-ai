import { MockPost } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Image, Film, Layers } from "lucide-react";

interface PostCardProps {
  post: MockPost;
  onClick: () => void;
}

const mediaIcons = {
  IMAGE: Image,
  VIDEO: Film,
  CAROUSEL: Layers,
};

export function PostCard({ post, onClick }: PostCardProps) {
  const MediaIcon = mediaIcons[post.media_type];

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-150 hover:border-primary/30 hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={post.media_url}
          alt={post.caption.slice(0, 50)}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-card/80 backdrop-blur-sm">
          <MediaIcon className="h-3.5 w-3.5 text-card-foreground" />
        </div>
        {/* Engagement badge */}
        <div
          className={cn(
            "absolute left-2 top-2 rounded-md px-2 py-0.5 text-xs font-semibold backdrop-blur-sm",
            post.engagement_rate >= 10
              ? "bg-success/90 text-primary-foreground"
              : post.engagement_rate >= 5
                ? "bg-secondary/90 text-secondary-foreground"
                : "bg-destructive/90 text-destructive-foreground"
          )}
        >
          {post.engagement_rate}%
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <p className="line-clamp-2 text-sm text-card-foreground">{post.caption}</p>
        <div className="mt-2.5 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" /> {post.like_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" /> {post.comment_count.toLocaleString()}
          </span>
        </div>
      </div>
    </button>
  );
}
