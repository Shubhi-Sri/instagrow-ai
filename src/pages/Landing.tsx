import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Sparkles, BarChart3, Zap, ArrowRight, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "Engagement Analytics",
    description: "Track your engagement rate, best-performing posts, and growth trends over time.",
  },
  {
    icon: Sparkles,
    title: "AI Content Analysis",
    description: "Get instant AI feedback on hook strength, caption quality, and improvement suggestions.",
  },
  {
    icon: Zap,
    title: "Viral Hook Generator",
    description: "Generate scroll-stopping hooks, optimized captions, hashtags, and reel ideas.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">InstaGrow AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              Log In
            </Button>
            <Button size="sm" onClick={() => navigate("/dashboard")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" /> AI-Powered Instagram Growth
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Grow your Instagram with{" "}
            <span className="text-primary">data-driven AI</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Analyze your posts, generate viral hooks, optimize captions, and get actionable suggestions to skyrocket your engagement.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
              <Instagram className="h-4 w-4" />
              Connect Instagram
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
              View Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 text-center text-xs text-muted-foreground">
        © 2026 InstaGrow AI. All rights reserved.
      </footer>
    </div>
  );
}
