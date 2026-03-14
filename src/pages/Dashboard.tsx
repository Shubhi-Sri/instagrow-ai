import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { mockPosts, mockEngagementTrend, mockLikesPerPost } from "@/lib/mock-data";
import { BarChart3, TrendingUp, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const avgEngagement = (mockPosts.reduce((a, p) => a + p.engagement_rate, 0) / mockPosts.length).toFixed(1);
const bestPost = mockPosts.reduce((a, b) => (a.engagement_rate > b.engagement_rate ? a : b));
const worstPost = mockPosts.reduce((a, b) => (a.engagement_rate < b.engagement_rate ? a : b));

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your Instagram analytics at a glance</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Posts Analyzed"
            value={mockPosts.length}
            icon={<BarChart3 className="h-5 w-5" />}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Avg Engagement"
            value={`${avgEngagement}%`}
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: 8.3, positive: true }}
          />
          <StatCard
            title="Best Post"
            value={`${bestPost.engagement_rate}%`}
            subtitle={bestPost.caption.slice(0, 40) + "…"}
            icon={<ThumbsUp className="h-5 w-5" />}
          />
          <StatCard
            title="Worst Post"
            value={`${worstPost.engagement_rate}%`}
            subtitle={worstPost.caption.slice(0, 40) + "…"}
            icon={<ThumbsDown className="h-5 w-5" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Engagement Trend */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-display text-sm font-semibold text-card-foreground">Engagement Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockEngagementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Likes Per Post */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-display text-sm font-semibold text-card-foreground">Likes Per Post</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockLikesPerPost}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="post" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="likes" fill="hsl(var(--secondary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
