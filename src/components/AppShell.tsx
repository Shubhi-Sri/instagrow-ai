import { AppSidebar } from "./AppSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 min-h-screen p-6 lg:p-8">{children}</main>
    </div>
  );
}
