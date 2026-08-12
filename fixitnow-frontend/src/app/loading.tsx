import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Decorative Aurora Background */}
      <div className="aurora-bg" />
      
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md bg-primary/20" />
            <Skeleton className="h-6 w-32 rounded-md bg-muted" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Skeleton className="h-4 w-16 rounded-md bg-muted" />
            <Skeleton className="h-4 w-20 rounded-md bg-muted" />
            <Skeleton className="h-4 w-16 rounded-md bg-muted" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-24 rounded-full bg-primary/10" />
            <Skeleton className="h-10 w-10 rounded-full bg-muted" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 container py-12 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 mb-16 mt-8">
          <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
          <Skeleton className="h-12 w-3/4 max-w-2xl rounded-2xl bg-muted/60" />
          <Skeleton className="h-6 w-1/2 max-w-md rounded-xl bg-muted/40" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md shadow-sm">
              <Skeleton className="h-40 w-full rounded-2xl bg-muted/50" />
              <Skeleton className="h-6 w-3/4 rounded-xl bg-muted" />
              <Skeleton className="h-4 w-full rounded-lg bg-muted/60" />
              <Skeleton className="h-4 w-5/6 rounded-lg bg-muted/60" />
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-8 w-1/3 rounded-lg bg-primary/10" />
                <Skeleton className="h-8 w-1/4 rounded-lg bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
