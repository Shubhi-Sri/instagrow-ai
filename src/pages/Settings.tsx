import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw, User, Mail, Calendar } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account and connections</p>
        </div>

        {/* Profile */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-display text-sm font-semibold text-card-foreground">Profile</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Name:</span>
              <span className="text-card-foreground">Demo Creator</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span className="text-card-foreground">creator@demo.com</span>
            </div>
          </div>
        </div>

        {/* Instagram Connection */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-display text-sm font-semibold text-card-foreground">Instagram Account</h3>
          <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Instagram className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-card-foreground">@creator_demo</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Connected Mar 1, 2026
              </div>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-3.5 w-3.5" />
              Reconnect
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Disconnect
            </Button>
          </div>
        </div>

        {/* Data */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-display text-sm font-semibold text-card-foreground">Data & Privacy</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Your data is securely stored and only used to analyze your Instagram content.
          </p>
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
