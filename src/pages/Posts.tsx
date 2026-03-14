import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PostCard } from "@/components/PostCard";
import { PostDrawer } from "@/components/PostDrawer";
import { mockPosts, MockPost } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<MockPost | null>(null);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Posts Analysis</h1>
            <p className="text-sm text-muted-foreground">Click any post to see AI feedback</p>
          </div>
          <Button>
            <Sparkles className="h-4 w-4" />
            Analyze My Account
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
          ))}
        </div>
      </div>

      <PostDrawer post={selectedPost} onClose={() => setSelectedPost(null)} />
    </AppShell>
  );
}
