import { cn } from "@/lib/utils";

interface ShimmerCardProps {
  className?: string;
  lines?: number;
}

export function ShimmerCard({ className, lines = 3 }: ShimmerCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 space-y-3", className)}>
      <div className="shimmer h-4 w-24 rounded" />
      <div className="shimmer h-8 w-32 rounded" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="shimmer h-3 rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
      ))}
    </div>
  );
}
