// app/loading.tsx
export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur">
      <div className="flex flex-col items-center gap-4">
        {/* Modern spinner */}
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
