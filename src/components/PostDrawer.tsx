import { MockPost } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { X, Heart, MessageCircle, TrendingUp, Zap, FileText, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PostDrawerProps {
  post: MockPost | null;
  onClose: () => void;
}

function ScoreBadge({ label, score, icon }: { label: string; score: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-lg font-bold text-foreground">{score}/10</p>
      </div>
      <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", score >= 7 ? "bg-success" : score >= 4 ? "bg-warning" : "bg-destructive")}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

export function PostDrawer({ post, onClose }: PostDrawerProps) {
  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto border-l border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-6 py-4 backdrop-blur-sm">
              <h2 className="font-display text-lg font-bold text-card-foreground">AI Analysis</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Post preview */}
              <div className="flex gap-4 rounded-lg border border-border p-3">
                <img src={post.media_url} alt="" className="h-20 w-20 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm text-card-foreground">{post.caption}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {post.like_count.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post.comment_count.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {post.engagement_rate}%</span>
                  </div>
                </div>
              </div>

              {/* Scores */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold text-card-foreground">Scores</h3>
                <ScoreBadge label="Hook Strength" score={post.hook_score} icon={<Zap className="h-4 w-4" />} />
                <ScoreBadge label="Caption Quality" score={post.caption_score} icon={<FileText className="h-4 w-4" />} />
              </div>

              {/* AI Feedback */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold text-card-foreground flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" /> AI Feedback
                </h3>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm leading-relaxed text-card-foreground">{post.ai_feedback}</p>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold text-card-foreground">Suggestions</h3>
                <ul className="space-y-2">
                  {[
                    "Start with a stronger hook to stop the scroll",
                    "Add a clear call-to-action in the last line",
                    "Use more storytelling to increase connection",
                    "Test different posting times for higher reach",
                  ].map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-md border border-border p-3 text-sm text-card-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                        {i + 1}
                      </span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
