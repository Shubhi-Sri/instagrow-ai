import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { mockHooks, mockCaptions, mockHashtags, mockReelIdeas } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Copy, Check, Zap, FileText, Hash, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "hooks", label: "Viral Hooks", icon: Zap },
  { id: "captions", label: "Captions", icon: FileText },
  { id: "hashtags", label: "Hashtags", icon: Hash },
  { id: "reels", label: "Reel Ideas", icon: Film },
] as const;

type TabId = (typeof tabs)[number]["id"];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function HooksTab() {
  const categories = Object.entries(mockHooks) as [string, string[]][];
  return (
    <div className="space-y-6">
      {categories.map(([category, hooks]) => (
        <div key={category}>
          <h3 className="mb-3 font-display text-sm font-semibold capitalize text-foreground">
            {category} Hooks
          </h3>
          <div className="space-y-2">
            {hooks.map((hook, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3.5">
                <p className="flex-1 text-sm text-card-foreground">{hook}</p>
                <CopyButton text={hook} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CaptionsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-foreground">AI-Generated Captions</h3>
        <Button size="sm">
          <Zap className="h-3.5 w-3.5" />
          Generate More
        </Button>
      </div>
      {mockCaptions.map((caption, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="whitespace-pre-line text-sm text-card-foreground">{caption}</p>
            <CopyButton text={caption} />
          </div>
        </div>
      ))}
    </div>
  );
}

function HashtagsTab() {
  const sections = [
    { title: "High Reach", tags: mockHashtags.highReach, color: "bg-primary/10 text-primary border-primary/20" },
    { title: "Medium Competition", tags: mockHashtags.mediumCompetition, color: "bg-secondary/10 text-secondary border-secondary/20" },
    { title: "Low Competition", tags: mockHashtags.lowCompetition, color: "bg-accent/10 text-accent border-accent/20" },
  ];

  return (
    <div className="space-y-6">
      {sections.map(({ title, tags, color }) => (
        <div key={title}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
            <CopyButton text={tags.join(" ")} />
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className={cn("rounded-md border px-2.5 py-1 text-xs font-medium", color)}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReelsTab() {
  return (
    <div className="space-y-4">
      {mockReelIdeas.map((idea, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-start justify-between">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              Idea {i + 1}
            </span>
            <span className="text-xs text-muted-foreground">{idea.duration}</span>
          </div>
          <h4 className="mb-2 font-display text-sm font-bold text-card-foreground">"{idea.hook}"</h4>
          <p className="mb-3 text-sm text-muted-foreground">{idea.concept}</p>
          <div className="space-y-2 rounded-lg bg-muted/50 p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="whitespace-pre-line text-xs text-card-foreground">{idea.caption}</p>
              <CopyButton text={idea.caption} />
            </div>
            <p className="text-xs text-secondary">{idea.hashtags}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SuggestionsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("hooks");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">AI Suggestions</h1>
          <p className="text-sm text-muted-foreground">Content ideas tailored to your niche</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg border border-border bg-muted/50 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-150",
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "hooks" && <HooksTab />}
          {activeTab === "captions" && <CaptionsTab />}
          {activeTab === "hashtags" && <HashtagsTab />}
          {activeTab === "reels" && <ReelsTab />}
        </div>
      </div>
    </AppShell>
  );
}
